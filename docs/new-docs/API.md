# API — Inveeti

## 1. Introdução

Este documento define as convenções e os padrões utilizados no desenvolvimento e consumo da API REST do Inveeti.

A API será desenvolvida com FastAPI e Python, utilizando Pydantic para validação e serialização dos dados.

O frontend Next.js será o principal consumidor da API.

### 1.1 Objetivos

- Padronizar a construção dos endpoints.
- Definir convenções para requisições e respostas HTTP.
- Estabelecer contratos consistentes entre frontend e backend.
- Padronizar validações e tratamento de erros.
- Facilitar a documentação e manutenção da API.
- Reduzir o acoplamento entre frontend e backend.

## 2. Tecnologias

| Tecnologia | Responsabilidade |
|---|---|
| FastAPI | Construção dos endpoints REST |
| Pydantic | Validação e serialização de dados |
| SQLAlchemy | Persistência de dados |
| OpenAPI | Especificação dos contratos HTTP |
| Pytest | Testes automatizados da API |

## 3. Convenções Gerais

### 3.1 Estilo arquitetural

A API seguirá o estilo REST, utilizando os recursos HTTP de acordo com suas respectivas semânticas.

### 3.2 Versionamento

Todas as rotas deverão utilizar versionamento explícito.

Prefixo padrão:

`/api/v1`

Exemplos:

```http
GET    /api/v1/events
GET    /api/v1/events/{event_id}
POST   /api/v1/events
PATCH  /api/v1/events/{event_id}
DELETE /api/v1/events/{event_id}
```

Uma nova versão deverá ser criada quando houver alterações incompatíveis que não possam ser introduzidas mantendo o contrato existente.

### 3.3 Convenção de nomenclatura

As rotas deverão:

- Utilizar nomes de recursos no plural.
- Utilizar letras minúsculas.
- Separar palavras por hífen quando necessário.
- Representar recursos, não operações internas.
- Utilizar identificadores para acessar recursos específicos.

Exemplos:

```http
/api/v1/events
/api/v1/guests
/api/v1/confirmations
```

Evitar:

```http
/api/v1/getEvents
/api/v1/createEvent
/api/v1/delete-event
```

### 3.4 Formato dos dados

O formato padrão de comunicação será JSON.

As propriedades dos objetos JSON deverão utilizar `snake_case` na API.

Exemplo:

```json
{
  "event_id": "123",
  "guest_name": "João Silva",
  "confirmation_status": "confirmed"
}
```

O frontend deverá respeitar esse contrato ou utilizar uma camada de transformação quando necessário.

### 3.5 Identificadores

Os identificadores dos recursos deverão ser tratados como valores opacos pelo consumidor da API.

O frontend não deverá assumir regras internas sobre a geração ou estrutura dos identificadores.

O formato definitivo dos identificadores deverá ser definido no modelo de dados.

## 4. Métodos HTTP

Os métodos HTTP deverão respeitar as seguintes convenções:

| Método | Finalidade | Comportamento esperado |
|---|---|---|
| GET | Consultar recursos | Não altera o estado do sistema |
| POST | Criar recursos ou executar operações não idempotentes | Pode alterar o estado do sistema |
| PUT | Substituir integralmente um recurso | Idempotente |
| PATCH | Atualizar parcialmente um recurso | Atualiza somente os campos informados |
| DELETE | Remover um recurso | Idempotente quanto ao estado final |

### 4.1 GET

Utilizado para consultar recursos ou coleções.

Exemplo:

```http
GET /api/v1/events
```

### 4.2 POST

Utilizado para criar novos recursos ou executar operações que não sejam representadas adequadamente por uma atualização convencional.

Exemplo:

```http
POST /api/v1/events
```

### 4.3 PUT

Utilizado para substituir integralmente a representação de um recurso.

### 4.4 PATCH

Utilizado para atualizar parcialmente um recurso.

Exemplo:

```http
PATCH /api/v1/events/{event_id}
```

### 4.5 DELETE

Utilizado para remover um recurso.

Exemplo:

```http
DELETE /api/v1/events/{event_id}
```

## 5. Estrutura das Requisições

### 5.1 Path Parameters

Utilizados para identificar recursos específicos.

Exemplo:

```http
GET /api/v1/events/{event_id}
```

### 5.2 Query Parameters

Utilizados para filtros, paginação e ordenação.

Exemplo:

```http
GET /api/v1/events?page=1&page_size=20
```

### 5.3 Request Body

Os dados enviados no corpo da requisição deverão ser validados por schemas Pydantic específicos.

Exemplo:

```http
POST /api/v1/events
Content-Type: application/json
```

```json
{
  "name": "Confraternização",
  "description": "Evento de encerramento do ano",
  "event_date": "2026-12-20T19:00:00Z"
}
```

Os campos obrigatórios, opcionais, limites e formatos deverão ser definidos no schema correspondente à funcionalidade.

### 5.4 Headers

Os headers deverão ser utilizados de acordo com a finalidade da requisição.

| Header | Finalidade |
|---|---|
| Content-Type | Informar o formato do corpo enviado |
| Accept | Informar os formatos de resposta aceitos |
| Authorization | Enviar credenciais de autenticação, quando aplicável |
| X-Request-ID | Identificador de correlação da requisição, quando utilizado pelo cliente |

O mecanismo de autenticação e os requisitos de autorização deverão seguir a especificação de segurança do projeto.

## 6. Estrutura das Respostas

As respostas deverão manter um formato consistente entre os endpoints.

### 6.1 Respostas de sucesso

As respostas de sucesso deverão utilizar o envelope `data`.

Exemplo:

```json
{
  "data": {
    "id": "123",
    "name": "Confraternização",
    "description": "Evento de encerramento do ano"
  }
}
```

### 6.2 Respostas de coleções

As respostas que retornam coleções deverão utilizar `data` como uma lista.

Exemplo:

```json
{
  "data": [
    {
      "id": "123",
      "name": "Confraternização"
    },
    {
      "id": "456",
      "name": "Aniversário"
    }
  ]
}
```

### 6.3 Respostas sem conteúdo

Operações que não precisam retornar dados deverão utilizar `204 No Content`, sem corpo na resposta.

Exemplo:

```http
HTTP/1.1 204 No Content
```

### 6.4 Status HTTP de sucesso

| Status | Utilização |
|---|---|
| 200 OK | Operação concluída com sucesso |
| 201 Created | Recurso criado com sucesso |
| 202 Accepted | Requisição aceita para processamento assíncrono |
| 204 No Content | Operação concluída sem conteúdo de resposta |

Quando um recurso for criado, utilizar `201 Created`. Sempre que aplicável, incluir o header `Location` com a URI do recurso criado.

## 7. Paginação, Filtros e Ordenação

Endpoints que retornam grandes coleções deverão suportar paginação.

### 7.1 Paginação

O padrão inicial será baseado em página e tamanho da página.

Parâmetros:

| Parâmetro | Descrição | Padrão |
|---|---|---|
| page | Número da página | 1 |
| page_size | Quantidade de registros por página | 20 |

Exemplo:

```http
GET /api/v1/events?page=1&page_size=20
```

A resposta paginada deverá utilizar a seguinte estrutura:

```json
{
  "data": [
    {
      "id": "123",
      "name": "Confraternização"
    }
  ],
  "meta": {
    "page": 1,
    "page_size": 20,
    "total_items": 45,
    "total_pages": 3
  }
}
```

Os valores de `page` e `page_size` deverão ser validados. O tamanho máximo de página deverá ser limitado pela API.

### 7.2 Filtros

Filtros deverão ser enviados por query parameters.

Exemplo:

```http
GET /api/v1/events?status=active
```

Os filtros disponíveis deverão ser definidos de acordo com cada recurso.

### 7.3 Ordenação

Quando aplicável, os endpoints poderão disponibilizar ordenação por meio do parâmetro `sort_by`.

Exemplo:

```http
GET /api/v1/events?sort_by=created_at
```

Para definir a direção da ordenação, utilizar `sort_order` com os valores `asc` ou `desc`.

Exemplo:

```http
GET /api/v1/events?sort_by=created_at&sort_order=desc
```

Os campos permitidos para ordenação deverão ser explicitamente definidos pelo endpoint.

## 8. Tratamento de Erros

Todas as respostas de erro deverão utilizar um formato padronizado.

### 8.1 Formato padrão

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "O recurso solicitado não foi encontrado.",
    "details": null
  }
}
```

Campos:

| Campo | Descrição |
|---|---|
| code | Código estável que identifica o erro |
| message | Mensagem descritiva do erro |
| details | Informações adicionais, quando aplicável |

O campo `details` poderá ser `null` quando não houver informações adicionais.

### 8.2 Códigos HTTP

| Status | Código de exemplo | Descrição |
|---|---|---|
| 400 | INVALID_REQUEST | Requisição inválida |
| 401 | UNAUTHORIZED | Usuário não autenticado |
| 403 | FORBIDDEN | Usuário sem permissão |
| 404 | RESOURCE_NOT_FOUND | Recurso não encontrado |
| 409 | RESOURCE_CONFLICT | Conflito com o estado atual do recurso |
| 422 | VALIDATION_ERROR | Dados enviados não passaram na validação |
| 429 | RATE_LIMIT_EXCEEDED | Limite de requisições excedido |
| 500 | INTERNAL_SERVER_ERROR | Erro interno inesperado |
| 503 | SERVICE_UNAVAILABLE | Serviço temporariamente indisponível |

Os códigos de erro deverão ser estáveis e independentes das mensagens apresentadas ao usuário.

### 8.3 Erros de validação

Erros de validação deverão utilizar o status `422 Unprocessable Entity`.

Exemplo:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Os dados enviados são inválidos.",
    "details": [
      {
        "field": "name",
        "message": "O campo é obrigatório."
      }
    ]
  }
}
```

Os detalhes deverão permitir que o frontend identifique os campos que precisam de correção.

### 8.4 Diretrizes

- Não retornar stack traces ou detalhes internos da aplicação.
- Não expor informações sensíveis.
- Utilizar códigos de erro consistentes.
- Centralizar a conversão de exceções em respostas HTTP.
- Registrar erros inesperados nos logs.
- Incluir identificadores de correlação quando disponíveis.

## 9. Validação de Dados

A validação dos dados recebidos pela API será realizada utilizando Pydantic.

### 9.1 Diretrizes

- Criar schemas específicos para entrada e saída.
- Validar tipos, formatos, limites e campos obrigatórios.
- Rejeitar dados inválidos antes de executar as regras de negócio.
- Evitar reutilizar o mesmo schema para operações com necessidades diferentes.
- Não utilizar modelos SQLAlchemy como schemas de entrada ou saída.

### 9.2 Organização dos schemas

Os schemas deverão permanecer dentro dos respectivos módulos de domínio.

Exemplo:

```text
modules/
└── events/
    ├── router.py
    ├── schemas.py
    ├── models.py
    ├── repository.py
    └── service.py
```

Quando a quantidade de schemas justificar, o arquivo poderá ser dividido em estruturas menores, como `schemas/request.py` e `schemas/response.py`.

## 10. Autenticação e Autorização

Os endpoints deverão declarar explicitamente seus requisitos de autenticação e autorização.

### 10.1 Autenticação

As credenciais deverão ser transmitidas por meio do header `Authorization`, conforme o mecanismo de autenticação adotado.

Exemplo de formato Bearer:

```http
Authorization: Bearer <access_token>
```

### 10.2 Autorização

A API deverá validar se o usuário autenticado possui permissão para executar a operação solicitada.

A autorização deverá ser aplicada no backend, independentemente das restrições implementadas na interface.

### 10.3 Endpoints públicos

Endpoints que não exigem autenticação deverão ser explicitamente identificados.

As regras específicas de autenticação, expiração de tokens, renovação de credenciais e permissões deverão ser definidas na especificação de autenticação e na documentação de segurança.

## 11. Contratos e Documentação OpenAPI

O FastAPI será responsável pela geração automática da especificação OpenAPI.

A documentação interativa será disponibilizada por meio dos recursos nativos do framework, conforme configuração do ambiente.

Caminhos padrão:

```text
/docs
/redoc
/openapi.json
```

Em produção, a exposição desses recursos deverá seguir a política de segurança e publicação da aplicação.

### 11.1 Fonte oficial dos contratos

Os schemas Pydantic e as definições dos endpoints serão a fonte de geração do contrato OpenAPI.

O frontend deverá consumir os contratos por meio de tipos gerados, sempre que viável.

### 11.2 Compatibilidade

Alterações nos contratos deverão seguir estas diretrizes:

- Evitar remover campos utilizados pelo frontend sem planejamento.
- Evitar alterar o tipo de campos existentes sem avaliar compatibilidade.
- Adicionar campos opcionais preferencialmente quando não houver quebra de contrato.
- Documentar alterações incompatíveis.
- Atualizar os tipos gerados após mudanças no contrato.
- Validar a integração entre frontend e backend.

## 12. Boas Práticas

As seguintes práticas deverão ser observadas durante o desenvolvimento:

1. Utilizar nomes claros e consistentes para endpoints e parâmetros.
2. Respeitar a semântica dos métodos HTTP.
3. Utilizar os códigos HTTP adequados para cada operação.
4. Manter os contratos de entrada e saída explícitos.
5. Não expor entidades de persistência diretamente.
6. Validar todos os dados recebidos.
7. Padronizar respostas de sucesso e erro.
8. Evitar retornar informações desnecessárias.
9. Implementar paginação em coleções potencialmente grandes.
10. Documentar comportamentos não óbvios no OpenAPI.
11. Escrever testes para os principais cenários de sucesso e falha.
12. Manter a compatibilidade dos contratos entre frontend e backend.

## 13. Referências

- `docs/ARCHITECTURE.md` — Arquitetura geral do sistema.
- `docs/SECURITY.md` — Diretrizes de segurança.
- `docs/TESTING.md` — Estratégia de testes.
- `docs/DATA-MODEL.md` — Modelo de dados.
- `specs/` — Especificações das funcionalidades.

Documentação oficial:

- FastAPI: https://fastapi.tiangolo.com/
- Pydantic: https://docs.pydantic.dev/
- OpenAPI: https://spec.openapis.org/oas/latest.html
