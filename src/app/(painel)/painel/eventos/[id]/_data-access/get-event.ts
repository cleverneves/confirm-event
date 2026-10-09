import {
  resolveEventConfirmation,
  type ConfirmationResolution,
} from "@/lib/confirmation-window";
import { requireOrganizer } from "@/lib/auth/require-organizer";
import {
  parsePageLayout,
  type EventPageLayout,
} from "@/lib/event-illustration";
import { parseStoredColor } from "@/lib/event-theme";

export type PainelEvent = {
  id: number;
  title: string;
  details: string | null;
  eventDate: string;
  eventTime: string;
  location: string;
  slug: string;
  confirmationStartsOn: string | null;
  confirmationEndsOn: string | null;
  confirmationManuallyClosed: boolean;
  confirmation: ConfirmationResolution;
  confirmationMessage: string;
  backgroundColor1: string | null;
  backgroundColor2: string | null;
  titleColor: string | null;
  textColor: string | null;
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
  const { supabase } = await requireOrganizer();

  const { data, error } = await supabase
    .from("events")
    .select(
      "id, title, details, event_date, event_time, location, slug, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed, background_color_1, background_color_2, title_color, text_color, illustration_content_type, page_layout, updated_at"
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
    title: data.title,
    details: data.details,
    eventDate: data.event_date,
    eventTime: data.event_time,
    location: data.location,
    slug: data.slug,
    confirmationStartsOn: data.confirmation_starts_on,
    confirmationEndsOn: data.confirmation_ends_on,
    confirmationManuallyClosed: data.confirmation_manually_closed,
    confirmation: resolved.confirmation,
    confirmationMessage: resolved.confirmationMessage,
    backgroundColor1: parseStoredColor(data.background_color_1),
    backgroundColor2: parseStoredColor(data.background_color_2),
    titleColor: parseStoredColor(data.title_color),
    textColor: parseStoredColor(data.text_color),
    pageLayout: parsePageLayout(data.page_layout),
    hasIllustration: Boolean(data.illustration_content_type),
    updatedAt: data.updated_at,
  } satisfies PainelEvent;
}
