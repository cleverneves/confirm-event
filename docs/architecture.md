# Arquitetura

Last updated: 2026-09-19

Comportamento do produto: [Visão do produto](project-overview.md).

## Stack

| Camada | Tecnologia |
| --- | --- |
| App | Next.js 16.3 (App Router) + React 19 + TypeScript |
| UI | Tailwind CSS 4, shadcn/ui (preset `base-nova`), Lucide, Sonner |
| Formulários | React Hook Form + Zod 4 |
| Dados e auth | Supabase (Postgres + Auth), `@supabase/ssr` e `@supabase/supabase-js` |

`next.config.ts` liga o React Compiler. Fontes: Sora e Newsreader (`src/app/layout.tsx`). Idioma: `pt-BR`.

## Estrutura

```
src/app/                 # rotas
src/components/ui/       # shadcn
src/lib/                 # auth, supabase, slug, schemas
src/proxy.ts             # sessão (Next.js 16; não há middleware.ts)
supabase/migrations/     # schema Postgres
```

Rotas de página seguem `page.tsx` (Server Component) + `_components/` + `_actions/` (`"use server"`) + `_data-access/` quando há busca. Referência de organização: `.cursor/rules/page-rules.mdc`.

## Rotas

| Caminho | Papel |
| --- | --- |
| `/` | Redireciona para `/painel` ou `/login` |
| `/login` | Entrada do organizador |
| `/recuperar-senha` | Pedido de redefinição |
| `/auth/confirm` | Troca o código/OTP do e-mail por sessão |
| `/redefinir-senha` | Define a senha nova |
| `/painel` | Lista de eventos |
| `/painel/eventos/novo` | Criação |
| `/painel/eventos/[id]` | Dados, link, presenças, exclusão |
| `/{slug}` | Página pública de confirmação |

Slugs reservados (não podem ser trecho de evento): `login`, `painel`, `recuperar-senha`, `redefinir-senha`, `auth` (`src/lib/slug.ts`).

## Sessão e autorização

`src/proxy.ts` chama `updateSession` (`src/lib/supabase/proxy.ts`):

- Sem usuário em `/painel` → `/login`.
- Com usuário em `/login` ou `/recuperar-senha` → `/painel`.
- Renova cookies da sessão em todas as rotas do matcher.

O layout do painel e as actions administrativas chamam `requireOrganizer()` (`src/lib/auth/require-organizer.ts`): sem usuário, `redirect("/login")`. Logout: `signOut` e redirect para `/login`.

Não há cadastro na aplicação. Qualquer papel `authenticated` no Postgres pode ler e alterar **todos** os eventos e confirmações (não há coluna de dono). A “conta única” é operacional: um usuário criado no Supabase e cadastro público desligado.

Login com senha: falha genérica (“Não foi possível entrar.”), exceto e-mail não confirmado. Recuperação: `resetPasswordForEmail` com `redirectTo` `{origem}/auth/confirm?next=/redefinir-senha`; mensagem genérica de sucesso. Senha nova: mínimo 6 caracteres.

## Camadas de dados

O cliente Supabase no servidor usa a **anon key** e cookies (`src/lib/supabase/server.ts`). Não há service role na aplicação. RLS no Postgres é a barreira.

Variáveis: `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` (fallback: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`). Ver `.env.example`.

## Schema

Migrations em `supabase/migrations/`. A mais recente (`20260919153000_rebuild_multi_event.sql`) recria o schema atual.

**`events`:** `id`, `title`, `details` (nullable), `event_date`, `event_time`, `location`, `slug` (atual), timestamps. Título e local não podem ser só espaços. Slug: `^[a-z0-9]+(?:-[a-z0-9]+)*$`.

**`event_slugs`:** histórico de trechos (`slug` PK → `event_id`). Exclusão do evento faz cascade. A página pública resolve o slug aqui; se `events.slug` for outro, redireciona.

**`confirmations`:** `id`, `event_id`, `full_name`, `created_at`. Sem unicidade de nome. Cascade na exclusão do evento.

### RLS (resumo)

- `events` / `event_slugs`: `SELECT` para `anon` e `authenticated`; insert/update/delete só `authenticated`.
- `confirmations`: `INSERT` para `anon` e `authenticated`; `SELECT`/`UPDATE`/`DELETE` só `authenticated`.

Convidado não lista nomes. Organizador autenticado lista, edita e remove.

## Regras implementadas no app

- Criação: `createEventSchema` recusa data anterior a hoje (`src/lib/event-date.ts`, fuso `America/Sao_Paulo`).
- Edição: recusa data nova no passado; manter a data já vencida é permitido.
- Slug na criação: `nextAvailableSlug` a partir do título (`evento`, `evento-2`, …).
- Alterar slug: recusa trecho usado por **outro** evento; reusar trecho do mesmo evento volta a ser o atual; o histórico antigo permanece para redirect.
- Confirmação pública: valida o slug, grava `full_name`, revalida a página do evento e o painel daquele id.

## Dependências externas

Só **Supabase**: Auth (e-mail/senha e recovery) e Postgres. O convite sai do sistema (o organizador copia o link). Não há e-mail próprio da aplicação além do fluxo de Auth.
