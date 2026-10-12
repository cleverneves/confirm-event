-- Capacidade máxima opcional de convidados por evento.
-- null = sem limite (eventos existentes permanecem sem limite).

alter table public.events
  add column if not exists max_guest_capacity integer;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_max_guest_capacity_positive'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_max_guest_capacity_positive
      check (max_guest_capacity is null or max_guest_capacity >= 1);
  end if;
end $$;
