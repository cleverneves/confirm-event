"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireOrganizer } from "@/lib/auth/require-organizer";

export type DeleteEventResult = {
  success: boolean;
  message?: string;
};

export async function deleteEventAction(
  eventId: number
): Promise<DeleteEventResult> {
  const { supabase } = await requireOrganizer();

  const { data: current } = await supabase
    .from("events")
    .select("slug")
    .eq("id", eventId)
    .maybeSingle();

  const { error } = await supabase.from("events").delete().eq("id", eventId);

  if (error) {
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
