# Alume - Sistema de Financiamentos Estudantis

Este é um projeto full-stack desenvolvido para a Alume, uma startup que conecta estudantes de medicina a financiamentos estudantis personalizados. O sistema permite que estudantes se cadastrem e simulem financiamentos.

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js com TypeScript
- PostgreSQL (banco de dados)
- Sequelize (ORM)
- JWT para autenticação
- Zod para validação de dados
- Docker e Docker Compose

### Frontend
- React com TypeScript
- Vite
- React Hook Form
- Zod para validação
- Context API para gerenciamento de estado
- Styled Components, Tailwind para estilização

## 📋 Requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn
- Docker e Docker Compose
- Git

## 🏗️ Estrutura do Projeto

```
.
├── student-financing-backend/    # Backend Node.js + TypeScript
├── student-financing-frontend/   # Frontend React + TypeScript
└── docker-compose.yml           # Configuração do Docker
```

## 🚀 Rodando com Docker (Recomendado)

Esta é a maneira mais fácil de executar a aplicação, pois configura automaticamente o banco de dados e o backend.

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd [NOME_DO_REPOSITÓRIO]
```

2. Inicie os containers com Docker Compose:
```bash
docker-compose up -d
```

Isso irá:
- Criar e iniciar um container PostgreSQL
- Criar e iniciar o container do backend Node.js
- Configurar automaticamente as variáveis de ambiente

3. Para o frontend, abra um novo terminal e execute:
```bash
cd student-financing-frontend
npm install
npm run dev
```

## 💻 Rodando Localmente

### Backend

1. Certifique-se de ter o PostgreSQL instalado e rodando localmente
2. Configure as seguintes variáveis de ambiente no backend:
   - DB_HOST=localhost
   - DB_PORT=5432
   - DB_NAME=meubanco
   - DB_USER=meuusuario
   - DB_PASS=minhasenha
   - NODE_ENV=development
   - JWT_SECRET=umaChaveSecretaMuitoForte123!
   - JWT_EXPIRES_IN=5m

3. Execute o backend:
```bash
cd student-financing-backend
npm install
npm run dev
```

### Frontend

1. Em um novo terminal:
```bash
cd student-financing-frontend
npm install
npm run dev
```

## 🔗 Endpoints da API

### Autenticação
- `POST /api/register` - Cadastro de novo estudante
- `POST /api/login` - Login
- `POST /api/me` - Dados do estudante autenticado
- `PUT /api/me` - Atualização de dados do estudante

### Simulações (Requer autenticação)
- `POST /api/simulations` - Criar nova simulação
- `GET /api/simulations` - Listar simulações do estudante

## 🖥️ Acessando a Aplicação

- Frontend: http://localhost:5173 (ou a porta que o Vite indicar)
- Backend API: http://localhost:3000

## 🛠️ Comandos Úteis

### Docker
- Para parar os containers: `docker-compose down`
- Para ver os logs: `docker-compose logs -f`
- Para reconstruir os containers: `docker-compose up -d --build`

### Desenvolvimento
- Para instalar dependências do frontend: `cd student-financing-frontend && npm install`
- Para instalar dependências do backend: `cd student-financing-backend && npm install`

## 🔍 Funcionalidades Implementadas

### Backend
- Autenticação JWT com expiração de 5 minutos
- CRUD completo de estudantes
- Simulação de financiamentos com cálculo de parcelas
- Validação de dados com Zod
- Arquitetura modular (controllers, services, middlewares)

### Frontend
- Sistema de autenticação completo
- Dashboard com resumo das simulações
- Simulador de financiamento interativo
- Histórico de simulações com filtros
- Perfil do estudante com edição de dados
- Design responsivo

## 🚨 Solução de Problemas

1. Se o banco de dados não estiver acessível:
   - Verifique se o container do PostgreSQL está rodando: `docker ps`
   - Verifique os logs: `docker-compose logs postgres`

2. Se o backend não estiver conectando ao banco:
   - Verifique se as variáveis de ambiente estão corretas
   - Verifique se o PostgreSQL está acessível na porta 5432

3. Se o frontend não estiver conectando ao backend:
   - Verifique se o backend está rodando
   - Verifique se as URLs de API no frontend estão corretas
   - Verifique se o token JWT está sendo enviado corretamente

## 📝 Notas Adicionais 

- Todas as senhas são criptografadas antes de serem armazenadas
- O token JWT expira em 5 minutos por questões de segurança
- As simulações são vinculadas ao estudante autenticado