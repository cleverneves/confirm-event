import {
  resolveEventConfirmation,
  type ConfirmationResolution,
} from "@/lib/confirmation-window";
import { requireOrganizer } from "@/lib/auth/require-organizer";
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
  backgroundColor: string | null;
  titleColor: string | null;
  buttonColor: string | null;
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
      "id, title, details, event_date, event_time, location, slug, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed, background_color, title_color, button_color, illustration_content_type, updated_at"
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
    backgroundColor: parseStoredColor(data.background_color),
    titleColor: parseStoredColor(data.title_color),
    buttonColor: parseStoredColor(data.button_color),
    hasIllustration: Boolean(data.illustration_content_type),
    updatedAt: data.updated_at,
  } satisfies PainelEvent;
}
