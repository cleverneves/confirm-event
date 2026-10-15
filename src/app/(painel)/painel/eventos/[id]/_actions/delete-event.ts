"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  canDeleteEvent,
  NO_EVENT_ACCESS_MESSAGE,
  requireEventAccess,
} from "@/lib/auth/event-access";

export type DeleteEventResult = {
  success: boolean;
  message?: string;
};

export async function deleteEventAction(
  eventId: number
): Promise<DeleteEventResult> {
  const { supabase, role } = await requireEventAccess(eventId);

  if (!role) {
    return { success: false, message: NO_EVENT_ACCESS_MESSAGE };
  }

  if (!canDeleteEvent(role)) {
    return {
      success: false,
      message: "Só quem criou o evento pode excluí-lo.",
    };
  }

  const { data: current } = await supabase
    .from("events")
    .select("slug")
    .eq("id", eventId)
    .maybeSingle();

  const { data: deleted, error } = await supabase
    .from("events")
    .delete()
    .eq("id", eventId)
    .select("id")
    .maybeSingle();

  if (error || !deleted) {
    return {
      success: false,
      message: "Não foi possível excluir o evento. Tente de novo.",
    };
  }

  revalidatePath("/painel");
  if (current?.slug) {
    revalidatePath(`/${current.slug}`);
  }

  redirect("/painel");
}
