import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Student, studentService } from '../services/studentService';

const { Column } = Table;

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAll();
      setStudents(data);
    } catch (error) {
      message.error('Erro ao carregar alunos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleCreate = async (values: Omit<Student, 'id' | 'presencas' | 'pagamentos'>) => {
    try {
      await studentService.create(values);
      message.success('Aluno criado com sucesso');
      setModalVisible(false);
      form.resetFields();
      fetchStudents();
    } catch (error) {
      message.error('Erro ao criar aluno');
    }
  };

  const handleUpdate = async (values: Partial<Student>) => {
    if (!editingId) return;
    try {
      await studentService.update(editingId, values);
      message.success('Aluno atualizado com sucesso');
      setModalVisible(false);
      form.resetFields();
      setEditingId(null);
      fetchStudents();
    } catch (error) {
      message.error('Erro ao atualizar aluno');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await studentService.delete(id);
      message.success('Aluno excluído com sucesso');
      fetchStudents();
    } catch (error) {
      message.error('Erro ao excluir aluno');
    }
  };

  const showModal = (student?: Student) => {
    if (student) {
      setEditingId(student.id);
      form.setFieldsValue({
        nome: student.nome,
        email: student.email,
        telefone: student.telefone,
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
        <h2>Lista de Alunos</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
          Novo Aluno
        </Button>
      </div>

      <Table
        dataSource={students}
        loading={loading}
        rowKey="id"
        scroll={{ x: true }}
        style={{ width: '100%' }}
      >
        <Column title="Nome" dataIndex="nome" key="nome" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Telefone" dataIndex="telefone" key="telefone" />
        <Column
          title="Ações"
          key="actions"
          render={(_, record: Student) => (
            <Space size="middle">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => showModal(record)}
              />
              <Popconfirm
                title="Tem certeza que deseja excluir este aluno?"
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
        title={editingId ? 'Editar Aluno' : 'Novo Aluno'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
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
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Por favor, insira o email' },
              { type: 'email', message: 'Email inválido' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telefone"
            label="Telefone"
            rules={[{ required: true, message: 'Por favor, insira o telefone' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentList; 