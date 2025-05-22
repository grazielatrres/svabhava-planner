import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Typography, Spin, message } from 'antd';
import { UserOutlined, TeamOutlined, CalendarOutlined, WarningOutlined } from '@ant-design/icons';
import { turmaService } from '../services/turmaService';
import { studentService } from '../services/studentService';
import { presencaService } from '../services/presencaService';
import { Turma } from '../services/turmaService';
import { Student } from '../services/studentService';
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
  alunosRecentes: Student[];
}

const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalTurmas: 0,
    totalAlunos: 0,
    taxaOcupacao: 0,
    totalAusencias: 0,
    turmasRecentes: [],
    alunosRecentes: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const turmas = await turmaService.getAll();
        const alunos = await studentService.getAll();
        const presencas = await presencaService.getAllPresencas();
        const totalTurmas = turmas.length;
        const totalAlunos = alunos.length;
        
        const totalAlunosEmTurmas = turmas.reduce((acc, turma) => 
          acc + (turma.alunos?.length || 0), 0);
        const taxaOcupacao = totalTurmas > 0 
          ? (totalAlunosEmTurmas / totalTurmas) 
          : 0;

        const totalAusencias = presencas.filter((p: Presenca) => !p.presente).length;

        const turmasRecentes = turmas
          .sort((a, b) => b.id.localeCompare(a.id))
          .slice(0, 5);

        const alunosRecentes = alunos
          .sort((a, b) => b.id.localeCompare(a.id))
          .slice(0, 5);

        setStats({
          totalTurmas,
          totalAlunos,
          taxaOcupacao,
          totalAusencias,
          turmasRecentes,
          alunosRecentes
        });
      } catch (error: any) {
        console.error('Erro ao carregar dados do dashboard:', error);
        if (error.response) {
          console.error('Detalhes do erro:', {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers
          });
        } else if (error.request) {
          console.error('Erro na requisição:', error.request);
        } else {
          console.error('Erro:', error.message);
        }
        message.error('Erro ao carregar dados do dashboard. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const turmasColumns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Professor',
      dataIndex: 'professor',
      key: 'professor',
    },
    {
      title: 'Horário',
      dataIndex: 'horario',
      key: 'horario',
    },
    {
      title: 'Alunos',
      dataIndex: 'alunos',
      key: 'alunos',
      render: (alunos: any[]) => alunos?.length || 0,
    },
  ];

  const alunosColumns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'telefone',
      key: 'telefone',
    },
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
      <Title level={2} style={{ marginBottom: '24px', color: '#333' }}>Dashboard</Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <StyledCard>
            <Statistic
              title="Total de Turmas"
              value={stats.totalTurmas}
              prefix={<CalendarOutlined />}
            />
          </StyledCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StyledCard>
            <Statistic
              title="Total de Alunos"
              value={stats.totalAlunos}
              prefix={<TeamOutlined />}
            />
          </StyledCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StyledCard>
            <Statistic
              title="Taxa de Ocupação"
              value={stats.taxaOcupacao.toFixed(1)}
              suffix="alunos/turma"
              prefix={<UserOutlined />}
            />
          </StyledCard>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StyledCard>
            <Statistic
              title="Total de Ausências"
              value={stats.totalAusencias}
              prefix={<WarningOutlined />}
            />
          </StyledCard>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} lg={12}>
          <StyledTableCard title="Turmas Recentes">
            <Table
              dataSource={stats.turmasRecentes}
              columns={turmasColumns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </StyledTableCard>
        </Col>
        <Col xs={24} lg={12}>
          <StyledTableCard title="Alunos Recentes">
            <Table
              dataSource={stats.alunosRecentes}
              columns={alunosColumns}
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