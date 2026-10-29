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
  venueName: string | null;
  address: string;
  slug: string;
  /** Capacidade máxima de convidados; nulo significa sem limite. */
  maxGuestCapacity: number | null;
  confirmationOpen: boolean;
  pageLayout: EventPageLayout;
  imageUrl: string | null;
  /** Total de confirmações do evento; nulo quando não pôde ser obtido. */
  confirmedCount: number | null;
};

type OrganizerSupabase = Awaited<ReturnType<typeof requireOrganizer>>["supabase"];

/** Mesmo total da página do evento (uma linha por pessoa confirmada). */
async function countConfirmations(
  supabase: OrganizerSupabase,
  eventId: number
): Promise<number | null> {
  try {
    const { count, error } = await supabase
      .from("confirmations")
      .select("id", { count: "exact", head: true })
      .eq("event_id", eventId);

    if (error || count === null) {
      return null;
    }

    return count;
  } catch {
    return null;
  }
}

export async function getEvents() {
  const { user, supabase } = await requireOrganizer();

  const { data: memberships, error: membershipsError } = await supabase
    .from("event_organizers")
    .select("event_id")
    .eq("user_id", user.id);

  if (membershipsError) {
    return {
      events: [] as EventListItem[],
      error: "Não foi possível carregar os eventos.",
    };
  }

  // Eventos criados pela conta, eventos em que foi incluída e eventos legados sem criador.
  const accessFilters = [`created_by.eq.${user.id}`, "created_by.is.null"];
  const includedIds = (memberships ?? []).map((membership) => membership.event_id);

  if (includedIds.length > 0) {
    accessFilters.push(`id.in.(${includedIds.join(",")})`);
  }

  const { data, error } = await supabase
    .from("events")
    .select(
      "id, title, event_date, event_time, venue_name, address, slug, max_guest_capacity, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed, illustration_content_type, page_layout, updated_at"
    )
    .or(accessFilters.join(","))
    .order("event_date", { ascending: true })
    .order("title", { ascending: true });

  if (error) {
    return {
      events: [] as EventListItem[],
      error: "Não foi possível carregar os eventos.",
    };
  }

  const rows = data ?? [];
  const confirmedCounts = await Promise.all(
    rows.map((event) => countConfirmations(supabase, event.id))
  );

  return {
    events: rows.map((event, index) => {
      const { confirmation } = resolveEventConfirmation({
        eventDate: event.event_date,
        confirmationStartsOn: event.confirmation_starts_on,
        confirmationEndsOn: event.confirmation_ends_on,
        confirmationManuallyClosed: event.confirmation_manually_closed,
      });

      return {
        id: event.id,
        confirmedCount: confirmedCounts[index],
        title: event.title,
        eventDate: event.event_date,
        eventTime: event.event_time,
        venueName: event.venue_name,
        address: event.address,
        slug: event.slug,
        maxGuestCapacity: event.max_guest_capacity,
        confirmationOpen: confirmation.status === "open",
        pageLayout: parsePageLayout(event.page_layout),
        imageUrl: event.illustration_content_type
          ? eventIllustrationUrl(event.slug, event.updated_at)
          : null,
      };
    }),
  };
}
