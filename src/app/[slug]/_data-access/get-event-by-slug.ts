import { resolveEventConfirmation } from "@/lib/confirmation-window";
import {
  eventIllustrationUrl,
  parsePageLayout,
  type EventPageLayout,
} from "@/lib/event-illustration";
import { parseStoredColor } from "@/lib/event-theme";
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
  backgroundColor1: string | null;
  backgroundColor2: string | null;
  titleColor: string | null;
  textColor: string | null;
  pageLayout: EventPageLayout;
  imageUrl: string | null;
};

export async function getPublicEvent(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("event_slugs")
    .select(
      "slug, events(id, title, details, event_date, event_time, location, slug, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed, background_color_1, background_color_2, title_color, text_color, illustration_content_type, page_layout, updated_at)"
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
    backgroundColor1: parseStoredColor(event.background_color_1),
    backgroundColor2: parseStoredColor(event.background_color_2),
    titleColor: parseStoredColor(event.title_color),
    textColor: parseStoredColor(event.text_color),
    pageLayout: parsePageLayout(event.page_layout),
    imageUrl: event.illustration_content_type
      ? eventIllustrationUrl(event.slug, event.updated_at)
      : null,
  } satisfies PublicEvent;
}
