# Svabhava Planner - Sistema de Gerenciamento de Aulas de Yoga

## 📝 Sobre o Projeto

O Svabhava Planner é uma aplicação web moderna desenvolvida como parte do projeto de extensão acadêmica (PAC - Projeto de Aprendizagem Colaborativa Extensionista) do curso de Engenharia de Software no Centro Universitário Católica de Santa Catarina(Campus Joinville). O sistema foi projetado para facilitar o gerenciamento de aulas de yoga, tendo como caso de estudo as necessidades da instrutora Sibelle Eggert. A plataforma oferece uma solução completa para o gerenciamento de alunos, agendamentos e matrículas, demonstrando como o conhecimento acadêmico pode ser aplicado para beneficiar a comunidade.

#### Acadêmicos
- Andrey Garcia dos Santos
- Graziela Torres
- Sophia Eggert Freire da Rocha

## Divisão de responsabilidades

- Sophia: Banco de dados, backend
- Andrey: Backend e frontend
- Graziela: Frontend, infraestrutura

### Principais Funcionalidades
- Cadastro e gerenciamento de alunos
- Agendamento de aulas
- Gestão de turmas e horários
- Confirmações automáticas por e-mail
- Interface responsiva e intuitiva

## 🚀 Tecnologias Utilizadas

### Core
- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e bundler moderno
- **Node.js** - Runtime JavaScript

### UI/UX
- **Radix UI Themes** - Sistema de design robusto e acessível
- **Styled Components** - Estilização com CSS-in-JS

### Desenvolvimento
- **ESLint** - Linting e padronização de código
- **TypeScript ESLint** - Regras de linting específicas para TypeScript

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
![Editor  Mermaid Chart-2025-04-25-200925 (1)](https://github.com/user-attachments/assets/94513c45-76c1-41b4-8f47-dbf60aa05d18)
![image](https://github.com/user-attachments/assets/8312592d-f26d-4036-a003-f788d8502241)


## 🔧 Instalação e Uso

```bash
# Clone o repositório
git clone https://github.com/grazielatrres/svabhava-planner.git

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

```

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

## 👥 Casos de Uso

### Cadastro de Usuário
- Acesso à página de cadastro
- Preenchimento de formulário
- Validação de dados
- Criação de conta
- Confirmação por e-mail

### Matrícula em Aula
- Visualização de aulas disponíveis
- Seleção de aula
- Confirmação de matrícula
- Notificação por e-mail

## 🛠 Padrões de Desenvolvimento

### Arquitetura
- **Clean Architecture** - Separação clara de responsabilidades e dependências
- **Componentes Modulares** – Utilizando o padrão arquitetural MVC (Model-View-Controller) para estruturar os componentes da aplicação.​

### Gestão de Estado
- **Context API** - Gerenciamento de estado global da aplicação
- **Custom Hooks** - Encapsulamento de lógica reutilizável
- **Immutability Helpers** - Manipulação segura de estado

### Padrões de Código
- **ESLint Rules** - Padronização de código seguindo melhores práticas
- **TypeScript Strict Mode** - Tipo forte e verificação estática

### API e Integração
- **REST Architecture** - Endpoints seguindo padrões RESTful
- **API Versioning** - Versionamento de endpoints para compatibilidade
- **Error Handling** - Tratamento padronizado de erros e exceções

## 🗄️ Banco de Dados

### Tecnologia
- **MySQL** - Sistema de gerenciamento de banco de dados relacional (RDBMS)
- **TypeORM** - ORM para TypeScript/Node.js

### Modelo de Dados
O sistema utiliza um modelo relacional com as seguintes entidades principais:

- **Alunos**
  - Informações pessoais (nome, email, telefone, endereço)
  - Observações
  - Relacionamentos com presenças e pagamentos

- **Turmas**
  - Nome da turma
  - Horário
  - Data da aula
  - Professor
  - Relacionamento muitos-para-muitos com alunos
  - Observações

- **Presenças**
  - Registro de presença/ausência
  - Data
  - Relacionamentos com aluno e turma

- **Pagamentos**
  - Valor
  - Data
  - Status (pendente, pago, atrasado)
  - Observações
  - Relacionamento com aluno

### Características
- Banco de dados MySQL com suporte a transações ACID
- ORM TypeORM para mapeamento objeto-relacional
- Índices otimizados para consultas frequentes
- Relacionamentos bem definidos entre entidades
- Timestamps automáticos (createdAt, updatedAt)
- UUID como chave primária para todas as entidades

## 📄 Licença
Este é um projeto acadêmico desenvolvido para fins educacionais e sociais como parte da disciplina de PROJETO DE APRENDIZAGEM COLABORATIVA EXTENSIONISTA (PAC) do curso de Engenharia de Software doCentro Universitário Católica de Santa Catarina(Campus Joinville). Todo o código e documentação foram criados com propósito de aprendizagem e contribuição para a comunidade, demonstrando a aplicação prática do conhecimento acadêmico em benefício da sociedade sem fins lucrativos.

© 2025 - Todos os direitos reservados

---

