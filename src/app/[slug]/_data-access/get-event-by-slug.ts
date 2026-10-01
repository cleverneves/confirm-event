import { resolveEventConfirmation } from "@/lib/confirmation-window";
import { createClient } from "@/lib/supabase/server";

export type PublicEvent = {
  id: number;
  title: string;
  details: string | null;
  eventDate: string;
  eventTime: string;
  location: string;
  currentSlug: string;
  acceptsConfirmation: boolean;
};

export async function getPublicEvent(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("event_slugs")
    .select(
      "slug, events(id, title, details, event_date, event_time, location, slug, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed)"
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data?.events) {
    return null;
  }

  const event = Array.isArray(data.events) ? data.events[0] : data.events;

  if (!event) {
    return null;
  }

  const { confirmation } = resolveEventConfirmation({
    eventDate: event.event_date,
    confirmationStartsOn: event.confirmation_starts_on,
    confirmationEndsOn: event.confirmation_ends_on,
    confirmationManuallyClosed: event.confirmation_manually_closed,
  });

  return {
    id: event.id,
    title: event.title,
    details: event.details,
    eventDate: event.event_date,
    eventTime: event.event_time,
    location: event.location,
    currentSlug: event.slug,
    acceptsConfirmation: confirmation.status === "open",
  } satisfies PublicEvent;
}
