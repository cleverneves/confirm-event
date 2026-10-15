"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireEventAccess } from "@/lib/auth/event-access";
import {
  canManageOrganizers,
  NO_EVENT_ACCESS_MESSAGE,
  ORGANIZERS_FORBIDDEN_MESSAGE,
} from "@/lib/event-roles";

export type RemoveOrganizerResult = {
  success: boolean;
  message?: string;
};

const REMOVE_FAILED_MESSAGE =
  "Não foi possível remover o organizador. Tente de novo.";

const userIdSchema = z.uuid();

export async function removeOrganizerAction(
  eventId: number,
  userId: string
): Promise<RemoveOrganizerResult> {
  const { supabase, role } = await requireEventAccess(eventId);

  if (!role) {
    return { success: false, message: NO_EVENT_ACCESS_MESSAGE };
  }

  if (!canManageOrganizers(role)) {
    return { success: false, message: ORGANIZERS_FORBIDDEN_MESSAGE };
  }

  const validation = userIdSchema.safeParse(userId);

  if (!validation.success) {
    return { success: false, message: REMOVE_FAILED_MESSAGE };
  }

  const { data: outcome, error } = await supabase.rpc("remove_event_organizer", {
    p_event_id: eventId,
    p_user_id: validation.data,
  });

  if (error) {
    return { success: false, message: REMOVE_FAILED_MESSAGE };
  }

  if (outcome === "forbidden") {
    return { success: false, message: ORGANIZERS_FORBIDDEN_MESSAGE };
  }

  if (outcome !== "removed") {
    return { success: false, message: REMOVE_FAILED_MESSAGE };
  }

  revalidatePath("/painel");
  revalidatePath(`/painel/eventos/${eventId}`);

  return { success: true, message: "Organizador removido." };
}
