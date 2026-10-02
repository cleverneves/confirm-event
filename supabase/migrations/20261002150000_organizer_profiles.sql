-- Perfil do organizador: nome e sobrenome obrigatórios; telefone e empresa opcionais.
-- Uma linha por conta. Ausência de linha é o estado inicial, não um erro.

create table public.organizer_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  phone text,
  company text,
  updated_at timestamptz not null default now(),
  constraint organizer_profiles_first_name_len
    check (char_length(trim(first_name)) between 1 and 80),
  constraint organizer_profiles_last_name_len
    check (char_length(trim(last_name)) between 1 and 80),
  constraint organizer_profiles_phone_format
    check (
      phone is null
      or phone ~ '^[0-9]{10}$'
      or phone ~ '^[0-9]{2}9[0-9]{8}$'
    ),
  constraint organizer_profiles_company_len
    check (
      company is null
      or char_length(trim(company)) between 1 and 120
    )
);

alter table public.organizer_profiles enable row level security;

create policy organizer_profiles_select_own
  on public.organizer_profiles
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy organizer_profiles_insert_own
  on public.organizer_profiles
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy organizer_profiles_update_own
  on public.organizer_profiles
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

grant select, insert, update on public.organizer_profiles to authenticated;
