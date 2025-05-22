import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Turma, turmaService } from '../services/turmaService';

const { Column } = Table;
const { TextArea } = Input;

const TurmaList: React.FC = () => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
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

  useEffect(() => {
    fetchTurmas();
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

  const showModal = (turma?: Turma) => {
    if (turma) {
      setEditingId(turma.id);
      form.setFieldsValue({
        nome: turma.nome,
        horario: turma.horario,
        professor: turma.professor,
        observacao: turma.observacao,
      });
    } else {
      setEditingId(null);
      form.resetFields();
    }
    setModalVisible(true);
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
    setEditingId(null);
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
      >
        <Column title="Nome" dataIndex="nome" key="nome" />
        <Column title="Horário" dataIndex="horario" key="horario" />
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
            rules={[{ required: true, message: 'Por favor, insira o nome da turma' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="horario"
            label="Horário"
            rules={[{ required: true, message: 'Por favor, insira o horário da turma' }]}
          >
            <Input placeholder="Ex: 19:00" />
          </Form.Item>

          <Form.Item
            name="professor"
            label="Professor"
            rules={[{ required: true, message: 'Por favor, insira o nome do professor' }]}
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
    </div>
  );
};

export default TurmaList; 