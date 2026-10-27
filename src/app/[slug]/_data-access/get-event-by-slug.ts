import { resolveEventConfirmation } from "@/lib/confirmation-window";
import {
  eventIllustrationUrl,
  parsePageLayout,
  type EventPageLayout,
} from "@/lib/event-illustration";
import {
  parseBackgroundMode,
  parseBlurLevel,
  parseStoredColor,
  type BackgroundMode,
} from "@/lib/event-theme";
import { createClient } from "@/lib/supabase/server";

export type PublicEvent = {
  id: number;
  title: string;
  details: string | null;
  eventDate: string;
  eventTime: string;
  venueName: string | null;
  address: string;
  currentSlug: string;
  acceptsConfirmation: boolean;
  /** Confirmação aberta e total de confirmados na capacidade ou acima dela. */
  isSoldOut: boolean;
  backgroundColor1: string | null;
  backgroundColor2: string | null;
  titleColor: string | null;
  textColor: string | null;
  backgroundMode: BackgroundMode;
  blurLevel: number | null;
  pageLayout: EventPageLayout;
  imageUrl: string | null;
};

type PublicSupabase = Awaited<ReturnType<typeof createClient>>;

/**
 * Indica se o total de confirmados já alcançou a capacidade.
 * Sem capacidade, ou se o total não puder ser obtido, o evento não é tratado como lotado:
 * o envio consulta a vaga de novo no servidor.
 */
async function isAtCapacity(
  supabase: PublicSupabase,
  eventId: number,
  maxGuestCapacity: number | null
) {
  if (maxGuestCapacity === null) {
    return false;
  }

  const { data: total, error } = await supabase.rpc("event_confirmed_count", {
    p_event_id: eventId,
  });

  if (error || total === null) {
    return false;
  }

  return total >= maxGuestCapacity;
}

export async function getPublicEvent(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("event_slugs")
    .select(
      "slug, events(id, title, details, event_date, event_time, venue_name, address, slug, max_guest_capacity, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed, background_color_1, background_color_2, title_color, text_color, background_mode, blur_level, illustration_content_type, page_layout, updated_at)"
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

  const acceptsConfirmation = confirmation.status === "open";
  const isSoldOut =
    acceptsConfirmation &&
    (await isAtCapacity(supabase, event.id, event.max_guest_capacity));

  return {
    id: event.id,
    title: event.title,
    details: event.details,
    eventDate: event.event_date,
    eventTime: event.event_time,
    venueName: event.venue_name,
    address: event.address,
    currentSlug: event.slug,
    acceptsConfirmation,
    isSoldOut,
    backgroundColor1: parseStoredColor(event.background_color_1),
    backgroundColor2: parseStoredColor(event.background_color_2),
    titleColor: parseStoredColor(event.title_color),
    textColor: parseStoredColor(event.text_color),
    backgroundMode: parseBackgroundMode(event.background_mode),
    blurLevel: parseBlurLevel(event.blur_level),
    pageLayout: parsePageLayout(event.page_layout),
    imageUrl: event.illustration_content_type
      ? eventIllustrationUrl(event.slug, event.updated_at)
      : null,
  } satisfies PublicEvent;
}
