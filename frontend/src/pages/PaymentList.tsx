import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, InputNumber, Select, message, Tag, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { paymentService, Payment } from '../services/paymentService';
import { studentService, Student } from '../services/studentService';
import styled from 'styled-components';
import dayjs from 'dayjs';

const { Option } = Select;

const Container = styled.div`
  padding: 24px;
  width: 90%;
  max-width: 1400px;
  margin: 40px auto;
  background: rgba(255,255,255,0.8);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
`;

const PaymentList: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [form] = Form.useForm();

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await paymentService.getAll();
      setPayments(data);
    } catch (error) {
      message.error('Erro ao carregar pagamentos');
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

  useEffect(() => {
    fetchPayments();
    fetchStudents();
  }, []);

  const handleCreate = () => {
    setEditingPayment(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (payment: Payment) => {
    setEditingPayment(payment);
    form.setFieldsValue({
      alunoId: payment.aluno.id,
      valor: payment.valor,
      status: payment.status,
      data: dayjs(payment.data),
      observacao: payment.observacao
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await paymentService.delete(id);
      message.success('Pagamento excluído com sucesso');
      fetchPayments();
    } catch (error) {
      message.error('Erro ao excluir pagamento');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingPayment) {
        await paymentService.update(editingPayment.id, {
          ...values,
          data: values.data.toISOString()
        });
        message.success('Pagamento atualizado com sucesso');
      } else {
        await paymentService.create(
          values.alunoId,
          values.valor,
          values.data.toDate(),
          values.observacao
        );
        message.success('Pagamento criado com sucesso');
      }
      setModalVisible(false);
      fetchPayments();
    } catch (error) {
      message.error('Erro ao salvar pagamento');
    }
  };

  const columns = [
    {
      title: 'Aluno',
      dataIndex: ['aluno', 'nome'],
      key: 'aluno',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (valor: number) => `R$ ${Number(valor)?.toFixed(2)}`,
    },
    {
      title: 'Data de vencimento',
      dataIndex: 'data',
      key: 'data',
      render: (data: string) => new Date(data).toLocaleDateString(),
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
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: Payment) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Editar
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Excluir
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          Novo Pagamento
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={payments}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingPayment ? 'Editar Pagamento' : 'Novo Pagamento'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          {!editingPayment && (
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
                {students.map(student => (
                  <Option key={student.id} value={student.id}>
                    {student.nome} - {student.email}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="valor"
            label="Valor"
            rules={[{ required: true, message: 'Por favor, insira o valor' }]}
          >
            <InputNumber
              prefix="R$"
              style={{ width: '100%' }}
              precision={2}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="data"
            label="Data de vencimento"
            rules={[{ required: true, message: 'Por favor, selecione a data' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Por favor, selecione o status' }]}
          >
            <Select>
              <Option value="pendente">Pendente</Option>
              <Option value="pago">Pago</Option>
              <Option value="atrasado">Atrasado</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="observacao"
            label="Observação"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingPayment ? 'Atualizar' : 'Criar'}
              </Button>
              <Button onClick={() => setModalVisible(false)}>
                Cancelar
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

export default PaymentList; 