-- Criador e organizadores incluídos por evento.
-- Restringe o painel (events/event_slugs/confirmations) a quem organiza o evento.
-- A leitura pública de events/event_slugs e o INSERT público de confirmations permanecem.

-- 1. Criador do evento -------------------------------------------------------

alter table public.events
  add column if not exists created_by uuid references auth.users (id);

create index if not exists events_created_by_idx on public.events (created_by);

-- Eventos existentes ficam com a conta cleverton.nvs@gmail.com. Se ela não existir,
-- os eventos sem criador continuam acessíveis a toda conta autenticada (comportamento atual)
-- e a coluna permanece anulável até que o backfill seja feito.
do $$
declare
  v_owner uuid;
begin
  select user_account.id
  into v_owner
  from auth.users as user_account
  where lower(user_account.email) = 'cleverton.nvs@gmail.com'
  limit 1;

  if v_owner is null then
    if exists (select 1 from public.events where created_by is null) then
      raise warning 'Conta criadora cleverton.nvs@gmail.com não encontrada: eventos existentes seguem sem criador e sem restrição de acesso.';
    end if;
  else
    update public.events
    set created_by = v_owner
    where created_by is null;
  end if;

  if not exists (select 1 from public.events where created_by is null) then
    alter table public.events alter column created_by set not null;
  end if;
end $$;

alter table public.events alter column created_by set default auth.uid();

-- O criador não muda depois de definido (eventos legados sem criador podem receber um).
create or replace function public.enforce_event_created_by_immutable()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if old.created_by is not null and new.created_by is distinct from old.created_by then
    raise exception 'event_created_by_immutable' using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke all on function public.enforce_event_created_by_immutable() from public;

drop trigger if exists events_created_by_immutable on public.events;

create trigger events_created_by_immutable
  before update on public.events
  for each row
  execute function public.enforce_event_created_by_immutable();

-- 2. Organizadores incluídos -------------------------------------------------

create table if not exists public.event_organizers (
  event_id bigint not null references public.events (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (event_id, user_id)
);

create index if not exists event_organizers_user_id_idx on public.event_organizers (user_id);

-- O criador nunca entra como organizador incluído.
create or replace function public.enforce_organizer_not_creator()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if exists (
    select 1
    from public.events as event
    where event.id = new.event_id
      and event.created_by = new.user_id
  ) then
    raise exception 'event_creator_is_not_an_included_organizer' using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke all on function public.enforce_organizer_not_creator() from public;

drop trigger if exists event_organizers_not_creator on public.event_organizers;

create trigger event_organizers_not_creator
  before insert on public.event_organizers
  for each row
  execute function public.enforce_organizer_not_creator();

alter table public.event_organizers enable row level security;

drop policy if exists event_organizers_select_own on public.event_organizers;

create policy event_organizers_select_own
  on public.event_organizers
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

-- Inclusão e saída passam apenas pelas funções abaixo.
revoke all on public.event_organizers from anon, authenticated;
grant select on public.event_organizers to authenticated;

-- 3. Quem organiza o evento --------------------------------------------------

-- Criador, organizador incluído ou (legado) qualquer conta autenticada em evento sem criador.
-- security definer: lê events/event_organizers sem depender do RLS dessas tabelas.
create or replace function public.can_manage_event(p_event_id bigint)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select auth.uid()) is not null
    and (
      exists (
        select 1
        from public.events as event
        where event.id = p_event_id
          and (event.created_by is null or event.created_by = (select auth.uid()))
      )
      or exists (
        select 1
        from public.event_organizers as organizer
        where organizer.event_id = p_event_id
          and organizer.user_id = (select auth.uid())
      )
    );
$$;

revoke all on function public.can_manage_event(bigint) from public, anon;
grant execute on function public.can_manage_event(bigint) to authenticated;

-- 4. Políticas ---------------------------------------------------------------

drop policy if exists events_insert_authenticated on public.events;
drop policy if exists events_update_authenticated on public.events;
drop policy if exists events_delete_authenticated on public.events;

create policy events_insert_authenticated
  on public.events
  for insert
  to authenticated
  with check (created_by = (select auth.uid()));

create policy events_update_authenticated
  on public.events
  for update
  to authenticated
  using (public.can_manage_event(id))
  with check (public.can_manage_event(id));

-- Só o criador exclui (ou qualquer conta, enquanto o evento legado não tem criador).
create policy events_delete_authenticated
  on public.events
  for delete
  to authenticated
  using (created_by is null or created_by = (select auth.uid()));

drop policy if exists event_slugs_insert_authenticated on public.event_slugs;
drop policy if exists event_slugs_update_authenticated on public.event_slugs;
drop policy if exists event_slugs_delete_authenticated on public.event_slugs;

create policy event_slugs_insert_authenticated
  on public.event_slugs
  for insert
  to authenticated
  with check (public.can_manage_event(event_id));

create policy event_slugs_update_authenticated
  on public.event_slugs
  for update
  to authenticated
  using (public.can_manage_event(event_id))
  with check (public.can_manage_event(event_id));

create policy event_slugs_delete_authenticated
  on public.event_slugs
  for delete
  to authenticated
  using (public.can_manage_event(event_id));

drop policy if exists confirmations_select_authenticated on public.confirmations;
drop policy if exists confirmations_update_authenticated on public.confirmations;
drop policy if exists confirmations_delete_authenticated on public.confirmations;

create policy confirmations_select_authenticated
  on public.confirmations
  for select
  to authenticated
  using (public.can_manage_event(event_id));

create policy confirmations_update_authenticated
  on public.confirmations
  for update
  to authenticated
  using (public.can_manage_event(event_id))
  with check (public.can_manage_event(event_id));

create policy confirmations_delete_authenticated
  on public.confirmations
  for delete
  to authenticated
  using (public.can_manage_event(event_id));

-- 5. Funções de organizadores ------------------------------------------------

-- Inclui a conta com o e-mail informado. Retorna:
-- forbidden | invalid_email | not_registered | already_organizer | added
create or replace function public.add_event_organizer(p_event_id bigint, p_email text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_creator uuid;
  v_email text;
  v_target uuid;
begin
  if v_uid is null then
    return 'forbidden';
  end if;

  select event.created_by
  into v_creator
  from public.events as event
  where event.id = p_event_id;

  if not found or v_creator is distinct from v_uid then
    return 'forbidden';
  end if;

  v_email := lower(trim(coalesce(p_email, '')));

  if length(v_email) = 0
    or length(v_email) > 254
    or v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
  then
    return 'invalid_email';
  end if;

  select user_account.id
  into v_target
  from auth.users as user_account
  where lower(user_account.email) = v_email
    and user_account.deleted_at is null
  limit 1;

  if v_target is null then
    return 'not_registered';
  end if;

  if v_target = v_creator then
    return 'already_organizer';
  end if;

  insert into public.event_organizers (event_id, user_id)
  values (p_event_id, v_target)
  on conflict do nothing;

  if not found then
    return 'already_organizer';
  end if;

  return 'added';
end;
$$;

-- Remove um organizador incluído. Só o criador. Retorna: forbidden | removed
create or replace function public.remove_event_organizer(p_event_id bigint, p_user_id uuid)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_creator uuid;
begin
  if v_uid is null then
    return 'forbidden';
  end if;

  select event.created_by
  into v_creator
  from public.events as event
  where event.id = p_event_id;

  if not found or v_creator is distinct from v_uid or p_user_id = v_creator then
    return 'forbidden';
  end if;

  delete from public.event_organizers
  where event_id = p_event_id
    and user_id = p_user_id;

  return 'removed';
end;
$$;

-- O organizador incluído sai do evento. O criador não sai. Retorna: forbidden | left
create or replace function public.leave_event(p_event_id bigint)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_uid uuid := (select auth.uid());
  v_creator uuid;
begin
  if v_uid is null then
    return 'forbidden';
  end if;

  select event.created_by
  into v_creator
  from public.events as event
  where event.id = p_event_id;

  if not found or v_creator = v_uid then
    return 'forbidden';
  end if;

  delete from public.event_organizers
  where event_id = p_event_id
    and user_id = v_uid;

  return 'left';
end;
$$;

-- Criador e organizadores incluídos, só para quem organiza o evento. Sem telefone nem empresa.
create or replace function public.list_event_organizers(p_event_id bigint)
returns table (
  member_user_id uuid,
  member_email text,
  first_name text,
  last_name text,
  is_creator boolean
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    member.user_id,
    user_account.email::text,
    profile.first_name,
    profile.last_name,
    member.is_creator
  from (
    select event.created_by as user_id, true as is_creator, event.created_at as since
    from public.events as event
    where event.id = p_event_id
      and event.created_by is not null
      and public.can_manage_event(p_event_id)
    union all
    select organizer.user_id, false, organizer.created_at
    from public.event_organizers as organizer
    where organizer.event_id = p_event_id
      and public.can_manage_event(p_event_id)
  ) as member
  join auth.users as user_account on user_account.id = member.user_id
  left join public.organizer_profiles as profile on profile.user_id = member.user_id
  order by member.is_creator desc, member.since asc;
$$;

-- Criador de cada evento que a conta organiza. Sem telefone nem empresa.
create or replace function public.event_creator_labels(p_event_ids bigint[])
returns table (
  label_event_id bigint,
  creator_email text,
  first_name text,
  last_name text
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    event.id,
    user_account.email::text,
    profile.first_name,
    profile.last_name
  from public.events as event
  join auth.users as user_account on user_account.id = event.created_by
  left join public.organizer_profiles as profile on profile.user_id = event.created_by
  where event.id = any (p_event_ids)
    and public.can_manage_event(event.id);
$$;

revoke all on function public.add_event_organizer(bigint, text) from public, anon;
revoke all on function public.remove_event_organizer(bigint, uuid) from public, anon;
revoke all on function public.leave_event(bigint) from public, anon;
revoke all on function public.list_event_organizers(bigint) from public, anon;
revoke all on function public.event_creator_labels(bigint[]) from public, anon;

grant execute on function public.add_event_organizer(bigint, text) to authenticated;
grant execute on function public.remove_event_organizer(bigint, uuid) to authenticated;
grant execute on function public.leave_event(bigint) to authenticated;
grant execute on function public.list_event_organizers(bigint) to authenticated;
grant execute on function public.event_creator_labels(bigint[]) to authenticated;
