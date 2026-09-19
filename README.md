# Confirm Event

Site para o organizador criar eventos e receber confirmação de presença: um link público por evento e um painel autenticado.

- [Visão do produto](docs/project-overview.md)
- [Arquitetura](docs/architecture.md)

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- shadcn/ui
- Supabase (Auth e Postgres)

## Configuração

1. Crie um projeto no [Supabase](https://supabase.com).
2. Aplique as migrations em `supabase/migrations/` (SQL Editor, na ordem dos arquivos, ou `supabase db push` se o CLI estiver ligado ao projeto).
3. Em Authentication:
   - crie o usuário organizador (e-mail e senha);
   - em **Users**, marque o e-mail como confirmado (ou desligue **Confirm email** em Providers → Email);
   - desligue o cadastro público.
4. Em Authentication → URL Configuration, permita o redirect `{origem-da-app}/auth/confirm` (necessário para recuperar senha).
5. Copie `.env.example` para `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

6. Instale e rode:

```bash
npm install
npm run dev
```

Outros scripts: `npm run build`, `npm start`, `npm run typecheck`.

## Rotas locais

- Início: [http://localhost:3000](http://localhost:3000) (vai para o painel ou o login)
- Login: [http://localhost:3000/login](http://localhost:3000/login)
- Recuperar senha: [http://localhost:3000/recuperar-senha](http://localhost:3000/recuperar-senha)
- Painel: [http://localhost:3000/painel](http://localhost:3000/painel)
- Página pública de um evento: `http://localhost:3000/{slug}`
