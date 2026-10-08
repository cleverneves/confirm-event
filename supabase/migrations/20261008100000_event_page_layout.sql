-- Layout da página pública do evento: Personalizado ou Somente imagem.

alter table public.events
  add column if not exists page_layout text not null default 'personalized';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_page_layout_allowed'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_page_layout_allowed
      check (page_layout in ('personalized', 'image_only'));
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'events_page_layout_image_required'
      and conrelid = 'public.events'::regclass
  ) then
    alter table public.events
      add constraint events_page_layout_image_required
      check (
        page_layout <> 'image_only'
        or illustration is not null
      );
  end if;
end $$;
