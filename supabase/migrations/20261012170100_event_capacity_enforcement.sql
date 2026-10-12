-- Capacidade máxima: total público de confirmados e recusa atômica da confirmação que passa do teto.

-- Total de confirmações de um evento, sem expor nomes.
-- security definer: o convidado (anon) não lê public.confirmations por RLS e precisa só do número.
create or replace function public.event_confirmed_count(p_event_id bigint)
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select count(*)::integer
  from public.confirmations as confirmation
  where confirmation.event_id = p_event_id;
$$;

revoke all on function public.event_confirmed_count(bigint) from public;
grant execute on function public.event_confirmed_count(bigint) to anon, authenticated;

-- Recusa o INSERT que faria o total passar de max_guest_capacity.
-- A linha do evento é travada antes da contagem: dois envios para a última vaga são serializados
-- e só o primeiro grava. O lock dura apenas a transação do INSERT.
-- O privilégio EXECUTE de uma função de trigger só é checado na criação do trigger,
-- por isso anon e authenticated não recebem grant.
create or replace function public.enforce_event_capacity()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_capacity integer;
  v_total integer;
begin
  select event.max_guest_capacity
  into v_capacity
  from public.events as event
  where event.id = new.event_id
  for update;

  if v_capacity is null then
    return new;
  end if;

  select count(*)::integer
  into v_total
  from public.confirmations as confirmation
  where confirmation.event_id = new.event_id;

  if v_total >= v_capacity then
    raise exception 'event_capacity_reached' using errcode = 'P0001';
  end if;

  return new;
end;
$$;

revoke all on function public.enforce_event_capacity() from public;

drop trigger if exists confirmations_enforce_capacity on public.confirmations;

create trigger confirmations_enforce_capacity
  before insert on public.confirmations
  for each row
  execute function public.enforce_event_capacity();
