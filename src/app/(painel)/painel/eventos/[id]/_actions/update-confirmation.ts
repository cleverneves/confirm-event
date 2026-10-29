"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  NO_EVENT_ACCESS_MESSAGE,
  requireEventAccess,
} from "@/lib/auth/event-access";

const schema = z.object({
  fullName: z.string().trim().min(1, "Informe o nome e sobrenome"),
});

export type UpdateConfirmationResult = {
  success: boolean;
  message?: string;
  errors?: {
    fullName?: string[];
  };
};

export async function updateConfirmationAction(
  eventId: number,
  confirmationId: number,
  input: { fullName: string }
): Promise<UpdateConfirmationResult> {
  const { supabase, role } = await requireEventAccess(eventId);

  if (!role) {
    return { success: false, message: NO_EVENT_ACCESS_MESSAGE };
  }

  const validation = schema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { data: event } = await supabase
    .from("events")
    .select("slug")
    .eq("id", eventId)
    .maybeSingle();

  const { data, error } = await supabase
    .from("confirmations")
    .update({ full_name: validation.data.fullName })
    .eq("id", confirmationId)
    .eq("event_id", eventId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return {
      success: false,
      message: "Não foi possível salvar o nome. Tente de novo.",
    };
  }

  revalidatePath(`/painel/eventos/${eventId}`);
  revalidatePath(`/painel/eventos/${eventId}/convidados`);
  if (event?.slug) {
    revalidatePath(`/${event.slug}`);
  }

  return {
    success: true,
    message: "Nome atualizado.",
  };
}
