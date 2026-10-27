import {
  resolveEventConfirmation,
  type ConfirmationResolution,
} from "@/lib/confirmation-window";
import { requireEventAccess, type EventRole } from "@/lib/auth/event-access";
import {
  parsePageLayout,
  type EventPageLayout,
} from "@/lib/event-illustration";
import {
  parseBackgroundMode,
  parseBlurLevel,
  parseStoredColor,
  type BackgroundMode,
} from "@/lib/event-theme";

export type PainelEvent = {
  id: number;
  /** Papel da conta logada neste evento. */
  viewerRole: EventRole;
  title: string;
  details: string | null;
  eventDate: string;
  eventTime: string;
  venueName: string | null;
  address: string;
  slug: string;
  /** Capacidade máxima de convidados; nulo significa sem limite. */
  maxGuestCapacity: number | null;
  confirmationStartsOn: string | null;
  confirmationEndsOn: string | null;
  confirmationManuallyClosed: boolean;
  confirmation: ConfirmationResolution;
  confirmationMessage: string;
  backgroundColor1: string | null;
  backgroundColor2: string | null;
  titleColor: string | null;
  textColor: string | null;
  backgroundMode: BackgroundMode;
  blurLevel: number | null;
  pageLayout: EventPageLayout;
  hasIllustration: boolean;
  updatedAt: string;
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
  const { supabase, role } = await requireEventAccess(eventId);

  if (!role) {
    return null;
  }

  const { data, error } = await supabase
    .from("events")
    .select(
      "id, title, details, event_date, event_time, venue_name, address, slug, max_guest_capacity, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed, background_color_1, background_color_2, title_color, text_color, background_mode, blur_level, illustration_content_type, page_layout, updated_at"
    )
    .eq("id", eventId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  const resolved = resolveEventConfirmation({
    eventDate: data.event_date,
    confirmationStartsOn: data.confirmation_starts_on,
    confirmationEndsOn: data.confirmation_ends_on,
    confirmationManuallyClosed: data.confirmation_manually_closed,
  });

  return {
    id: data.id,
    viewerRole: role,
    title: data.title,
    details: data.details,
    eventDate: data.event_date,
    eventTime: data.event_time,
    venueName: data.venue_name,
    address: data.address,
    slug: data.slug,
    maxGuestCapacity: data.max_guest_capacity,
    confirmationStartsOn: data.confirmation_starts_on,
    confirmationEndsOn: data.confirmation_ends_on,
    confirmationManuallyClosed: data.confirmation_manually_closed,
    confirmation: resolved.confirmation,
    confirmationMessage: resolved.confirmationMessage,
    backgroundColor1: parseStoredColor(data.background_color_1),
    backgroundColor2: parseStoredColor(data.background_color_2),
    titleColor: parseStoredColor(data.title_color),
    textColor: parseStoredColor(data.text_color),
    backgroundMode: parseBackgroundMode(data.background_mode),
    blurLevel: parseBlurLevel(data.blur_level),
    pageLayout: parsePageLayout(data.page_layout),
    hasIllustration: Boolean(data.illustration_content_type),
    updatedAt: data.updated_at,
  } satisfies PainelEvent;
}
