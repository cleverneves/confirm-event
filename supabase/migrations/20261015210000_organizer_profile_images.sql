-- Imagem opcional de perfil do organizador (jpg ou png, até 2 MB).
-- Separada de organizer_profiles para permitir foto sem nome/sobrenome gravados.

create table public.organizer_profile_images (
  user_id uuid primary key references auth.users (id) on delete cascade,
  image bytea not null,
  content_type text not null,
  updated_at timestamptz not null default now(),
  constraint organizer_profile_images_content_type
    check (content_type in ('image/jpeg', 'image/png')),
  constraint organizer_profile_images_size
    check (octet_length(image) <= 2097152)
);

alter table public.organizer_profile_images enable row level security;

create policy organizer_profile_images_select_own
  on public.organizer_profile_images
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy organizer_profile_images_insert_own
  on public.organizer_profile_images
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy organizer_profile_images_update_own
  on public.organizer_profile_images
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy organizer_profile_images_delete_own
  on public.organizer_profile_images
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.organizer_profile_images to authenticated;

-- Quem pode ver a imagem de outra conta: dono ou colega de evento.
create or replace function public.can_view_organizer_profile_image(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    (select auth.uid()) is not null
    and (
      (select auth.uid()) = p_user_id
      or exists (
        select 1
        from public.events as event
        where public.can_manage_event(event.id)
          and (
            event.created_by = p_user_id
            or exists (
              select 1
              from public.event_organizers as organizer
              where organizer.event_id = event.id
                and organizer.user_id = p_user_id
            )
          )
      )
    );
$$;

revoke all on function public.can_view_organizer_profile_image(uuid) from public, anon;
grant execute on function public.can_view_organizer_profile_image(uuid) to authenticated;

create or replace function public.organizer_profile_image(p_user_id uuid)
returns table (
  image bytea,
  content_type text
)
language sql
stable
security definer
set search_path = ''
as $$
  select profile_image.image, profile_image.content_type
  from public.organizer_profile_images as profile_image
  where profile_image.user_id = p_user_id
    and public.can_view_organizer_profile_image(p_user_id);
$$;

revoke all on function public.organizer_profile_image(uuid) from public, anon;
grant execute on function public.organizer_profile_image(uuid) to authenticated;

drop function if exists public.list_event_organizers(bigint);

create function public.list_event_organizers(p_event_id bigint)
returns table (
  member_user_id uuid,
  member_email text,
  first_name text,
  last_name text,
  is_creator boolean,
  profile_image_updated_at timestamptz
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
    member.is_creator,
    profile_image.updated_at
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
  left join public.organizer_profile_images as profile_image
    on profile_image.user_id = member.user_id
  order by member.is_creator desc, member.since asc;
$$;

revoke all on function public.list_event_organizers(bigint) from public, anon;
grant execute on function public.list_event_organizers(bigint) to authenticated;
