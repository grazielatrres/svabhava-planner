import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import styled from 'styled-components';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Nav = styled(NavigationMenu.Root)`
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavList = styled(NavigationMenu.List)`
  display: flex;
  gap: 2rem;
  list-style: none;
  max-width: 1200px;
  margin: 0 auto;
`;

const NavItem = styled(NavigationMenu.Item)`
  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
      color: #6366f1;
      background: rgba(99, 102, 241, 0.1);
    }
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroSection = styled.section`
  text-align: center;
  padding: 6rem 0;
  h1 {
    font-size: 4rem;
    color: #1a1a1a;
    margin-bottom: 1.5rem;
  }
  p {
    font-size: 1.5rem;
    color: #666;
    max-width: 700px;
    margin: 0 auto 2rem;
    line-height: 1.6;
  }
`;


const GetStartedButton = styled.button`
  font-size: 1.25rem;
  padding: 1rem 2rem;
  margin-top: 1rem;
`;

function App() {
  return (
    <Theme>
      <AppContainer>
        <Nav>
          <NavList>
            <NavItem>
              <NavigationMenu.Link href="/">Início</NavigationMenu.Link>
            </NavItem>
          </NavList>
        </Nav>

        <MainContent>
          <HeroSection>
            <h1>Yoga Sva-Bhava</h1>
            <p>
              Bem-vindo à sua jornada de mindfulness e bem-estar. 
              Descubra o equilíbrio perfeito entre corpo e mente através das nossas 
              sessões de yoga cuidadosamente preparadas.
            </p>
            <GetStartedButton>Comece Sua Jornada</GetStartedButton>
          </HeroSection>
        </MainContent>
      </AppContainer>
    </Theme>
  );
}

export default App;
