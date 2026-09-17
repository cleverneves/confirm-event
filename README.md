# Mariana e Victor — confirmação de presença

Site para confirmar presença na festa de aniversário compartilhada da Mariana e do Victor: um link público, duas listas, um painel para quem organiza.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS
- shadcn/ui
- Supabase (Auth e Postgres)

## Configuração

1. Crie um projeto no [Supabase](https://supabase.com).
2. Rode a migration em `supabase/migrations/20260917120000_init_confirmation.sql` no SQL Editor (ou `supabase db push` se o CLI estiver ligado ao projeto).
3. Em Authentication:
   - crie o único usuário organizador (e-mail e senha);
   - em **Users**, marque o e-mail como confirmado (ou desligue **Confirm email** em Providers → Email);
   - desligue o cadastro público.
4. Copie `.env.example` para `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

5. Instale e rode:

```bash
npm install
npm run dev
```

- Página pública: [http://localhost:3000](http://localhost:3000)
- Painel: [http://localhost:3000/painel](http://localhost:3000/painel)
- Login: [http://localhost:3000/login](http://localhost:3000/login)
