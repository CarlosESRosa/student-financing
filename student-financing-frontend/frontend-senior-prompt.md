# 🧠 Prompt – Desenvolvedor Frontend Senior (SPA React + TypeScript + Clean Architecture)

## Objetivo

Você vai construir uma **Single-Page Application (SPA)** para um sistema de **financiamento estudantil** voltado a alunos de medicina. A aplicação consumirá a RESTful API já definida no backend e deverá oferecer uma experiência de uso intuitiva, responsiva (vou tratar a responsividade no final do projeto) e acessível, seguindo padrões robustos de arquitetura, segurança, modularização e boas práticas modernas.

*(React + TypeScript · Context API · Tailwind CSS)*

> Objetivo: Realizar tudo o que está descrito abaixo, mantendo código limpo e organizado.
> 

---

## 1 • O que o projeto **precisa** ter

| Módulo | Funcionalidade | Condição de aprovação |
| --- | --- | --- |
| **Auth** | Login, Registro, Logout, Proteção de rotas | Token salvo, redireciona a “/” se expirar ou faltar |
| **Dashboard** | Últimas 5 simulações• Dois cards (total de simulações & valor médio de parcelas) | Dados corretos; render sem erro |
| **Nova Simulação** | Formulário com **3** campos (valor, parcelas, juros) + cálculo em tempo real + botão **Salvar** | Valor da parcela coincide com o backend |
| **Histórico** | Tabela listando simulações do usuário + filtros simples (data **ou** valor **ou** parcelas) + paginação client-side | Filtros não quebram a paginação |
| **Perfil** | Exibir dados e botão **Editar** (renderizar novo formulário ou modal) | Atualização reflete na API |
| **UX básica** | Loading spinner durante chamadas; toast de erro em falhas | Não há “tela congelada” |

---

## 2 • Stacks

| Categoria | Biblioteca |
| --- | --- |
| Framework | **React + Vite** |
| State | **Context API + useReducer** |
| HTTP | **Axios** (interceptor p/ token) |
| Form | **React-Hook-Form + Zod** |
| CSS | **Tailwind CSS** |
| Ícones | Heroicons (SVG inline) |

---

## 3 • Estrutura de pastas

```jsx
src/
├── main.tsx
├── App.tsx              # providers + rotas
├── context/
│   └── AuthContext.tsx
├── services/
│   ├── api.ts           # axios + interceptors
│   ├── student.ts
│   └── simulation.ts
├── pages/               # 1 arquivo = 1 rota
│   ├── Login.tsx          ( / )
│   ├── Register.tsx       ( /cadastro )
│   ├── DashboardHome.tsx  ( /home )
│   ├── SimulationForm.tsx ( /nova-simulacao )
│   ├── SimulationHistory.tsx ( /historico )
│   ├── Profile.tsx        ( /perfil )
│   └── NotFound.tsx       ( /erro )
├── ui/                  # componentes reutilizáveis
│   ├── Button.tsx
│   ├── Spinner.tsx
│   └── form/            # TextField, CurrencyField…
└── utils/
    └── price.ts         # cálculo da parcel
```

---

## 4 • Rotas

```jsx
/               -> Login
/cadastro       -> Register
/home           -> Dashboard
/nova-simulacao -> Novo formulário
/historico      -> Histórico
/perfil         -> Perfil
/erro           -> 404
```

`<ProtectedRoute>` verifica a existência/validade do token.

---

## 5 • Paleta de cores

Use **SÓ** o tema claro; tema escuro é bônus.

```css
:root {
  --c-primary:  #003D49;
  --c-secondary:#00D1B4;
  --c-bg:       #DDF6F5;
  --c-surface:  #FFFFFF;
  --c-text:     #012E38;
}
```

Mapeie em Tailwind:

```jsx
extend: {
  colors: {
    primary:  'var(--c-primary)',
    secondary:'var(--c-secondary)',
    bg:       'var(--c-bg)',
    surface:  'var(--c-surface)',
    text:     'var(--c-text)',
  },
}
```

---

## 6 • API (resumo rápido)

| Método | Rota | Uso |
| --- | --- | --- |
| POST | `/register` | Criar conta |
| POST | `/login` | Login → `{ token }` |
| GET | `/me` | Dados do usuário |
| PUT | `/me` | Atualizar usuário |
| POST | `/simulations` | Nova simulação |
| GET | `/simulations` | Listar simulações |

Header protegido: `Authorization: Bearer <token>`.

---

## 7 • Checklist

- [ ]  Todas as rotas navegam corretamente.
- [ ]  Cadastro / login / logout funcionando.
- [ ]  Guard impede acesso sem token.
- [ ]  Form “Nova Simulação” calcula PMT em tempo real.
- [ ]  Dashboard mostra 5 últimas simulações e 2 cards.
- [ ]  Histórico lista, filtra **e** pagina.
- [ ]  Perfil exibe e atualiza dados.
- [ ]  Spinners em chamadas; toast em erros.