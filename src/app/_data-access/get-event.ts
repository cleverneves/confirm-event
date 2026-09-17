import { createClient } from "@/lib/supabase/server";

export type EventDetails = {
  eventDate: string | null;
  eventTime: string | null;
  location: string | null;
};

export function isEventPublished(event: EventDetails) {
  return Boolean(event.eventDate && event.eventTime && event.location);
}

export function formatEventDate(eventDate: string) {
  const [year, month, day] = eventDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatEventTime(eventTime: string) {
  return eventTime.slice(0, 5);
}

export async function getEvent(): Promise<EventDetails | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("event_date, event_time, location")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      return null;
    }

    return {
      eventDate: data?.event_date ?? null,
      eventTime: data?.event_time ?? null,
      location: data?.location ?? null,
    };
  } catch {
    return null;
  }
}
