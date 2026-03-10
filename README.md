
# SangueFácil - Sistema de Doação de Sangue

Sistema web para facilitar o agendamento de doações de sangue, com fluxos separados para doadores e gestores de hemocentros.

## 📋 Integrantes do Projeto

- Atiel S. Brito
- Francisco Wellington
- Kauê
- Ronald
- Mayne
- Caio Limas
- Raphaela

## 🚀 Tecnologias Utilizadas

### Frontend
- **React** 19.0.0
- **TypeScript**
- **Vite** 6.4.1 (bundler e dev server)
- **TailwindCSS** 4.1.12 (estilização)
- **shadcn/ui** (componentes UI)
- **Material-UI Icons**
- **Radix UI** (primitivos de UI)

### Backend
- **Node.js** 24+
- **Express** 4.21.2
- **SQLite3** 5.1.7 (banco de dados)
- **sqlite** 5.1.1 (driver async)

### Testes
- **Node.js Test Runner** (built-in, sem dependências externas)

## 📁 Estrutura do Projeto

```
GRUPO_14-_PROJETO_INTEGRADOR_-SANGUEFACIL-/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app com rotas e CORS
│   │   ├── db.js                  # Inicialização do SQLite
│   │   └── server.js              # Servidor HTTP (porta 3001)
│   ├── tests/
│   │   ├── agendamentos.test.js   # Testes de agendamentos
│   │   ├── campanhas.test.js      # Testes de campanhas
│   │   ├── doadores.test.js       # Testes de doadores
│   │   ├── gestores.test.js       # Testes de gestores/login
│   │   └── hemocentros.test.js    # Testes de hemocentros
│   └── data/                      # Banco SQLite sanguefacil.db (ignorado no Git)
├── guidelines/                    # Diretrizes e documentação
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── AgendamentoScreen.tsx       # Tela de agendamento de doação
│   │   │   ├── CadastroScreen.tsx          # Tela de cadastro do doador
│   │   │   ├── CriarCampanhaScreen.tsx     # Tela de criação de campanhas
│   │   │   ├── DashboardScreen.tsx         # Dashboard do gestor
│   │   │   ├── FeedbackScreen.tsx          # Feedback pós-agendamento
│   │   │   ├── HemocentrosScreen.tsx       # Lista de hemocentros
│   │   │   ├── LoginGestorScreen.tsx       # Login do gestor
│   │   │   ├── RelatorioScreen.tsx         # Relatórios (tela)
│   │   │   ├── Footer.tsx                  # Footer
│   │   │   ├── figma/                      # Assets e designs do Figma
│   │   │   └── ui/                         # Componentes UI reutilizáveis
│   │   └── App.tsx                # Componente principal com roteamento
│   ├── imports/                   # Importações e utilidades
│   ├── styles/
│   │   └── index.css              # Estilos globais
│   └── main.tsx                   # Entry point (Vite)
├── dist/                          # Build de produção (gerado)
├── node_modules/                  # Dependências (ignorado no Git)
├── .env.example                   # Variáveis de ambiente de exemplo
├── .gitignore
├── .git/                          # Histórico Git
├── index.html                     # HTML template (Vite)
├── package.json                   # Dependências e scripts
├── package-lock.json
├── postcss.config.mjs             # Configuração do PostCSS
├── vite.config.ts                 # Configuração do Vite
├── README.md                      # Este arquivo
├── ATTRIBUTIONS.md                # Atribuições e créditos
```

## 🛠️ Instalação

### Pré-requisitos
- **Node.js** v24+ (ou v20+)
- **npm** v10+

### Passo 1: Clonar o repositório
```bash
git clone https://github.com/Atiel-sbrito/GRUPO_14-_PROJETO_INTEGRADOR_-SANGUEFACIL-.git
cd GRUPO_14-_PROJETO_INTEGRADOR_-SANGUEFACIL-
```

### Passo 2: Instalar dependências
```bash
npm install
```

### Passo 3: Configurar variáveis de ambiente (opcional)

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

**Variáveis disponíveis:**

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `BACKEND_PORT` | `3001` | Porta do servidor backend |
| `DB_PATH` | `backend/data/sanguefacil.db` | Caminho do banco de dados SQLite |

**Exemplo de `.env`:**
```
BACKEND_PORT=3001
DB_PATH=backend/data/sanguefacil.db
```

> **Nota:** Se não houver arquivo `.env`, o sistema usará os valores padrão automaticamente.

## 🎯 Como Executar o Projeto

### Executar Frontend (Modo Desenvolvimento)
```bash
npm run dev
```
- Acesse em: **http://localhost:5173**

### Executar Backend (Modo Desenvolvimento)
```bash
npm run backend:dev
```
- API disponível em: **http://localhost:3001**

### Executar Frontend e Backend simultaneamente
Recomendado abrir **dois terminais**:

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
npm run backend:dev
```

## 🧪 Testes

### Executar Testes do Backend
```bash
npm run backend:test
```

**Cobertura atual:** 14 testes, 100% de aprovação

Testes incluem:
- ✅ Cadastro de doadores (sucesso, validações, email duplicado)
- ✅ Listagem de hemocentros
- ✅ Criação de agendamentos (sucesso e validações)
- ✅ Listagem de agendamentos
- ✅ Login de gestores (sucesso, validações, credenciais inválidas)
- ✅ Criação de campanhas (sucesso e validações)
- ✅ Listagem de campanhas

## 📡 Endpoints da API

### Healthcheck
- **GET** `/health`
  - Retorna: `{ "status": "ok" }`
  - Descrição: Verifica se o servidor está respondendo

### Doadores
- **POST** `/api/doadores`
  - Body: `{ nome: string, idade: number, email: string }`
  - Retorna `201` com dados do doador criado
  - Retorna `400` para validações (idade mínima: 16 anos)
  - Retorna `409` para email já cadastrado
  - Campos obrigatórios: nome, idade, email

- **GET** `/api/doadores` *(não implementado em frontend)*
  - Retorna lista de todos os doadores
  - Usado principalmente para testes

### Hemocentros
- **GET** `/api/hemocentros`
  - Retorna lista de hemocentros com `id`, `nome`, `distancia`
  - Status `200` sempre
  - Seed: 6 hemocentros pré-cadastrados

### Agendamentos
- **POST** `/api/agendamentos`
  - Body: `{ hemocentro: string, data: string, horario: string }`
  - Retorna `201` com dados do agendamento criado
  - Retorna `400` para validações
  - Todos os campos são obrigatórios

- **GET** `/api/agendamentos`
  - Retorna lista de todos os agendamentos ordenados por data de criação (DESC)
  - Status `200` sempre

### Gestores / Autenticação
- **POST** `/api/gestores/login`
  - Body: `{ email: string, senha: string }`
  - Retorna `200` com `{ token, gestor: { id, nome, email } }` em sucesso
  - Retorna `400` para validações (campos obrigatórios)
  - Retorna `401` para credenciais inválidas
  - **Credenciais padrão:** 
    - Email: `admin@hemocentro.com`
    - Senha: `admin123`

### Campanhas
- **POST** `/api/campanhas`
  - Body: `{ titulo: string, tipo_sanguineo: string, descricao?: string }`
  - Retorna `201` com dados da campanha criada
  - Retorna `400` para validações
  - Campos obrigatórios: titulo, tipo_sanguineo
  - Campo opcional: descricao

- **GET** `/api/campanhas`
  - Retorna lista de todas as campanhas ordenadas por data de criação (DESC)
  - Status `200` sempre

### Teste rápido com cURL

```bash
# Healthcheck
curl http://localhost:3001/health

# Listar hemocentros
curl http://localhost:3001/api/hemocentros

# Cadastrar doador
curl -X POST http://localhost:3001/api/doadores \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","idade":25,"email":"joao@example.com"}'

# Fazer login
curl -X POST http://localhost:3001/api/gestores/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hemocentro.com","senha":"admin123"}'
```

## 🎨 Telas e Funcionalidades Implementadas

### 🔴 Fluxo do Doador

1. **HomeScreen** 
   - Página inicial com apresentação do sistema
   - Dois botões: "Entrar como Doador" e "Entrar como Gestor"
   - Footer com informações

2. **CadastroScreen** 
   - Formulário de cadastro de doador
   - Campos: Nome, Email, Idade
   - Integração com API POST `/api/doadores`
   - Validação: idade mínima 16 anos
   - Feedback: sucesso ou erro

3. **HemocentrosScreen** 
   - Lista de 6 hemocentros disponíveis
   - Integração com API GET `/api/hemocentros`
   - Cards com informações: nome, endereço, telefone, horário
   - Botão "Agendar Doação" para cada hemocentro

4. **AgendamentoScreen** 
   - Formulário para agendar doação
   - Campos: Hemocentro (pré-preenchido), Data, Hora
   - Integração com API POST `/api/agendamentos`
   - Validação de data/hora obrigatórios
   - Feedback de confirmação

5. **FeedbackScreen** 
   - Confirmação de agendamento realizado
   - Exibe informações do agendamento
   - Botão para voltar aos hemocentros ou ir para home

### 🔵 Fluxo do Gestor

1. **LoginGestorScreen** 
   - Formulário de login com email e senha
   - Integração com API POST `/api/gestores/login`
   - Credenciais padrão: `admin@hemocentro.com` / `admin123`
   - Validação de campos obrigatórios
   - Feedback: credenciais inválidas

2. **DashboardScreen** 
   - Painel de controle do gestor
   - Exibe tabela com agendamentos em tempo real
   - Colunas: Doador, CPF, Data/Hora, Hemocentro, Status
   - Integração com API GET `/api/agendamentos`
   - Botão para criar nova campanha

3. **CriarCampanhaScreen** 
   - Formulário para criar campanhas de urgência
   - Campos: Título, Data de Início, Data de Término, Tipo Sanguíneo Prioritário, Descrição
   - Integração com API POST `/api/campanhas`
   - Validação de campos obrigatórios
   - Feedback de confirmação

4. **RelatorioScreen** *(tela estruturada, sem funcionalidade no MVP)*
   - Estrutura preparada para futuras métricas
   - Layout responsivo

### ✨ Componentes Reutilizáveis (UI)

- **Componentes shadcn/ui:** Button, Input, Card, Label, Select, etc.
- **Icons:** Material-UI Icons
- **Styling:** TailwindCSS 4.1.12
- **Responsividade:** Mobile-first design

### 🔗 Integração Backend-Frontend

Todas as telas estão **100% integradas** com a API:
- ✅ Cadastro de doador (POST)
- ✅ Listagem de hemocentros (GET)
- ✅ Criação de agendamentos (POST)
- ✅ Listagem de agendamentos (GET)
- ✅ Login de gestor (POST)
- ✅ Criação de campanhas (POST)
- ✅ CORS habilitado para comunicação frontend ↔ backend
- ✅ Tratamento de erros em tempo real
- ✅ Validações de entrada

## 🗃️ Banco de Dados

### Tabelas

#### `doadores`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INTEGER | Primary key (autoincrement) |
| nome | TEXT | Nome completo |
| idade | INTEGER | Idade do doador |
| email | TEXT | Email (único) |
| created_at | TEXT | Timestamp de criação |

#### `hemocentros`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INTEGER | Primary key (autoincrement) |
| nome | TEXT | Nome do hemocentro |
| distancia | TEXT | Distância aproximada |

**Seed inicial - 6 hemocentros pré-cadastrados:**
1. Hemocentro Central São Paulo (1.2 km)
2. Hemocentro Regional Paulista (2.5 km)
3. Hospital das Clínicas - Banco de Sangue (3.0 km)
4. Hemocentro Santa Casa (4.1 km)
5. Hemocentro Vila Mariana (5.3 km)
6. Centro de Hemoterapia Albert Einstein (6.7 km)

#### `agendamentos`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INTEGER | Primary key (autoincrement) |
| hemocentro | TEXT | Nome do hemocentro |
| data | TEXT | Data do agendamento |
| horario | TEXT | Horário do agendamento |
| created_at | TEXT | Timestamp de criação |

#### `gestores`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INTEGER | Primary key (autoincrement) |
| nome | TEXT | Nome completo |
| email | TEXT | Email (único) |
| senha | TEXT | Senha (texto plano - MVP) |
| created_at | TEXT | Timestamp de criação |

**Seed inicial:** 1 gestor admin (`admin@hemocentro.com` / `admin123`)

#### `campanhas`
| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INTEGER | Primary key (autoincrement) |
| titulo | TEXT | Título da campanha |
| tipo_sanguineo | TEXT | Tipo sanguíneo em falta |
| descricao | TEXT | Descrição da urgência |
| created_at | TEXT | Timestamp de criação |

## 🚧 Build para Produção

### Frontend
```bash
npm run build
```

Arquivos gerados em: `dist/`

Para servir o build:
```bash
npx serve dist
```

## 📦 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia frontend em modo desenvolvimento |
| `npm run build` | Build de produção do frontend |
| `npm run backend:dev` | Inicia servidor backend |
| `npm run backend:test` | Executa testes do backend |

## 🔒 Segurança

- Validação de entrada em todos os endpoints
- Prepared statements no SQLite (proteção contra SQL injection)
- CORS configurado para desenvolvimento local
- Validação de idade mínima (16 anos) para doadores

## 🐛 Troubleshooting

### Erro: "Cannot connect to backend"
- Certifique-se de que o backend está rodando em `http://localhost:3001`
- Verifique se não há firewall bloqueando a porta 3001

### Erro: "ENOENT: no such file or directory"
- Execute `npm install` novamente
- Certifique-se de estar na pasta raiz do projeto

### Testes falhando
- Certifique-se de que nenhuma instância do backend está rodando durante os testes
- Os testes criam bancos temporários e limpam automaticamente

## � Arquivos de Documentação

Este projeto inclui documentação completa:

| Arquivo | Descrição |
|---------|-----------|
| [README.md](README.md) | Este arquivo - Guia completo do projeto |
| [ATTRIBUTIONS.md](ATTRIBUTIONS.md) | Atribuições e créditos de tecnologias/bibliotecas |
| [.env.example](.env.example) | Exemplo de variáveis de ambiente |

---

## ✅ Como Testar o Projeto

Para testar todas as funcionalidades no navegador:

1. **Inicie os servidores:**
   ```bash
   # Terminal 1: Frontend
   npm run dev
   
   # Terminal 2: Backend
   npm run backend:dev
   ```

2. **Acesse a aplicação:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001


3. **Execute os testes automatizados:**
   ```bash
   npm run backend:test
   ```
   Resultado esperado: **14/14 testes passando ✅**

---

## 🎥 Vídeos de Apresentação

- **Apresentação do Software:** https://youtu.be/pHkyO6gP_no
- **Apresentação do Projeto:** https://www.youtube.com/shorts/o_yUKztoxDw?feature=share

Os vídeos demonstram os fluxos principais solicitados na atividade:
- Fluxo do doador (cadastro, login e agendamento)
- Fluxo do gestor (login, dashboard, campanhas e relatório)

---

## 📄 Licença

Este projeto foi desenvolvido como parte do **Projeto Integrador** do curso de Desenvolvimento de Sistemas Orientado a Dispositivos Móveis e Baseado na Web do **SENAC EAD**.

---

**Desenvolvido por:** Atiel S. Brito, Kauê, Francisco Wellington, Ronald, Mayne, Caio, Raphaela  
**Data:** Março de 2026  
