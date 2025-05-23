import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, message, Popconfirm, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, DollarOutlined } from '@ant-design/icons';
import { Student, studentService } from '../services/studentService';
import { paymentService, Payment } from '../services/paymentService';
import dayjs from 'dayjs';

const { Column } = Table;

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentHistoryVisible, setPaymentHistoryVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);
  const [paymentHistoryLoading, setPaymentHistoryLoading] = useState(false);
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

  const showPaymentHistory = async (student: Student) => {
    setSelectedStudent(student);
    setPaymentHistoryVisible(true);
    setPaymentHistoryLoading(true);
    try {
      const payments = await paymentService.getByAluno(student.id);
      setPaymentHistory(payments);
    } catch (error) {
      message.error('Erro ao carregar histórico de pagamentos');
    } finally {
      setPaymentHistoryLoading(false);
    }
  };

  const paymentHistoryColumns = [
    {
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      render: (data: string) => dayjs(data).format('DD/MM/YYYY'),
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (valor: number) => `R$ ${Number(valor)?.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          pendente: 'warning',
          pago: 'success',
          atrasado: 'error'
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Observação',
      dataIndex: 'observacao',
      key: 'observacao',
    },
  ];

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
                icon={<DollarOutlined />}
                onClick={() => showPaymentHistory(record)}
              />
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

      <Modal
        title={`Histórico de Pagamentos - ${selectedStudent?.nome}`}
        open={paymentHistoryVisible}
        onCancel={() => setPaymentHistoryVisible(false)}
        footer={null}
        width={800}
      >
        <Table
          columns={paymentHistoryColumns}
          dataSource={paymentHistory}
          loading={paymentHistoryLoading}
          rowKey="id"
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default StudentList; 