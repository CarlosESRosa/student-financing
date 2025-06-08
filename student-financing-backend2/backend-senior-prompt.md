
# 🧠 Prompt - Desenvolvedor Backend Senior (Arquitetura Modular - Node.js, Express, TypeScript)

## Objetivo

Você vai desenvolver uma **RESTful API** para um sistema de **financiamento estudantil** para estudantes de medicina. Essa API deve seguir padrões robustos de arquitetura, segurança, modularização e boas práticas modernas.

---

## 🛠️ Tecnologias & Padrões Obrigatórios:

- **Node.js com TypeScript**
- **Express**
- **Arquitetura Modular**
- **Sequelize ORM**
- **Docker + PostgreSQL (via docker-compose)**
- **Autenticação com JWT (expira em 5 minutos)**
- **Criptografia com bcrypt**
- **Validação com Zod ou Joi**
- **Tratamento de erros centralizado**
- **Variáveis sensíveis com `.env`**
- **Boas práticas REST (HTTP status, métodos, rotas limpas)**

---

## 📁 Estrutura esperada do projeto:

```
student-financing-api/
├── docker-compose.yml
├── .env
├── src/
│   ├── server.ts
│   ├── app.ts
│   ├── config/
│   │   ├── database.ts
│   │   └── env.ts
│   ├── core/
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── validate.middleware.ts
│   │   └── utils/
│   │       ├── jwt.ts
│   │       └── finance.ts
│   ├── modules/
│   │   ├── student/
│   │   │   ├── student.model.ts
│   │   │   ├── student.schema.ts
│   │   │   ├── student.service.ts
│   │   │   ├── student.controller.ts
│   │   │   ├── student.routes.ts
│   │   │   └── types.ts
│   │   └── simulation/
│   │       ├── simulation.model.ts
│   │       ├── simulation.schema.ts
│   │       ├── simulation.service.ts
│   │       ├── simulation.controller.ts
│   │       ├── simulation.routes.ts
│   │       └── types.ts
│   └── routes/
│       └── index.ts
```

---

## 🧍 Entidades:

### Student

- `id`, `nome`, `sobrenome`, `email` (único), `senha` (bcrypt)
- Endpoints:
  - `POST /api/register` - Criação de novo estudante
  - `POST /api/login` - Autenticação
  - `POST /api/me` - Retorna dados do estudante autenticado (sem senha)
  - `PUT /api/me` - Atualiza dados do estudante autenticado

### Simulation

- `id`, `id_estudante`, `valor_total`, `quantidade_parcelas`, `juros_ao_mes`, `valor_parcela_mensal` (calculado), `data_criacao`
- Endpoints:
  - `POST /api/simulations` - Cria uma nova simulação (retorna valor estimado da parcela com base nos dados informados)
  - `GET /api/simulations` - Lista todas as simulações realizadas pelo estudante

---

## 📌 Regras de Negócio

- Um estudante só pode visualizar, editar ou excluir suas próprias simulações.
- O campo `valor_parcela_mensal` da Simulation deve ser calculado com base na fórmula de juros compostos abaixo. **Price**:

```
PMT = PV * (i / (1 - (1 + i)^-n))
```

Onde:
- `PMT`: valor da parcela mensal
- `PV`: valor total do financiamento
- `i`: taxa de juros mensal (ex: 0.02 para 2%)
- `n`: número de parcelas

---

## ✅ Boas Práticas Forçadas:

- Nunca exponha senhas ou tokens.
- Sempre valide as entradas com Zod ou Joi.
- Crie middlewares para:
  - autenticação (JWT)
  - tratamento de erros
  - validação de dados
- Use o Sequelize com tipagem forte via TypeScript.
- Isolar lógica de negócios nos `services`.
- Separar rotas, controladores, modelos, schemas e validações por **módulo**.
- Trate exceções de forma elegante e consistente.
- Construa `.env` com: JWT_SECRET, DB configs, JWT_EXPIRES_IN.
- O JWT deve expirar em exatamente **5 minutos**.
- Crie comandos SQL automaticamente com Sequelize.

---

## 🧪 Validação

Utilize **Zod** preferencialmente (ou Joi) para criar schemas em `/schemas`, e sempre use `parse` ou middleware genérico `validate(schema)` antes de qualquer operação.

---

## 🐳 Docker Compose esperado:

- Um container para PostgreSQL
- Um volume persistente
- Exposição da porta 5432
- Container da API rodando `npm run dev`

---

## 📞 Padrão de Código e Convenções

### 📌 Convenções Gerais:

- **Nomenclatura sempre em inglês** para variáveis, funções, tipos e arquivos.
- Use **camelCase** para variáveis, funções e métodos.
  - Ex: `totalValue`, `studentEmail`, `calculateInstallment`
- Use **PascalCase** para nomes de classes, tipos e modelos Sequelize.
  - Ex: `StudentModel`, `SimulationService`, `FinanceUtils`
- Use **kebab-case** para nomes de arquivos.
  - Ex: `student.controller.ts`, `finance.utils.ts`
- Sempre use `async/await` e **não use `.then/.catch`**.
- Não deixar `console.log` em produção.

### 🧱 Organização de Código:

- Arquivos devem ser pequenos e objetivos.
- Nunca misture responsabilidades: Controllers só tratam entrada/saída HTTP, Services concentram regras de negócio, etc.
- Evite duplicações: extraia funções reutilizáveis para `utils/`.

### 🔪 Tipagem:

- Sempre use TypeScript com tipagem explícita.
- Não usar `any`, prefira `unknown` com validação ou criar um tipo.
- Crie arquivos `types.ts` dentro dos módulos para tipos específicos de entidade.

### 🔐 Segurança:

- Nunca retorne dados sensíveis como `password` em respostas.
- Use `.env` para tudo que for variável sensível.
- Configure `helmet`, `cors`, e limitação de requisições se for abrir a API publicamente.

---

## 🧼 Observações

- Tipos fortes e seguros.
- Código limpo, modular e com nomes claros.
- Modularize absolutamente tudo.
- Testes de lógica podem ser feitos depois da API completa.

---

⚠️ **NUNCA** escreva código fora das boas práticas mencionadas.  
🎯 Sempre responda com base nos requisitos definidos.  
🧩 Siga fielmente a arquitetura, as camadas e as tecnologias exigidas.
