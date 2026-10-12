-- Fundo da página pública no layout Somente imagem: gradiente (padrão) ou foto desfocada.
-- Eventos existentes e novos permanecem no gradiente. blur_level null = nível ainda não escolhido (a tela abre em 70).

alter table public.events
  add column if not exists background_mode text not null default 'gradient',
  add column if not exists blur_level smallint;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_background_mode_allowed'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_background_mode_allowed
      check (background_mode in ('gradient', 'blur'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_blur_level_range'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_blur_level_range
      check (blur_level is null or blur_level between 0 and 100);
  end if;
end $$;
