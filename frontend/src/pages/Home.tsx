import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Typography, Spin, message, Tag } from 'antd';
import { UserOutlined, TeamOutlined, CalendarOutlined, WarningOutlined } from '@ant-design/icons';
import { turmaService } from '../services/turmaService';
import { studentService } from '../services/studentService';
import { presencaService } from '../services/presencaService';
import { paymentService, Payment } from '../services/paymentService';
import { Turma } from '../services/turmaService';
import { Presenca } from '../services/presencaService';
import styled from 'styled-components';

const { Title } = Typography;

const DashboardContainer = styled.div`
  padding: 24px;
  width: 90%;
  max-width: 1400px;
  margin: 40px auto;
  background: rgba(255,255,255,0.8);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
`;

const StyledCard = styled(Card)`
  .ant-statistic-title {
    color: #666;
    font-weight: 500;
  }
  
  .ant-statistic-content {
    color: #ba6ac9;
  }

  .anticon {
    color: #ba6ac9;
  }
`;

const StyledTableCard = styled(Card)`
  .ant-card-head-title {
    color: #333;
    font-weight: 600;
  }
`;

interface DashboardStats {
  totalTurmas: number;
  totalAlunos: number;
  taxaOcupacao: number;
  totalAusencias: number;
  turmasRecentes: Turma[];
  pagamentosPendentes: Payment[];
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalTurmas: 0,
    totalAlunos: 0,
    taxaOcupacao: 0,
    totalAusencias: 0,
    turmasRecentes: [],
    pagamentosPendentes: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [turmas, alunos, presencas, pagamentos] = await Promise.all([
          turmaService.getAll(),
          studentService.getAll(),
          presencaService.getAllPresencas(),
          paymentService.getAll()
        ]);

        // Ordenar turmas por data_aula (mais próxima primeiro)
        const turmasOrdenadas = [...turmas].sort((a, b) => {
          return new Date(a.data_aula).getTime() - new Date(b.data_aula).getTime();
        });

        // Filtrar pagamentos pendentes e atrasados
        const pagamentosPendentes = pagamentos
          .filter(p => p.status === 'pendente' || p.status === 'atrasado')
          .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

        // Calcular estatísticas
        const totalAusencias = presencas.filter((p: Presenca) => !p.presente).length;
        const taxaOcupacao = turmas.reduce((acc, turma) => {
          const alunosNaTurma = turma.alunos?.length || 0;
          return acc + (alunosNaTurma / 20); // Assumindo capacidade máxima de 20 alunos
        }, 0) / turmas.length * 100;

        setStats({
          totalTurmas: turmas.length,
          totalAlunos: alunos.length,
          taxaOcupacao: Math.round(taxaOcupacao),
          totalAusencias,
          turmasRecentes: turmasOrdenadas.slice(0, 5), // 5 turmas mais próximas
          pagamentosPendentes: pagamentosPendentes.slice(0, 5) // 5 pagamentos mais próximos do vencimento
        });
      } catch (error) {
        message.error('Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Data da Aula',
      dataIndex: 'data_aula',
      key: 'data_aula',
      render: (date: string) => new Date(date).toLocaleDateString('pt-BR'),
      sorter: (a: Turma, b: Turma) => new Date(a.data_aula).getTime() - new Date(b.data_aula).getTime()
    },
    {
      title: 'Horário',
      dataIndex: 'horario',
      key: 'horario',
    },
    {
      title: 'Professor',
      dataIndex: 'professor',
      key: 'professor',
    }
  ];

  const pagamentosColumns = [
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
      render: (data: string) => new Date(data).toLocaleDateString('pt-BR'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const colors = {
          pendente: 'warning',
          atrasado: 'error'
        };
        return <Tag color={colors[status as keyof typeof colors]}>{status.toUpperCase()}</Tag>;
      },
    }
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <DashboardContainer>
      <Title level={2}>Dashboard</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <StyledCard>
            <Statistic
              title="Total de Turmas"
              value={stats.totalTurmas}
              prefix={<TeamOutlined />}
            />
          </StyledCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledCard>
            <Statistic
              title="Total de Alunos"
              value={stats.totalAlunos}
              prefix={<UserOutlined />}
            />
          </StyledCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledCard>
            <Statistic
              title="Taxa de Ocupação"
              value={stats.taxaOcupacao}
              suffix="%"
              prefix={<CalendarOutlined />}
            />
          </StyledCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StyledCard>
            <Statistic
              title="Total de Ausências"
              value={stats.totalAusencias}
              prefix={<WarningOutlined />}
            />
          </StyledCard>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <StyledTableCard title="Próximas Aulas">
            <Table
              dataSource={stats.turmasRecentes}
              columns={columns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </StyledTableCard>
        </Col>
        <Col xs={24} lg={12}>
          <StyledTableCard title="Pagamentos Pendentes">
            <Table
              dataSource={stats.pagamentosPendentes}
              columns={pagamentosColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </StyledTableCard>
        </Col>
      </Row>
    </DashboardContainer>
  );
};

export default Home; 