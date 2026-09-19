-- Transição do MVP de festa única (people/party/RPC) para o produto multi-evento.
-- Idempotente: também funciona se a migration inicial já criou o schema novo.

drop function if exists public.confirm_presence(text, jsonb, jsonb);

drop table if exists public.people cascade;
drop table if exists public.confirmations cascade;
drop table if exists public.event_slugs cascade;
drop table if exists public.events cascade;

create table public.events (
  id bigint generated always as identity primary key,
  title text not null,
  details text,
  event_date date not null,
  event_time time not null,
  location text not null,
  slug text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_title_not_blank check (length(trim(title)) > 0),
  constraint events_location_not_blank check (length(trim(location)) > 0),
  constraint events_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table public.event_slugs (
  slug text primary key,
  event_id bigint not null references public.events (id) on delete cascade,
  constraint event_slugs_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create index event_slugs_event_id_idx on public.event_slugs (event_id);

create table public.confirmations (
  id bigint generated always as identity primary key,
  event_id bigint not null references public.events (id) on delete cascade,
  full_name text not null,
  created_at timestamptz not null default now(),
  constraint confirmations_name_not_blank check (length(trim(full_name)) > 0)
);

create index confirmations_event_id_idx on public.confirmations (event_id);

alter table public.events enable row level security;
alter table public.event_slugs enable row level security;
alter table public.confirmations enable row level security;

create policy events_select_public
  on public.events
  for select
  to anon, authenticated
  using (true);

create policy events_insert_authenticated
  on public.events
  for insert
  to authenticated
  with check (true);

create policy events_update_authenticated
  on public.events
  for update
  to authenticated
  using (true)
  with check (true);

create policy events_delete_authenticated
  on public.events
  for delete
  to authenticated
  using (true);

create policy event_slugs_select_public
  on public.event_slugs
  for select
  to anon, authenticated
  using (true);

create policy event_slugs_insert_authenticated
  on public.event_slugs
  for insert
  to authenticated
  with check (true);

create policy event_slugs_update_authenticated
  on public.event_slugs
  for update
  to authenticated
  using (true)
  with check (true);

create policy event_slugs_delete_authenticated
  on public.event_slugs
  for delete
  to authenticated
  using (true);

create policy confirmations_select_authenticated
  on public.confirmations
  for select
  to authenticated
  using (true);

create policy confirmations_insert_public
  on public.confirmations
  for insert
  to anon, authenticated
  with check (true);

create policy confirmations_update_authenticated
  on public.confirmations
  for update
  to authenticated
  using (true)
  with check (true);

create policy confirmations_delete_authenticated
  on public.confirmations
  for delete
  to authenticated
  using (true);

grant select on public.events to anon, authenticated;
grant insert, update, delete on public.events to authenticated;
grant usage, select on sequence public.events_id_seq to authenticated;

grant select on public.event_slugs to anon, authenticated;
grant insert, update, delete on public.event_slugs to authenticated;

grant select on public.confirmations to authenticated;
grant insert on public.confirmations to anon, authenticated;
grant update, delete on public.confirmations to authenticated;
grant usage, select on sequence public.confirmations_id_seq to anon, authenticated;
