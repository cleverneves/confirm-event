"use server";

import { revalidatePath } from "next/cache";

import { requireOrganizer } from "@/lib/auth/require-organizer";
import {
  confirmationPanelMessage,
  resolveConfirmation,
} from "@/lib/confirmation-window";
import { todayInSaoPaulo } from "@/lib/event-date";

export type CloseConfirmationResult = {
  success: boolean;
  message?: string;
};

export async function closeConfirmationAction(
  eventId: number,
  confirmed: boolean
): Promise<CloseConfirmationResult> {
  if (!confirmed) {
    return {
      success: false,
      message: "Confirme o encerramento para continuar.",
    };
  }

  const { supabase } = await requireOrganizer();
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select(
      "slug, event_date, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed"
    )
    .eq("id", eventId)
    .maybeSingle();

  if (eventError || !event) {
    return {
      success: false,
      message: "Não foi possível encerrar a confirmação. Tente de novo.",
    };
  }

  const confirmation = resolveConfirmation({
    today: todayInSaoPaulo(),
    eventDate: event.event_date,
    startsOn: event.confirmation_starts_on,
    endsOn: event.confirmation_ends_on,
    manuallyClosed: event.confirmation_manually_closed,
  });

  if (confirmation.status !== "open") {
    return {
      success: false,
      message: "A confirmação já está encerrada.",
    };
  }

  const { error } = await supabase
    .from("events")
    .update({
      confirmation_manually_closed: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", eventId);

  if (error) {
    return {
      success: false,
      message: "Não foi possível encerrar a confirmação. Tente de novo.",
    };
  }

  revalidatePath("/painel");
  revalidatePath(`/painel/eventos/${eventId}`);
  revalidatePath(`/${event.slug}`);

  return {
    success: true,
    message: "A confirmação foi encerrada.",
  };
}

export type ReopenConfirmationResult = {
  success: boolean;
  message?: string;
};

export async function reopenConfirmationAction(
  eventId: number
): Promise<ReopenConfirmationResult> {
  const { supabase } = await requireOrganizer();
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select(
      "slug, event_date, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed"
    )
    .eq("id", eventId)
    .maybeSingle();

  if (eventError || !event) {
    return {
      success: false,
      message: "Não foi possível reativar a confirmação. Tente de novo.",
    };
  }

  const { error } = await supabase
    .from("events")
    .update({
      confirmation_manually_closed: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", eventId);

  if (error) {
    return {
      success: false,
      message: "Não foi possível reativar a confirmação. Tente de novo.",
    };
  }

  const confirmation = resolveConfirmation({
    today: todayInSaoPaulo(),
    eventDate: event.event_date,
    startsOn: event.confirmation_starts_on,
    endsOn: event.confirmation_ends_on,
    manuallyClosed: false,
  });

  revalidatePath("/painel");
  revalidatePath(`/painel/eventos/${eventId}`);
  revalidatePath(`/${event.slug}`);

  return {
    success: true,
    message: confirmationPanelMessage(confirmation, event.confirmation_starts_on),
  };
}
