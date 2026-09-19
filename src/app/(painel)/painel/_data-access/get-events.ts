import { requireOrganizer } from "@/lib/auth/require-organizer";

export type EventListItem = {
  id: number;
  title: string;
  eventDate: string;
  eventTime: string;
  location: string;
  slug: string;
};

export async function getEvents() {
  const { supabase } = await requireOrganizer();

  const { data, error } = await supabase
    .from("events")
    .select("id, title, event_date, event_time, location, slug")
    .order("event_date", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    return {
      events: [] as EventListItem[],
      error: "Não foi possível carregar os eventos.",
    };
  }

  return {
    events: (data ?? []).map((event) => ({
      id: event.id,
      title: event.title,
      eventDate: event.event_date,
      eventTime: event.event_time,
      location: event.location,
      slug: event.slug,
    })),
  };
}
