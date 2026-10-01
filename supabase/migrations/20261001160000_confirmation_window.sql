-- Janela opcional de confirmação e corte no INSERT público.

alter table public.events
  add column if not exists confirmation_starts_on date,
  add column if not exists confirmation_ends_on date,
  add column if not exists confirmation_manually_closed boolean not null default false;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_confirmation_window_valid'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_confirmation_window_valid
      check (
        (
          confirmation_starts_on is null
          and confirmation_ends_on is null
        )
        or (
          confirmation_starts_on is not null
          and confirmation_ends_on is not null
          and confirmation_starts_on < confirmation_ends_on
          and confirmation_starts_on < event_date
          and confirmation_ends_on < event_date
        )
      );
  end if;
end $$;

create or replace function public.confirmation_accepts_name(p_event_id bigint)
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select exists (
    select 1
    from public.events as event
    where event.id = p_event_id
      and event.confirmation_manually_closed = false
      and case
        when event.confirmation_starts_on is null then
          (now() at time zone 'America/Sao_Paulo')::date < event.event_date
        else
          (now() at time zone 'America/Sao_Paulo')::date >= event.confirmation_starts_on
          and (now() at time zone 'America/Sao_Paulo')::date < event.confirmation_ends_on
      end
  );
$$;

revoke all on function public.confirmation_accepts_name(bigint) from public;
grant execute on function public.confirmation_accepts_name(bigint) to anon, authenticated;

drop policy if exists confirmations_insert_public on public.confirmations;

create policy confirmations_insert_public
  on public.confirmations
  for insert
  to anon, authenticated
  with check (public.confirmation_accepts_name(event_id));
