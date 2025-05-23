import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm, Select, List, Tag, Switch } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, UserAddOutlined, UserDeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Turma, turmaService } from '../services/turmaService';
import { Student, studentService } from '../services/studentService';
import { Presenca, presencaService } from '../services/presencaService';

const { Column } = Table;
const { TextArea } = Input;
const { Option } = Select;

const TurmaList: React.FC = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [studentModalVisible, setStudentModalVisible] = useState(false);
  const [selectedTurma, setSelectedTurma] = useState<Turma | null>(null);
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [form] = Form.useForm();
  const [studentForm] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTurmas = async () => {
    try {
      setLoading(true);
      const data = await turmaService.getAll();
      setTurmas(data);
    } catch (error) {
      message.error('Erro ao carregar turmas');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await studentService.getAll();
      setStudents(data);
    } catch (error) {
      message.error('Erro ao carregar alunos');
    }
  };

  const fetchPresencas = async (turmaId: string) => {
    try {
      const data = await presencaService.getPresencasByTurma(turmaId);
      setPresencas(data);
    } catch (error) {
      message.error('Erro ao carregar presenças');
    }
  };

  useEffect(() => {
    fetchTurmas();
    fetchStudents();
  }, []);

  const handleCreate = async (values: Omit<Turma, 'id' | 'createdAt' | 'updatedAt' | 'alunos' | 'presencas'>) => {
    try {
      await turmaService.create(values);
      message.success('Turma criada com sucesso');
      setModalVisible(false);
      form.resetFields();
      fetchTurmas();
    } catch (error) {
      message.error('Erro ao criar turma');
    }
  };

  const handleUpdate = async (values: Partial<Turma>) => {
    if (!editingId) return;
    try {
      await turmaService.update(editingId, values);
      message.success('Turma atualizada com sucesso');
      setModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchTurmas();
    } catch (error) {
      message.error('Erro ao atualizar turma');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await turmaService.delete(id);
      message.success('Turma excluída com sucesso');
      fetchTurmas();
    } catch (error) {
      message.error('Erro ao excluir turma');
    }
  };

  const handleAddStudent = async (values: { alunoId: string }) => {
    if (!selectedTurma) return;
    try {
      await turmaService.addAluno(selectedTurma.id, values.alunoId);
      message.success('Aluno adicionado com sucesso');
      setStudentModalVisible(false);
      studentForm.resetFields();
      fetchTurmas();
    } catch (error) {
      message.error('Erro ao adicionar aluno');
    }
  };

  const handleRemoveStudent = async (turmaId: string, alunoId: string) => {
    try {
      await turmaService.removeAluno(turmaId, alunoId);
      message.success('Aluno removido com sucesso');
      fetchTurmas();
    } catch (error) {
      message.error('Erro ao remover aluno');
    }
  };

  const handlePresenca = async (turmaId: string, alunoId: string, presente: boolean) => {
    try {
      await presencaService.createPresenca({
        turmaId,
        alunoId,
        data: new Date().toISOString(),
        presente
      });
      message.success('Presença registrada com sucesso');
      fetchPresencas(turmaId);
    } catch (error) {
      message.error('Erro ao registrar presença');
    }
  };

  const showModal = (turma?: Turma) => {
    if (turma) {
      setEditingId(turma.id);
      form.setFieldsValue({
        nome: turma.nome,
        horario: turma.horario,
        data_aula: turma.data_aula.split('T')[0],
        professor: turma.professor,
        observacao: turma.observacao,
      });
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setModalVisible(true);
  };

  const showStudentModal = (turma: Turma) => {
    setSelectedTurma(turma);
    setStudentModalVisible(true);
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setEditingId(null);
  };

  const handleStudentModalCancel = () => {
    setStudentModalVisible(false);
    studentForm.resetFields();
    setSelectedTurma(null);
  };

  return (
    <div
      style={{
        padding: '24px',
        width: '90%',
        maxWidth: '1400px',
        margin: '40px auto',
        background: 'rgba(255,255,255,0.8)',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
      }}
    >
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Lista de Turmas</h2>
        <Button icon={<PlusOutlined />} onClick={() => showModal()}>
          Nova Turma
        </Button>
      </div>

      <Table
        dataSource={turmas}
        loading={loading}
        rowKey="id"
        scroll={{ x: true }}
        style={{ width: '100%' }}
        expandable={{
          expandedRowRender: (record: Turma) => (
            <div style={{ padding: '16px' }}>
              <h3>Alunos da Turma</h3>
              {record.alunos && record.alunos.length > 0 ? (
                <List
                  dataSource={record.alunos}
                  renderItem={(aluno: any) => {
                    const presenca = presencas.find(p => p.aluno && p.aluno.id === aluno.id);
                    return (
                      <List.Item
                        actions={[
                          <Space>
                            <Switch
                              checkedChildren={<CheckCircleOutlined />}
                              unCheckedChildren={<CloseCircleOutlined />}
                              checked={presenca?.presente}
                              onChange={(checked) => handlePresenca(record.id, aluno.id, checked)}
                            />
                            <Tag color={presenca?.presente ? 'success' : 'error'}>
                              {presenca?.presente ? 'Presente' : 'Ausente'}
                            </Tag>
                            <Button
                              type="text"
                              danger
                              icon={<UserDeleteOutlined />}
                              onClick={() => handleRemoveStudent(record.id, aluno.id)}
                            >
                              Remover
                            </Button>
                          </Space>
                        ]}
                      >
                        <List.Item.Meta
                          title={aluno.nome}
                          description={aluno.email}
                        />
                      </List.Item>
                    );
                  }}
                />
              ) : (
                <p>Nenhum aluno matriculado</p>
              )}
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => showStudentModal(record)}
                style={{ marginTop: '16px' }}
              >
                Adicionar Aluno
              </Button>
            </div>
          ),
          onExpand: (expanded, record) => {
            if (expanded) {
              fetchPresencas(record.id);
            }
          }
        }}
      >
        <Column title="Nome" dataIndex="nome" key="nome" />
        <Column title="Horário" dataIndex="horario" key="horario" />
        <Column title="Data da Aula" dataIndex="data_aula" key="data_aula" 
          render={(date) => new Date(date).toLocaleDateString('pt-BR')} />
        <Column title="Professor" dataIndex="professor" key="professor" />
        <Column title="Observação" dataIndex="observacao" key="observacao" />
        <Column
          title="Ações"
          key="actions"
          render={(_, record: Turma) => (
            <Space size="middle">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => showModal(record)}
              />
              <Popconfirm
                title="Tem certeza que deseja excluir esta turma?"
                onConfirm={() => handleDelete(record.id)}
                okText="Sim"
                cancelText="Não"
              >
                <Button type="primary" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={editingId ? 'Editar Turma' : 'Nova Turma'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={editingId ? 'Atualizar' : 'Criar'}
        cancelText="Cancelar"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={editingId ? handleUpdate : handleCreate}
        >
          <Form.Item
            name="nome"
            label="Nome"
            rules={[{ required: true, message: 'Por favor, insira o nome' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="horario"
            label="Horário"
            rules={[{ required: true, message: 'Por favor, insira o horário' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="data_aula"
            label="Data da Aula"
            rules={[{ required: true, message: 'Por favor, insira a data da aula' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="professor"
            label="Professor"
            rules={[{ required: true, message: 'Por favor, insira o professor' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="observacao"
            label="Observação"
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Adicionar Aluno à Turma"
        open={studentModalVisible}
        onOk={() => studentForm.submit()}
        onCancel={handleStudentModalCancel}
        okText="Adicionar"
        cancelText="Cancelar"
      >
        <Form
          form={studentForm}
          layout="vertical"
          onFinish={handleAddStudent}
        >
          <Form.Item
            name="alunoId"
            label="Aluno"
            rules={[{ required: true, message: 'Por favor, selecione um aluno' }]}
          >
            <Select
              placeholder="Selecione um aluno"
              showSearch
              optionFilterProp="children"
            >
              {students
                .filter(student => !selectedTurma?.alunos?.some(aluno => aluno.id === student.id))
                .map(student => (
                  <Option key={student.id} value={student.id}>
                    {student.nome} - {student.email}
                  </Option>
                ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TurmaList; 