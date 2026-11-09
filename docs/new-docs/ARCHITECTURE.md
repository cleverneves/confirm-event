# Arquitetura do Sistema — Inveeti

## 1. Introdução

Este documento descreve a arquitetura técnica do **Inveeti**, uma aplicação para gerenciamento de eventos e confirmação de presença de convidados.

O projeto utiliza uma arquitetura baseada em monorepo, com frontend e backend independentes, organizados em aplicações distintas.

O objetivo é manter uma estrutura simples, modular e de fácil manutenção, permitindo a evolução do sistema sem introduzir complexidade arquitetural desnecessária.

### 1.1 Objetivos arquiteturais

- Separar as responsabilidades de frontend, backend e infraestrutura.
- Organizar o backend por domínios de negócio.
- Manter baixo acoplamento entre os módulos.
- Definir contratos explícitos entre frontend e backend.
- Garantir qualidade por meio de testes e ferramentas automatizadas.
- Facilitar a evolução e manutenção do sistema.
- Permitir implantação independente das aplicações.

## 2. Stack Tecnológica

### 2.1 Frontend

| Tecnologia | Responsabilidade |
|---|---|
| Next.js | Framework da aplicação web |
| TypeScript | Tipagem estática |
| shadcn/ui | Componentes de interface |
| Tailwind CSS | Estilização |

### 2.2 Backend

| Tecnologia | Responsabilidade |
|---|---|
| Python | Linguagem de programação |
| FastAPI | Framework para construção da API REST |
| SQLAlchemy | ORM e persistência de dados |
| Pydantic | Validação e serialização de dados |
| Pytest | Testes automatizados |
| Ruff | Linting e formatação |
| Pyright | Verificação estática de tipos |
| Alembic | Gerenciamento de migrações do banco |

### 2.3 Banco de Dados

| Tecnologia | Responsabilidade |
|---|---|
| PostgreSQL | Banco de dados relacional |

### 2.4 Infraestrutura e Desenvolvimento

| Tecnologia | Responsabilidade |
|---|---|
| Docker | Containerização das aplicações |
| Docker Compose | Orquestração do ambiente local |
| Git | Controle de versão |
| Spec Kit | Desenvolvimento orientado a especificações (SDD) |

## 3. Estilo Arquitetural

O sistema adota uma arquitetura de **Monólito Modular**, com separação entre frontend e backend.

O repositório utiliza a abordagem de **Monorepo**, mantendo as aplicações e os recursos de infraestrutura em um único repositório.

### 3.1 Monorepo

O monorepo permite centralizar o código-fonte, a documentação e os recursos de infraestrutura, mantendo as aplicações organizadas em diretórios independentes.

A separação entre frontend e backend permite que cada aplicação tenha suas próprias dependências, ferramentas, testes e processo de execução.

### 3.2 Monólito Modular

O backend será desenvolvido como uma única aplicação FastAPI, organizada em módulos independentes por domínio de negócio.

Cada módulo será responsável por suas próprias regras, serviços e operações de persistência.

Essa abordagem permite manter a simplicidade operacional de um monólito, preservando a organização necessária para futuras evoluções.

**Não serão adotados microserviços neste momento.** A divisão em serviços independentes só deverá ser considerada quando houver uma necessidade técnica ou de negócio que justifique sua complexidade adicional.

## 4. Estrutura do Repositório

```text
event-rsvp/
│
├── .specify/
│   └── memory/
│       └── constitution.md
│
├── specs/
│   ├── 001-authentication/
│   ├── 002-event-management/
│   └── 003-guest-confirmation/
│
├── apps/
│   ├── web/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── ui/
│   │   │   │   └── shared/
│   │   │   ├── features/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   ├── types/
│   │   │   └── styles/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── api/
│       ├── src/
│       │   └── app/
│       │       ├── main.py
│       │       ├── core/
│       │       ├── modules/
│       │       └── shared/
│       │
│       ├── tests/
│       │   ├── unit/
│       │   ├── integration/
│       │   └── conftest.py
│       │
│       ├── alembic/
│       │   └── versions/
│       │
│       ├── pyproject.toml
│       ├── alembic.ini
│       └── Dockerfile
│
├── infra/
│   └── docker/
│       ├── docker-compose.yml
│       └── postgres/
│
├── docs/
│   ├── README.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DATA-MODEL.md
│   ├── TESTING.md
│   ├── DEVELOPMENT-SETUP.md
│   ├── SECURITY.md
│   └── ADR/
│
├── .gitignore
├── Makefile
└── README.md
```

A estrutura poderá evoluir conforme a necessidade do projeto, sem exigir a criação antecipada de diretórios ou abstrações que ainda não tenham utilidade.

## 5. Arquitetura do Backend

O backend será desenvolvido com FastAPI e organizado por módulos de domínio.

A estrutura separa responsabilidades de entrada HTTP, validação, regras de negócio e persistência.

### 5.1 Organização interna

```text
apps/api/src/app/
│
├── main.py
│
├── core/
│   ├── config.py
│   ├── database.py
│   ├── security.py
│   ├── exceptions.py
│   └── logging.py
│
├── modules/
│   ├── events/
│   │   ├── router.py
│   │   ├── schemas.py
│   │   ├── models.py
│   │   ├── repository.py
│   │   └── service.py
│   │
│   ├── guests/
│   │   ├── router.py
│   │   ├── schemas.py
│   │   ├── models.py
│   │   ├── repository.py
│   │   └── service.py
│   │
│   ├── confirmations/
│   │   ├── router.py
│   │   ├── schemas.py
│   │   ├── models.py
│   │   ├── repository.py
│   │   └── service.py
│   │
│   └── users/
│       ├── router.py
│       ├── schemas.py
│       ├── models.py
│       ├── repository.py
│       └── service.py
│
└── shared/
    └── ...
```

### 5.2 Responsabilidades das camadas

| Camada | Responsabilidade |
|---|---|
| Router | Receber requisições HTTP, validar parâmetros e encaminhar operações |
| Schemas | Definir contratos de entrada e saída utilizando Pydantic |
| Models | Representar as entidades persistidas utilizando SQLAlchemy |
| Repository | Concentrar consultas e operações de persistência |
| Service | Implementar regras de negócio e casos de uso |

### 5.3 Regras de organização

- Cada módulo deve representar um domínio ou contexto de negócio.
- Os routers não devem conter regras de negócio.
- Os services devem concentrar as regras e os casos de uso.
- Os repositories devem ser responsáveis pelo acesso aos dados.
- Os schemas Pydantic não devem ser utilizados como modelos de persistência.
- Os models SQLAlchemy não devem ser expostos diretamente nos contratos HTTP.
- Um módulo não deve acessar diretamente os detalhes internos de outro módulo sem uma necessidade justificada.
- Componentes compartilhados devem ficar em `shared/` ou `core/`, conforme sua responsabilidade.

A separação em arquivos representa uma organização de responsabilidades, não uma exigência para criar abstrações adicionais. Novas camadas devem ser introduzidas somente quando agregarem valor.

## 6. Arquitetura do Frontend

O frontend será desenvolvido com Next.js e TypeScript, utilizando organização baseada em funcionalidades (*Feature-Based Architecture*).

Essa abordagem mantém os componentes, hooks e regras relacionados a uma funcionalidade próximos uns dos outros.

### 6.1 Organização interna

```text
apps/web/src/
│
├── app/
│
├── components/
│   ├── ui/
│   └── shared/
│
├── features/
│   ├── events/
│   ├── guests/
│   └── confirmations/
│
├── hooks/
├── lib/
├── types/
└── styles/
```

### 6.2 Responsabilidades

| Diretório | Responsabilidade |
|---|---|
| app/ | Rotas, layouts e composição das páginas Next.js |
| components/ui/ | Componentes de interface fornecidos pelo shadcn/ui |
| components/shared/ | Componentes reutilizáveis entre funcionalidades |
| features/ | Componentes, hooks e lógica específicos de cada funcionalidade |
| hooks/ | Hooks compartilhados |
| lib/ | Configurações, clientes HTTP e utilitários |
| types/ | Tipos compartilhados da aplicação |
| styles/ | Estilos globais |

### 6.3 Regras de organização

- Componentes específicos de uma funcionalidade devem permanecer dentro de sua feature.
- Componentes reutilizáveis entre funcionalidades devem ficar em `components/shared/`.
- Componentes do shadcn/ui devem permanecer em `components/ui/`.
- A camada de interface não deve assumir responsabilidades de regras de negócio do backend.
- A comunicação com a API deve ser centralizada por meio de clientes ou funções de acesso a dados.

## 7. Comunicação entre Frontend e Backend

A comunicação entre as aplicações será realizada por meio de uma API REST disponibilizada pelo FastAPI.

O backend será a fonte oficial das regras de negócio e dos dados do sistema.

### 7.1 Fluxo de requisição

```text
Usuário
   |
   v
Frontend (Next.js)
   |
   v
Cliente HTTP
   |
   v
API REST (FastAPI)
   |
   v
Router
   |
   v
Service
   |
   v
Repository
   |
   v
PostgreSQL
```

O fluxo de resposta ocorre no sentido inverso, retornando ao frontend os dados definidos pelo contrato da API.

### 7.2 Contratos de API

Os contratos serão definidos por meio de schemas Pydantic e documentados automaticamente pelo OpenAPI do FastAPI.

Diretrizes:

- Utilizar JSON como formato padrão de comunicação.
- Versionar a API pelo caminho `/api/v1`.
- Definir schemas específicos para entrada e saída.
- Documentar parâmetros, respostas e códigos HTTP.
- Não expor diretamente entidades SQLAlchemy.
- Manter compatibilidade entre os contratos consumidos pelo frontend e os disponibilizados pelo backend.

O OpenAPI será a fonte oficial para os contratos HTTP.

Sempre que viável, os tipos TypeScript consumidos pelo frontend deverão ser gerados a partir do contrato OpenAPI, reduzindo duplicação e divergências entre aplicações.

### 7.3 Formato das respostas

As respostas de sucesso devem seguir um formato consistente.

Exemplo:

```json
{
  "data": {
    "id": "123",
    "name": "Evento de exemplo"
  }
}
```

As respostas de erro devem seguir o formato:

```json
{
  "error": {
    "code": "EVENT_NOT_FOUND",
    "message": "Evento não encontrado.",
    "details": null
  }
}
```

O envelope de resposta deverá ser aplicado de maneira consistente, inclusive nos handlers de exceções e validações.

## 8. Banco de Dados e Persistência

O PostgreSQL será utilizado como banco de dados relacional.

A comunicação com o banco será realizada pelo SQLAlchemy, utilizando sua API de ORM.

### 8.1 Diretrizes

- Utilizar SQLAlchemy para mapeamento das entidades e operações de persistência.
- Utilizar Alembic para controle de migrações.
- Manter as operações de banco de dados concentradas nos repositories.
- Evitar consultas SQL diretamente nos routers e services.
- Utilizar transações para operações que exijam consistência entre múltiplas alterações.
- Definir restrições e relacionamentos no banco de dados quando aplicável.
- Não realizar alterações estruturais diretamente no banco sem uma migração versionada.

### 8.2 Migrações

Todas as alterações estruturais do banco deverão ser versionadas utilizando Alembic.

As migrações devem ser revisadas antes de serem aplicadas em ambientes compartilhados ou de produção.

## 9. Tratamento de Erros

O tratamento de erros deverá ser centralizado e padronizado, garantindo respostas consistentes para o frontend.

### 9.1 Categorias de erros

| HTTP Status | Situação |
|---|---|
| 400 | Requisição inválida |
| 401 | Usuário não autenticado |
| 403 | Usuário sem permissão |
| 404 | Recurso não encontrado |
| 409 | Conflito de negócio |
| 422 | Erro de validação dos dados |
| 429 | Limite de requisições excedido |
| 500 | Erro interno inesperado |
| 503 | Serviço temporariamente indisponível |

Os códigos HTTP devem representar corretamente a natureza do erro.

### 9.2 Responsabilidades

- **Router:** tratar aspectos relacionados à comunicação HTTP.
- **Service:** identificar e sinalizar erros relacionados às regras de negócio.
- **Repository:** tratar falhas de persistência quando necessário, sem expor detalhes internos ao consumidor.
- **Handlers globais:** converter exceções em respostas HTTP padronizadas.

### 9.3 Exceções de domínio

Erros de negócio devem ser representados por exceções específicas, independentes do framework HTTP.

Exemplos:

- `EventNotFoundError`
- `GuestNotFoundError`
- `ConfirmationConflictError`

Os handlers globais serão responsáveis por converter essas exceções em respostas HTTP adequadas.

### 9.4 Logging

Os erros deverão ser registrados em logs estruturados, contendo informações suficientes para diagnóstico.

Quando disponível, utilizar um identificador de correlação (`request_id`) para rastrear uma requisição entre os componentes.

Logs não devem armazenar senhas, tokens, credenciais ou dados sensíveis desnecessários.

## 10. Estratégia de Testes

O backend utilizará Pytest como ferramenta principal de testes automatizados.

A estratégia deverá contemplar diferentes níveis de validação.

### 10.1 Testes unitários

Validam regras de negócio e comportamentos isolados, priorizando os services e componentes que não dependem de infraestrutura externa.

### 10.2 Testes de integração

Validam a interação entre componentes, incluindo:

- Integração entre routers e services.
- Operações dos repositories.
- Persistência e consultas no PostgreSQL.
- Validação dos contratos HTTP.
- Comportamento das transações.

### 10.3 Testes do frontend

O frontend deverá possuir testes para os componentes e comportamentos relevantes da aplicação, conforme a complexidade das funcionalidades.

### 10.4 Diretrizes

- Testar regras de negócio independentemente da camada HTTP sempre que possível.
- Utilizar banco de dados de teste isolado nos testes de integração.
- Não depender de dados reais ou ambientes de produção.
- Garantir que correções de bugs relevantes tenham testes de regressão.
- Executar os testes automatizados antes de integrar alterações.

## 11. Qualidade de Código

A qualidade do código será verificada por ferramentas automatizadas.

### 11.1 Backend

| Ferramenta | Finalidade |
|---|---|
| Ruff | Linting e formatação |
| Pyright | Verificação estática de tipos |
| Pytest | Testes automatizados |

### 11.2 Frontend

O frontend deverá utilizar TypeScript com verificação estrita de tipos e ferramentas de linting e formatação compatíveis com o ecossistema Next.js.

### 11.3 Diretrizes

- Manter tipagem explícita sempre que agregar clareza.
- Evitar o uso indiscriminado de `Any` no Python.
- Evitar o uso indiscriminado de `any` no TypeScript.
- Corrigir erros de linting e tipagem antes de integrar alterações.
- Manter código legível e com responsabilidades bem definidas.
- Evitar abstrações prematuras e duplicação desnecessária.

## 12. Segurança

A segurança deverá ser considerada em todas as camadas da aplicação.

Diretrizes gerais:

- Validar todas as entradas recebidas pela API.
- Aplicar autenticação e autorização nos recursos protegidos.
- Não confiar em dados enviados pelo frontend.
- Proteger credenciais e segredos por meio de variáveis de ambiente.
- Utilizar conexões seguras em ambientes de produção.
- Restringir origens permitidas por meio de configuração CORS.
- Evitar exposição de informações internas em mensagens de erro.
- Aplicar permissões de acesso de acordo com as regras de negócio.
- Evitar armazenar informações sensíveis em logs.

Os mecanismos específicos de autenticação, autorização e proteção de dados deverão ser detalhados nas respectivas especificações e documentação de segurança.

## 13. Infraestrutura e Execução

O ambiente de desenvolvimento utilizará Docker e Docker Compose.

Cada aplicação terá seu próprio Dockerfile, permitindo que frontend e backend sejam executados de maneira independente.

### 13.1 Serviços

O ambiente local deverá contemplar inicialmente:

| Serviço | Responsabilidade |
|---|---|
| web | Aplicação Next.js |
| api | API FastAPI |
| db | Banco de dados PostgreSQL |

### 13.2 Diretrizes

- Utilizar Docker Compose para inicialização do ambiente local.
- Manter dados do PostgreSQL em volume persistente.
- Utilizar variáveis de ambiente para configurações.
- Disponibilizar arquivos `.env.example` sem credenciais reais.
- Configurar health checks para serviços que dependem de disponibilidade.
- Manter configurações específicas de cada ambiente fora do código-fonte.
- Não armazenar dados persistentes importantes dentro dos containers.

### 13.3 Comunicação entre serviços

Os serviços deverão utilizar a rede interna do Docker Compose para comunicação entre containers.

O frontend deverá consumir a API por meio de uma URL configurável, adequada ao ambiente de execução.

## 14. Desenvolvimento Orientado a Especificações (SDD)

O desenvolvimento de novas funcionalidades utilizará o Spec Kit como apoio ao processo de Specification-Driven Development.

O objetivo é estabelecer requisitos e decisões antes da implementação, reduzindo ambiguidades e mantendo rastreabilidade entre especificação, planejamento, tarefas e código.

### 14.1 Fluxo de desenvolvimento

```text
Constitution
     |
     v
Specify
     |
     v
Plan
     |
     v
Tasks
     |
     v
Implementation
     |
     v
Verification
```

### 14.2 Organização dos artefatos

- `.specify/memory/constitution.md`: princípios e restrições permanentes do projeto.
- `specs/`: especificações e artefatos de planejamento por funcionalidade.
- `docs/`: documentação técnica geral do sistema.
- `docs/ADR/`: decisões arquiteturais relevantes.

### 14.3 Diretrizes

- Toda funcionalidade relevante deverá possuir requisitos claros antes da implementação.
- O planejamento técnico deverá respeitar a arquitetura definida neste documento.
- As tarefas deverão ser pequenas o suficiente para permitir implementação e verificação incremental.
- Mudanças arquiteturais relevantes deverão ser documentadas por meio de ADRs.
- A documentação deverá ser atualizada quando a implementação alterar decisões arquiteturais existentes.

A estrutura exata dos artefatos de especificação deverá acompanhar os templates e comandos utilizados pela versão do Spec Kit adotada no projeto.

## 15. Regras Arquiteturais

As seguintes regras deverão orientar a evolução do sistema:

1. O projeto deverá manter a organização em monorepo.
2. Frontend e backend deverão permanecer aplicações independentes.
3. O backend deverá seguir o estilo arquitetural de monólito modular.
4. Os módulos do backend deverão ser organizados por domínio de negócio.
5. As regras de negócio deverão permanecer nos services, não nos routers.
6. O acesso à persistência deverá ser concentrado nos repositories.
7. Os contratos HTTP deverão ser definidos com Pydantic e documentados via OpenAPI.
8. Os models SQLAlchemy não deverão ser expostos diretamente pela API.
9. O frontend deverá consumir os contratos disponibilizados pelo backend.
10. Alterações no banco de dados deverão ser versionadas com Alembic.
11. O código deverá ser validado por testes e ferramentas de qualidade.
12. A infraestrutura local deverá ser executável por Docker Compose.
13. Novas abstrações deverão ser introduzidas somente quando houver necessidade concreta.
14. Decisões arquiteturais relevantes deverão ser registradas em ADRs.
15. Requisitos e regras específicas de funcionalidades deverão ser documentados nas respectivas especificações.

## 16. Evolução da Arquitetura

A arquitetura deverá evoluir de maneira incremental, considerando as necessidades reais do sistema.

Novas tecnologias, bibliotecas, camadas ou serviços deverão ser introduzidos somente quando houver justificativa técnica.

A adoção de microserviços, mensageria, cache distribuído ou outros componentes de infraestrutura não faz parte da arquitetura inicial.

Essas possibilidades poderão ser avaliadas futuramente caso requisitos de escalabilidade, disponibilidade, desempenho ou organização das equipes justifiquem sua adoção.

Toda mudança arquitetural relevante deverá considerar:

- Problema que motivou a mudança.
- Alternativas avaliadas.
- Benefícios esperados.
- Custos e impactos operacionais.
- Consequências para a manutenção e evolução do sistema.

As decisões relevantes deverão ser registradas em documentos ADR.

---

**Este documento representa a arquitetura de referência do Inveeti.** Alterações na implementação deverão respeitar essas diretrizes ou ser acompanhadas de uma decisão arquitetural documentada.