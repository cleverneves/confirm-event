-- Nome do espaço (opcional) e endereço (obrigatório). O texto em location vira address.

alter table public.events
  rename column location to address;

alter table public.events
  rename constraint events_location_not_blank to events_address_not_blank;

alter table public.events
  add column if not exists venue_name text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_venue_name_not_blank'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_venue_name_not_blank
      check (venue_name is null or length(trim(venue_name)) > 0);
  end if;
end $$;
