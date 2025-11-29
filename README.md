# Svabhava Planner - Sistema de Gerenciamento de Aulas de Yoga

## 📝 Sobre o Projeto

O Svabhava Planner é uma aplicação web moderna desenvolvida como parte do projeto de extensão acadêmica (PAC - Projeto de Aprendizagem Colaborativa Extensionista) do curso de Engenharia de Software no Centro Universitário Católica de Santa Catarina(Campus Joinville). O sistema foi projetado para facilitar o gerenciamento de aulas de yoga, tendo como caso de estudo as necessidades da instrutora Sibelle Eggert. A plataforma oferece uma solução completa para o gerenciamento de alunos, agendamentos e matrículas, demonstrando como o conhecimento acadêmico pode ser aplicado para beneficiar a comunidade.

## 📱 Descrição do App

O **Svabhava Planner** é um sistema web completo desenvolvido para gerenciar aulas de yoga de forma eficiente e organizada. A aplicação permite que instrutores de yoga controlem todos os aspectos do seu negócio através de uma interface moderna e intuitiva.

### Funcionalidades Principais:

- **Gestão de Alunos**: Cadastro completo de alunos com informações pessoais (nome, e-mail, telefone), histórico de participação e dados de contato organizados.

- **Gestão de Turmas**: Criação e organização de turmas com controle de vagas (máximo de 3 alunos por turma), agendamento de horários e datas, e visualização de agenda diária.

- **Controle de Presença**: Registro de presença e falta dos alunos em cada aula, com histórico completo de frequência individual.

- **Gestão Financeira**: Sistema completo de pagamentos que permite registrar pagamentos realizados, controlar pendências, visualizar histórico financeiro por aluno e receber alertas sobre pagamentos atrasados.

- **Dashboard e Estatísticas**: Visão geral com métricas importantes como número de turmas, quantidade de alunos, taxa de ocupação e indicadores de ausências.

- **Interface Responsiva**: Design adaptável que funciona perfeitamente em desktops, tablets e smartphones, permitindo acesso de qualquer dispositivo.

A aplicação foi desenvolvida utilizando tecnologias modernas como React com TypeScript no frontend e Express.js com TypeORM no backend, garantindo uma experiência de usuário fluida e um sistema robusto e escalável.

#### Acadêmicos
- Andrey Garcia dos Santos
- Graziela Torres
- Sophia Eggert Freire da Rocha

### Professores orientadores

- Luiz Carlos Camargo
- Claudinei Dias

## Divisão de responsabilidades

- Sophia: Banco de dados, backend
- Andrey: Backend e frontend
- Graziela: Frontend, infraestrutura

## 🎯 Justificativa do PAC

Este projeto foi desenvolvido como parte do PAC (Projeto de Aprendizagem Colaborativa Extensionista) do curso de Engenharia de Software da Católica de Santa Catarina, tendo como entidade beneficiada a instrutora de yoga **Sibelle Eggert**.

A instrutora Sibelle Eggert enfrentava desafios significativos no gerenciamento manual de suas aulas de yoga, incluindo:
- Dificuldade em organizar e acompanhar o cadastro de alunos
- Controle manual de agendamentos e matrículas em turmas
- Ausência de um sistema centralizado para registro de presença
- Gestão financeira manual de pagamentos e pendências
- Falta de visibilidade sobre estatísticas e histórico de alunos

O Svabhava Planner foi desenvolvido para resolver essas necessidades, oferecendo uma solução tecnológica completa que:
- **Automatiza processos** que antes eram manuais e propensos a erros
- **Centraliza informações** de alunos, turmas, presenças e pagamentos em um único sistema
- **Facilita a gestão** com interface intuitiva e responsiva, acessível de qualquer dispositivo
- **Fornece insights** através de estatísticas e relatórios que auxiliam na tomada de decisões
- **Melhora a experiência** tanto da instrutora quanto dos alunos, com confirmações automáticas e histórico organizado

Este projeto demonstra a aplicação prática do conhecimento acadêmico em benefício da comunidade, fortalecendo a relação entre universidade e sociedade através da extensão universitária.

## 💻 Requisitos do Sistema


### Requisitos Funcionais

RF1: O sistema deve permitir que a instrutora cadastre novos alunos com nome, e-mail e telefone.

RF2: O sistema deve permitir login e logout da instrutora com autenticação por e-mail e senha.

RF3: O sistema deve permitir à instrutora criar, editar e excluir turmas com até 3 alunos, informando data, horário e lista de alunos inscritos.

RF4: O sistema deve exibir para a instrutora uma agenda diária com os horários das turmas e seus respectivos alunos.

RF5: O sistema deve permitir que a instrutora matricule alunos nas turmas com vagas disponíveis (máximo de 3 por turma).

RF6: O sistema deve permitir que a instrutora cancele a matrícula de alunos em turmas específicas.

RF7: O sistema deve apresentar à instrutora estatísticas como número de turmas, quantidade de alunos, taxa de ocupação e ausências.

RF8: O sistema deve permitir que a instrutora marque presença ou falta dos alunos em cada aula realizada.

RF9: O sistema deve exibir à instrutora o histórico de presença de cada aluno.

RF10: O sistema deve permitir à instrutora organizar e alterar os horários disponíveis para turmas.

RF11: O sistema deve permitir editar dados básicos dos alunos (nome, e-mail, telefone).

RF12: O sistema deve permitir registrar pagamentos feitos pelos alunos, valores pendentes e histórico financeiro individual.

RF13: O sistema deve alertar a instrutora sobre pendências de presença ou pagamentos atrasados dos alunos.

RF14: O sistema deve permitir que a instrutora cancele a matrícula de alunos.

### Requisitos Não Funcionais

RNF1: A interface deve se adaptar bem a diferentes tamanhos de tela, com prioridade para boa usabilidade em celulares e tablets.

RNF2: O sistema deve responder a qualquer ação do usuário em até 5 segundos.

RNF3: O sistema deve ser estruturado para crescer junto com o aumento de alunos e turmas, sem perda de desempenho.

RNF4: A interface deve ser clara, com fluxos simples e linguagem acessível à instrutora.

RNF5: O código deve seguir boas práticas (componentização, comentários, organização) para facilitar futuras manutenções e melhorias.

RNF6: O sistema deve permitir que a instrutora acesse de diferentes dispositivos ao mesmo tempo, sem conflitos de dados.

RNF7: O sistema deve funcionar corretamente nos principais navegadores: Chrome, Firefox, Safari e Edge.

RNF8: Deve evitar requisições desnecessárias, usar cache onde possível e carregar dados de forma eficiente.

RNF9: As senhas devem ser armazenadas de forma criptografada (ex: bcrypt) e o acesso ao sistema deve ser protegido por autenticação.

RNF10: O sistema deve estar disponível para uso em pelo menos 99,9% do tempo, com mecanismos para evitar quedas.

RNF11: Deve haver backups automáticos e manuais dos dados críticos, como alunos, turmas, frequência e pagamentos.

RNF12: O sistema deve ser totalmente funcional em telas a partir de 320px de largura.

RNF13: O sistema deve gerar relatórios (PDF ou CSV) de turmas, alunos matriculados e frequência por período.

RNF14: O sistema deve exibir mensagens de erro claras e compreensíveis para a instrutora em caso de falhas.

RNF15: O sistema deve exibir em formato de calendário ou lista todas as turmas do dia, com seus respectivos alunos e status de presença.


## 📊 Modelagem

![image](https://github.com/user-attachments/assets/ff0ee924-508b-41bd-bc6e-240066ff6e89)

![image](https://github.com/user-attachments/assets/0588e0df-64b0-43cb-a5fe-4f7e761d1191)

![image](https://github.com/user-attachments/assets/bd509cd8-7f4b-4a28-a3c2-8b2ace67626d)



## 🔧 Requisitos para Preparar o Ambiente de Desenvolvimento

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** (versão 9 ou superior) ou **yarn**
- **MySQL** (versão 8.0 ou superior)
- **Git** para clonar o repositório

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/grazielatrres/svabhava-planner.git
cd svabhava-planner
```

2. **Configure o banco de dados MySQL**
   - Crie um banco de dados MySQL
   - Configure as variáveis de ambiente no backend (consulte `backend/env.example`)

3. **Instale as dependências do backend**
```bash
cd backend
npm install
```

4. **Instale as dependências do frontend**
```bash
cd ../frontend
npm install
```

5. **Configure as variáveis de ambiente**
   - Backend: Copie `backend/env.example` para `backend/.env` e configure as variáveis
   - Frontend: Copie `frontend/env.example` para `frontend/.env` e configure a URL da API

6. **Execute as migrações do banco de dados**
```bash
cd ../backend
npm run migration:run
```

7. **Inicie o servidor backend**
```bash
npm run dev
```

8. **Em outro terminal, inicie o servidor frontend**
```bash
cd frontend
npm run dev
```

O sistema estará disponível em `http://localhost:5173` (frontend) e a API em `http://localhost:3000` (backend).

## 🌐 Compatibilidade

O sistema é compatível com os seguintes navegadores:
- Google Chrome (última versão)
- Mozilla Firefox (última versão)
- Microsoft Edge (última versão)

## 📱 Responsividade

A aplicação é totalmente responsiva, adaptando-se aos seguintes dispositivos:
- Desktops
- Tablets
- Smartphones

## 📸 Telas do Sistema

### Dashboard
![Dashboard](assets/screenshot-dashboard.png)
**Descrição:** Tela principal do sistema exibindo visão geral com estatísticas de alunos, turmas e informações resumidas para a instrutora.

### Gestão de Alunos
![Alunos](assets/screenshot-alunos.png)
**Descrição:** Interface para cadastro, edição e visualização de alunos, permitindo gerenciar informações pessoais e histórico de cada aluno.

### Gestão de Turmas
![Turmas](assets/screenshot-turmas.png)
**Descrição:** Tela para criação e gerenciamento de turmas, incluindo agendamento de horários, matrícula de alunos e controle de vagas disponíveis.

### Gestão de Pagamentos
![Pagamentos](assets/screenshot-pagamentos.png)
**Descrição:** Interface para registro e acompanhamento de pagamentos, permitindo visualizar status financeiro de cada aluno e histórico de transações.

### Alunos e Pagamentos - Visão Integrada
![Alunos e Pagamentos](assets/screenshot-alunos-pagamentos-atalho.png)
**Descrição:** Visão integrada que permite acesso rápido às informações de alunos e seus respectivos pagamentos, facilitando a gestão financeira.

## 👥 Casos de Uso

### Cadastro de Usuário (Pendente)
- Acesso à página de cadastro
- Preenchimento de formulário
- Validação de dados
- Criação de conta
- Confirmação por e-mail

### Gestão de turmas
- Visualização das turmas cadastradas
- Inclusão/Edição de turmas
- Vincular aulo à aula
- Registro de presença do aluno na turma
- Notificação por e-mail - Pendente

### Gestão de pagamento
- Visualizar pagamentos
- Adicionar pagamentos pendentes, atrasados e pagos
- Editar pagamentos
- Remover alunos

### Gestão de alunos
- Adicionar novos alunos
- Editar alunos existentes
- Visualizar histórico de pagamento por aluno
- Remover alunos

Vou propor uma descrição atualizada que reflete a realidade do projeto:

## 🛠 Padrões de Desenvolvimento e tecnologias utilizadas

### Arquitetura
- **Clean Architecture (Backend)** - Separação clara de responsabilidades em controllers, services, repositories e models
- **Component-Based Architecture (Frontend)** - Estrutura baseada em componentes React com separação em pages e components

### Frontend
- **React com TypeScript** - Desenvolvimento com tipagem forte e componentes funcionais
- **Ant Design** - UI components para interface consistente
- **Styled Components** - Estilização com CSS-in-JS
- **React Router** - Roteamento da aplicação

### Backend
- **Express.js** - Framework para construção da API REST
- **TypeORM** - ORM para gerenciamento de banco de dados
- **Migrations** - Sistema de migrações para controle de versão do banco de dados

### Padrões de Código
- **TypeScript Strict Mode** - Tipo forte e verificação estática em ambos frontend e backend
- **ESLint** - Padronização de código no frontend
- **Decorators** - Uso de decorators para metadados e configuração (TypeORM)

### API e Integração
- **REST Architecture** - Endpoints RESTful com separação clara de responsabilidades
- **Axios** - Cliente HTTP para comunicação com a API
- **CORS** - Configuração de segurança para requisições cross-origin

### Estrutura de Diretórios

#### Frontend
```
src/
├── assets/      # Recursos estáticos
├── components/  # Componentes reutilizáveis
├── pages/       # Páginas da aplicação
├── services/    # Serviços de API
└── contexts/    # (Preparado para Context API)
```

#### Backend
```
src/
├── config/      # Configurações da aplicação
├── controllers/ # Controladores da API
├── models/      # Modelos de dados
├── services/    # Lógica de negócio
├── repositories/# Acesso a dados
├── routes/      # Definição de rotas
├── middlewares/ # Middlewares da aplicação
└── interfaces/  # Definições de tipos

## 🗄️ Banco de Dados

### Tecnologia
- **MySQL** - Sistema de gerenciamento de banco de dados relacional (RDBMS)
- **TypeORM** - ORM para TypeScript/Node.js

### Modelo de Dados
O sistema utiliza um modelo relacional com as seguintes entidades principais:

![image](https://github.com/user-attachments/assets/29362b34-86fc-4857-9bc0-4320d8b6edb5)


## 📄 Licença
Este é um projeto acadêmico desenvolvido para fins educacionais e sociais como parte da disciplina de PROJETO DE APRENDIZAGEM COLABORATIVA EXTENSIONISTA (PAC) do curso de Engenharia de Software doCentro Universitário Católica de Santa Catarina(Campus Joinville). Todo o código e documentação foram criados com propósito de aprendizagem e contribuição para a comunidade, demonstrando a aplicação prática do conhecimento acadêmico em benefício da sociedade sem fins lucrativos.

© 2025 - Todos os direitos reservados

---

