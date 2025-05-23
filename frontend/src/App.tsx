import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import { Link, Route, Routes } from 'react-router-dom';
import StudentList from './pages/StudentList';
import TurmaList from './pages/TurmaList';
import Home from './pages/Home';
import PaymentList from './pages/PaymentList';

const { Header, Content } = Layout;

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%,rgb(214, 205, 214) 100%);
`;

const StyledHeader = styled(Header)`
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 1rem;
  width: 100%;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const StyledContent = styled(Content)`
  width: 100%;
  padding: 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

function App() {
  return (
    <AppContainer>
      <Layout style={{ minHeight: '100vh', width: '100%' }}>
        <StyledHeader>
          <Menu mode="horizontal" style={{ border: 'none' }}>
            <Menu.Item key="home">
              <Link to="/">Início</Link>
            </Menu.Item>
            <Menu.Item key="students">
              <Link to="/alunos">Alunos</Link>
            </Menu.Item>
            <Menu.Item key="turmas">
              <Link to="/turmas">Turmas</Link>
            </Menu.Item>
            <Menu.Item key="payments">
              <Link to="/pagamentos">Pagamentos</Link>
            </Menu.Item>
            <Menu.Item key="schedule">
              <Link to="/schedule">Agenda</Link>
            </Menu.Item>
          </Menu>
        </StyledHeader>

        <StyledContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alunos" element={<StudentList />} />
            <Route path="/turmas" element={<TurmaList />} />
            <Route path="/pagamentos" element={<PaymentList />} />
            <Route path="/schedule" element={<StudentList />} />
          </Routes>
        </StyledContent>
      </Layout>
    </AppContainer>
  );
}

export default App;
