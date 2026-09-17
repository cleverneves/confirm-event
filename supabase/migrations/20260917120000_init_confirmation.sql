-- Confirmação de presença: evento único, envios e pessoas.
-- Identidade da pessoa: lower(trim(nome) || ' ' || trim(sobrenome)).

create table public.events (
  id integer primary key check (id = 1),
  event_date date,
  event_time time,
  location text,
  updated_at timestamptz not null default now(),
  constraint events_all_or_none check (
    (
      event_date is null
      and event_time is null
      and location is null
    )
    or (
      event_date is not null
      and event_time is not null
      and location is not null
      and length(trim(location)) > 0
    )
  )
);

insert into public.events (id) values (1);

create table public.confirmations (
  id bigint generated always as identity primary key,
  party text not null check (party in ('mariana', 'victor')),
  created_at timestamptz not null default now()
);

create table public.people (
  id bigint generated always as identity primary key,
  confirmation_id bigint not null references public.confirmations (id),
  first_name text not null,
  last_name text not null,
  party text not null check (party in ('mariana', 'victor')),
  role text not null check (role in ('titular', 'acompanhante')),
  name_key text generated always as (
    lower(trim(first_name) || ' ' || trim(last_name))
  ) stored,
  created_at timestamptz not null default now(),
  constraint people_names_not_blank check (
    length(trim(first_name)) > 0
    and length(trim(last_name)) > 0
  )
);

create unique index people_name_key_uidx on public.people (name_key);
create index people_party_idx on public.people (party);
create index people_confirmation_id_idx on public.people (confirmation_id);

alter table public.events enable row level security;
alter table public.confirmations enable row level security;
alter table public.people enable row level security;

create policy events_select_public
  on public.events
  for select
  to anon, authenticated
  using (true);

create policy events_update_authenticated
  on public.events
  for update
  to authenticated
  using (true)
  with check (true);

create policy confirmations_select_authenticated
  on public.confirmations
  for select
  to authenticated
  using (true);

create policy people_select_authenticated
  on public.people
  for select
  to authenticated
  using (true);

grant select on public.events to anon, authenticated;
grant update on public.events to authenticated;
grant select on public.confirmations to authenticated;
grant select on public.people to authenticated;

create or replace function public.confirm_presence(
  p_party text,
  p_titular jsonb,
  p_companions jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_entries jsonb := '[]'::jsonb;
  v_person jsonb;
  v_first text;
  v_last text;
  v_role text;
  v_name_key text;
  v_keys text[] := '{}';
  v_existing_party text;
  v_confirmation_id bigint;
  v_display_name text;
begin
  if p_party is null or p_party not in ('mariana', 'victor') then
    return jsonb_build_object('ok', false, 'code', 'invalid');
  end if;

  if p_titular is null or jsonb_typeof(p_titular) <> 'object' then
    return jsonb_build_object('ok', false, 'code', 'invalid');
  end if;

  if p_companions is null then
    p_companions := '[]'::jsonb;
  end if;

  if jsonb_typeof(p_companions) <> 'array' then
    return jsonb_build_object('ok', false, 'code', 'invalid');
  end if;

  v_entries := jsonb_build_array(
    jsonb_build_object(
      'first_name', btrim(coalesce(p_titular->>'first_name', '')),
      'last_name', btrim(coalesce(p_titular->>'last_name', '')),
      'role', 'titular'
    )
  );

  for v_person in
    select value
    from jsonb_array_elements(p_companions)
  loop
    v_entries := v_entries || jsonb_build_array(
      jsonb_build_object(
        'first_name', btrim(coalesce(v_person->>'first_name', '')),
        'last_name', btrim(coalesce(v_person->>'last_name', '')),
        'role', 'acompanhante'
      )
    );
  end loop;

  for v_person in
    select value
    from jsonb_array_elements(v_entries)
  loop
    v_first := v_person->>'first_name';
    v_last := v_person->>'last_name';

    if v_first is null or v_first = '' or v_last is null or v_last = '' then
      return jsonb_build_object('ok', false, 'code', 'invalid');
    end if;

    v_name_key := lower(v_first || ' ' || v_last);

    if v_name_key = any (v_keys) then
      return jsonb_build_object(
        'ok', false,
        'code', 'duplicate_in_payload',
        'name', v_first || ' ' || v_last,
        'is_companion', (v_person->>'role') = 'acompanhante'
      );
    end if;

    v_keys := array_append(v_keys, v_name_key);

    select p.party
    into v_existing_party
    from public.people as p
    where p.name_key = v_name_key;

    if found then
      return jsonb_build_object(
        'ok', false,
        'code', case
          when v_existing_party = p_party then 'same_party'
          else 'other_party'
        end,
        'name', v_first || ' ' || v_last,
        'is_companion', (v_person->>'role') = 'acompanhante'
      );
    end if;
  end loop;

  begin
    insert into public.confirmations (party)
    values (p_party)
    returning id into v_confirmation_id;

    for v_person in
      select value
      from jsonb_array_elements(v_entries)
    loop
      v_first := v_person->>'first_name';
      v_last := v_person->>'last_name';
      v_role := v_person->>'role';

      insert into public.people (
        confirmation_id,
        first_name,
        last_name,
        party,
        role
      )
      values (
        v_confirmation_id,
        v_first,
        v_last,
        p_party,
        v_role
      );
    end loop;
  exception
    when unique_violation then
      for v_person in
        select value
        from jsonb_array_elements(v_entries)
      loop
        v_first := v_person->>'first_name';
        v_last := v_person->>'last_name';
        v_name_key := lower(v_first || ' ' || v_last);
        v_display_name := v_first || ' ' || v_last;

        select p.party
        into v_existing_party
        from public.people as p
        where p.name_key = v_name_key;

        if found then
          return jsonb_build_object(
            'ok', false,
            'code', case
              when v_existing_party = p_party then 'same_party'
              else 'other_party'
            end,
            'name', v_display_name,
            'is_companion', (v_person->>'role') = 'acompanhante'
          );
        end if;
      end loop;

      return jsonb_build_object('ok', false, 'code', 'invalid');
  end;

  return jsonb_build_object('ok', true);
end;
$$;

revoke all on function public.confirm_presence(text, jsonb, jsonb) from public;
grant execute on function public.confirm_presence(text, jsonb, jsonb) to anon, authenticated;
