"use server";

import { revalidatePath } from "next/cache";

import { requireEventAccess } from "@/lib/auth/event-access";
import {
  canLeaveEvent,
  NO_EVENT_ACCESS_MESSAGE,
  ORGANIZERS_FORBIDDEN_MESSAGE,
} from "@/lib/event-roles";

export type LeaveEventResult = {
  success: boolean;
  message?: string;
};

const LEAVE_FAILED_MESSAGE = "Não foi possível sair do evento. Tente de novo.";

export async function leaveEventAction(
  eventId: number
): Promise<LeaveEventResult> {
  const { supabase, role } = await requireEventAccess(eventId);

  if (!role) {
    return { success: false, message: NO_EVENT_ACCESS_MESSAGE };
  }

  if (!canLeaveEvent(role)) {
    return { success: false, message: ORGANIZERS_FORBIDDEN_MESSAGE };
  }

  const { data: outcome, error } = await supabase.rpc("leave_event", {
    p_event_id: eventId,
  });

  if (error) {
    return { success: false, message: LEAVE_FAILED_MESSAGE };
  }

  if (outcome === "forbidden") {
    return { success: false, message: ORGANIZERS_FORBIDDEN_MESSAGE };
  }

  if (outcome !== "left") {
    return { success: false, message: LEAVE_FAILED_MESSAGE };
  }

  revalidatePath("/painel");

  return { success: true, message: "Você saiu do evento." };
}
