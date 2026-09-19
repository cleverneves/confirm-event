import { requireOrganizer } from "@/lib/auth/require-organizer";

export type PainelEvent = {
  id: number;
  title: string;
  details: string | null;
  eventDate: string;
  eventTime: string;
  location: string;
  slug: string;
};

export function parseEventId(value: string) {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const id = Number(value);

  if (!Number.isSafeInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

export async function getPainelEvent(eventId: number) {
  const { supabase } = await requireOrganizer();

  const { data, error } = await supabase
    .from("events")
    .select("id, title, details, event_date, event_time, location, slug")
    .eq("id", eventId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    details: data.details,
    eventDate: data.event_date,
    eventTime: data.event_time,
    location: data.location,
    slug: data.slug,
  } satisfies PainelEvent;
}
