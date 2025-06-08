# Student Financing Application

Este é um projeto full-stack que consiste em um backend Node.js com PostgreSQL e um frontend React.

## Requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn
- Docker e Docker Compose
- Git

## Estrutura do Projeto

```
.
├── student-financing-backend/    # Backend Node.js
├── student-financing-frontend/    # Frontend React
└── docker-compose.yml            # Configuração do Docker
```

## Rodando com Docker (Recomendado)

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

## Rodando Localmente

### Backend

1. Certifique-se de ter o PostgreSQL instalado e rodando localmente
2. Configure as seguintes variáveis de ambiente no backend:
   - DB_HOST=localhost
   - DB_PORT=5432
   - DB_NAME=meubanco
   - DB_USER=meuusuario
   - DB_PASS=minhasenha
   - NODE_ENV=development

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

## Acessando a Aplicação

- Frontend: http://localhost:5173 (ou a porta que o Vite indicar)
- Backend API: http://localhost:3000

## Comandos Úteis

### Docker
- Para parar os containers: `docker-compose down`
- Para ver os logs: `docker-compose logs -f`
- Para reconstruir os containers: `docker-compose up -d --build`

### Desenvolvimento
- Para instalar dependências do frontend: `cd student-financing-frontend && npm install`
- Para instalar dependências do backend: `cd student-financing-backend && npm install`

## Solução de Problemas

1. Se o banco de dados não estiver acessível:
   - Verifique se o container do PostgreSQL está rodando: `docker ps`
   - Verifique os logs: `docker-compose logs postgres`

2. Se o backend não estiver conectando ao banco:
   - Verifique se as variáveis de ambiente estão corretas
   - Verifique se o PostgreSQL está acessível na porta 5432

3. Se o frontend não estiver conectando ao backend:
   - Verifique se o backend está rodando
   - Verifique se as URLs de API no frontend estão corretas