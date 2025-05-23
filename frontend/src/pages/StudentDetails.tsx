import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Descriptions, Spin, message, Table, Tag, Select } from 'antd';
import { Student, studentService } from '../services/studentService';
import { pagamentoService, Pagamento } from '../services/pagamentoService';
import dayjs from 'dayjs';

interface StudentDetailsProps {
  studentId: string;
  visible: boolean;
  onClose: () => void;
}

const { Option } = Select;

const StudentDetails: React.FC<StudentDetailsProps> = ({ studentId, visible, onClose }) => {
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<Pagamento[]>([]);
  const [paymentsLoading, setPaymentsLoading] = useState(false);

  useEffect(() => {
    if (visible && studentId) {
      setLoading(true);
      studentService.getById(studentId)
        .then(setStudent)
        .catch(() => message.error('Erro ao carregar dados do aluno'))
        .finally(() => setLoading(false));
    }
  }, [studentId, visible]);

  const fetchPayments = async () => {
    setPaymentsLoading(true);
    try {
      const data = await pagamentoService.getPagamentosByAluno(Number(studentId));
      setPayments(data);
    } catch {
      message.error('Erro ao carregar pagamentos');
    } finally {
      setPaymentsLoading(false);
    }
  };

  useEffect(() => {
    if (visible && studentId) {
      fetchPayments();
    }
    // eslint-disable-next-line
  }, [studentId, visible]);

  const handleStatusChange = async (pagamento: Pagamento, status: Pagamento['status']) => {
    try {
      await pagamentoService.updatePagamento(pagamento.id!, { status });
      message.success('Status atualizado!');
      fetchPayments();
    } catch {
      message.error('Erro ao atualizar status');
    }
  };

  const columns = [
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
      render: (valor: number) => `R$ ${valor.toFixed(2)}`
    },
    {
      title: 'Data',
      dataIndex: 'dataPagamento',
      key: 'dataPagamento',
      render: (data: string) => dayjs(data).format('DD/MM/YYYY')
    },
    {
      title: 'Método',
      dataIndex: 'metodoPagamento',
      key: 'metodoPagamento',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: Pagamento['status']) => {
        let color = 'default';
        if (status === 'pago') color = 'green';
        else if (status === 'pendente') color = 'orange';
        else if (status === 'cancelado') color = 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    },
    {
      title: 'Observação',
      dataIndex: 'observacao',
      key: 'observacao',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (_: any, record: Pagamento) => (
        <Select
          value={record.status}
          style={{ width: 120 }}
          onChange={status => handleStatusChange(record, status)}
        >
          <Option value="pago">Pago</Option>
          <Option value="pendente">Pendente</Option>
          <Option value="cancelado">Cancelado</Option>
        </Select>
      )
    }
  ];

  return (
    <Modal open={visible} onCancel={onClose} onOk={onClose} width={800} footer={null} title="Detalhes do Aluno">
      {loading || !student ? (
        <Spin />
      ) : (
        <Tabs defaultActiveKey="dados">
          <Tabs.TabPane tab="Dados" key="dados">
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Nome">{student.nome}</Descriptions.Item>
              <Descriptions.Item label="Email">{student.email}</Descriptions.Item>
              <Descriptions.Item label="Telefone">{student.telefone}</Descriptions.Item>
            </Descriptions>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Pagamentos" key="pagamentos">
            <h3>Pagamentos do Aluno</h3>
            <Table
              dataSource={payments}
              columns={columns}
              rowKey="id"
              loading={paymentsLoading}
              pagination={false}
            />
          </Tabs.TabPane>
        </Tabs>
      )}
    </Modal>
  );
};

export default StudentDetails; 