"use server";

import { revalidatePath } from "next/cache";

import { requireOrganizer } from "@/lib/auth/require-organizer";

export type DeleteConfirmationResult = {
  success: boolean;
  message?: string;
};

export async function deleteConfirmationAction(
  eventId: number,
  confirmationId: number
): Promise<DeleteConfirmationResult> {
  const { supabase } = await requireOrganizer();

  const { data: event } = await supabase
    .from("events")
    .select("slug")
    .eq("id", eventId)
    .maybeSingle();

  const { data, error } = await supabase
    .from("confirmations")
    .delete()
    .eq("id", confirmationId)
    .eq("event_id", eventId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return {
      success: false,
      message: "Não foi possível remover a confirmação. Tente de novo.",
    };
  }

  revalidatePath(`/painel/eventos/${eventId}`);
  if (event?.slug) {
    revalidatePath(`/${event.slug}`);
  }

  return {
    success: true,
    message: "Confirmação removida.",
  };
}
