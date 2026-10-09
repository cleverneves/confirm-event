-- Tema em gradiente: cor 1 (topo), cor 2 (base), título e texto. null = padrão.
-- O fundo de uma cor só e a cor de botão deixam de existir; o botão segue a cor 1.

alter table public.events
  drop constraint if exists events_background_color_hex,
  drop constraint if exists events_button_color_hex;

alter table public.events
  drop column if exists background_color,
  drop column if exists button_color;

alter table public.events
  add column if not exists background_color_1 text,
  add column if not exists background_color_2 text,
  add column if not exists text_color text;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_background_color_1_hex'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_background_color_1_hex
      check (
        background_color_1 is null
        or background_color_1 ~ '^#[0-9A-Fa-f]{6}$'
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_background_color_2_hex'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_background_color_2_hex
      check (
        background_color_2 is null
        or background_color_2 ~ '^#[0-9A-Fa-f]{6}$'
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_text_color_hex'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_text_color_hex
      check (
        text_color is null
        or text_color ~ '^#[0-9A-Fa-f]{6}$'
      );
  end if;
end $$;
