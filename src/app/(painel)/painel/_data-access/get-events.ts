import { resolveEventConfirmation } from "@/lib/confirmation-window";
import { requireOrganizer } from "@/lib/auth/require-organizer";
import {
  eventIllustrationUrl,
  parsePageLayout,
  type EventPageLayout,
} from "@/lib/event-illustration";

export type EventListItem = {
  id: number;
  title: string;
  eventDate: string;
  eventTime: string;
  location: string;
  slug: string;
  confirmationOpen: boolean;
  pageLayout: EventPageLayout;
  imageUrl: string | null;
};

export async function getEvents() {
  const { supabase } = await requireOrganizer();

  const { data, error } = await supabase
    .from("events")
    .select(
      "id, title, event_date, event_time, location, slug, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed, illustration_content_type, page_layout, updated_at"
    )
    .order("event_date", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    return {
      events: [] as EventListItem[],
      error: "Não foi possível carregar os eventos.",
    };
  }

  return {
    events: (data ?? []).map((event) => {
      const { confirmation } = resolveEventConfirmation({
        eventDate: event.event_date,
        confirmationStartsOn: event.confirmation_starts_on,
        confirmationEndsOn: event.confirmation_ends_on,
        confirmationManuallyClosed: event.confirmation_manually_closed,
      });

      return {
        id: event.id,
        title: event.title,
        eventDate: event.event_date,
        eventTime: event.event_time,
        location: event.location,
        slug: event.slug,
        confirmationOpen: confirmation.status === "open",
        pageLayout: parsePageLayout(event.page_layout),
        imageUrl: event.illustration_content_type
          ? eventIllustrationUrl(event.slug, event.updated_at)
          : null,
      };
    }),
  };
}
