-- Imagem ilustrativa opcional do evento (jpg ou png, até 8 MB).

alter table public.events
  add column if not exists illustration bytea,
  add column if not exists illustration_content_type text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_illustration_pair'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_illustration_pair
      check (
        (illustration is null and illustration_content_type is null)
        or (illustration is not null and illustration_content_type is not null)
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_illustration_content_type'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_illustration_content_type
      check (
        illustration_content_type is null
        or illustration_content_type in ('image/jpeg', 'image/png')
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_illustration_size'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_illustration_size
      check (
        illustration is null
        or octet_length(illustration) <= 8388608
      );
  end if;
end $$;
