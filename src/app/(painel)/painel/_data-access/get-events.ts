import { resolveEventConfirmation } from "@/lib/confirmation-window";
import { requireOrganizer } from "@/lib/auth/require-organizer";
import { organizerDisplayName } from "@/lib/organizer-display";
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
  /** Capacidade máxima de convidados; nulo significa sem limite. */
  maxGuestCapacity: number | null;
  confirmationOpen: boolean;
  pageLayout: EventPageLayout;
  imageUrl: string | null;
  /** Total de confirmações do evento; nulo quando não pôde ser obtido. */
  confirmedCount: number | null;
  /** Nome do criador (ou e-mail, sem nome gravado); nulo só em evento legado sem criador. */
  creatorName: string | null;
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

/** Nome do criador por evento. Eventos sem rótulo (legado sem criador) ficam de fora. */
async function loadCreatorNames(
  supabase: OrganizerSupabase,
  eventIds: number[]
): Promise<Map<number, string>> {
  const names = new Map<number, string>();

  if (eventIds.length === 0) {
    return names;
  }

  try {
    const { data, error } = await supabase.rpc("event_creator_labels", {
      p_event_ids: eventIds,
    });

    if (error) {
      return names;
    }

    for (const label of data ?? []) {
      names.set(
        label.label_event_id,
        organizerDisplayName({
          firstName: label.first_name,
          lastName: label.last_name,
          email: label.creator_email,
        })
      );
    }
  } catch {
    // Sem rótulo, o card não mostra a linha "criado por:".
  }

  return names;
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
      "id, title, event_date, event_time, location, slug, max_guest_capacity, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed, illustration_content_type, page_layout, updated_at"
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
  const [confirmedCounts, creatorNames] = await Promise.all([
    Promise.all(rows.map((event) => countConfirmations(supabase, event.id))),
    loadCreatorNames(
      supabase,
      rows.map((event) => event.id)
    ),
  ]);

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
        creatorName: creatorNames.get(event.id) ?? null,
        title: event.title,
        eventDate: event.event_date,
        eventTime: event.event_time,
        location: event.location,
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
