import {
  resolveEventConfirmation,
  type ConfirmationResolution,
} from "@/lib/confirmation-window";
import { requireOrganizer } from "@/lib/auth/require-organizer";

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
      "id, title, details, event_date, event_time, location, slug, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed"
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
  } satisfies PainelEvent;
}
