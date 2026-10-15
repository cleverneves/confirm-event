"use server";

import { revalidatePath } from "next/cache";

import { requireEventAccess } from "@/lib/auth/event-access";
import {
  canManageOrganizers,
  NO_EVENT_ACCESS_MESSAGE,
  ORGANIZERS_FORBIDDEN_MESSAGE,
} from "@/lib/event-roles";
import {
  addOrganizerSchema,
  ORGANIZER_EMAIL_INVALID_MESSAGE,
  type AddOrganizerInput,
} from "@/lib/organizer-schema";

export type AddOrganizerResult = {
  success: boolean;
  message?: string;
  errors?: {
    email?: string[];
  };
};

const ADD_FAILED_MESSAGE =
  "Não foi possível adicionar o organizador. Tente de novo.";

export async function addOrganizerAction(
  eventId: number,
  input: AddOrganizerInput
): Promise<AddOrganizerResult> {
  const { supabase, role } = await requireEventAccess(eventId);

  if (!role) {
    return { success: false, message: NO_EVENT_ACCESS_MESSAGE };
  }

  if (!canManageOrganizers(role)) {
    return { success: false, message: ORGANIZERS_FORBIDDEN_MESSAGE };
  }

  const validation = addOrganizerSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: { email: [ORGANIZER_EMAIL_INVALID_MESSAGE] },
      message: ORGANIZER_EMAIL_INVALID_MESSAGE,
    };
  }

  const { data: outcome, error } = await supabase.rpc("add_event_organizer", {
    p_event_id: eventId,
    p_email: validation.data.email,
  });

  if (error) {
    return { success: false, message: ADD_FAILED_MESSAGE };
  }

  switch (outcome) {
    case "added":
      revalidatePath(`/painel/eventos/${eventId}`);
      return { success: true, message: "Organizador adicionado." };
    case "not_registered":
      return {
        success: false,
        errors: { email: ["usuário não cadastrado."] },
        message: "usuário não cadastrado.",
      };
    case "already_organizer":
      return {
        success: false,
        errors: { email: ["Este usuário já é organizador deste evento."] },
        message: "Este usuário já é organizador deste evento.",
      };
    case "invalid_email":
      return {
        success: false,
        errors: { email: [ORGANIZER_EMAIL_INVALID_MESSAGE] },
        message: ORGANIZER_EMAIL_INVALID_MESSAGE,
      };
    case "forbidden":
      return { success: false, message: ORGANIZERS_FORBIDDEN_MESSAGE };
    default:
      return { success: false, message: ADD_FAILED_MESSAGE };
  }
}
