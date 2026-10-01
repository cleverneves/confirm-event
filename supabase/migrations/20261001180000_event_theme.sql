-- Cores opcionais do tema da página pública. null = visual padrão naquela posição.

alter table public.events
  add column if not exists background_color text,
  add column if not exists title_color text,
  add column if not exists button_color text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_background_color_hex'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_background_color_hex
      check (
        background_color is null
        or background_color ~ '^#[0-9A-Fa-f]{6}$'
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_title_color_hex'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_title_color_hex
      check (
        title_color is null
        or title_color ~ '^#[0-9A-Fa-f]{6}$'
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_button_color_hex'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_button_color_hex
      check (
        button_color is null
        or button_color ~ '^#[0-9A-Fa-f]{6}$'
      );
  end if;
end $$;
