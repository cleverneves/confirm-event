"use server";

import { revalidatePath } from "next/cache";

import { requireOrganizer } from "@/lib/auth/require-organizer";
import {
  eventThemeSchema,
  type EventThemeFieldErrors,
  type EventThemeInput,
} from "@/lib/event-theme";

export type UpdateEventThemeResult = {
  success: boolean;
  message?: string;
  errors?: EventThemeFieldErrors;
};

export async function updateEventThemeAction(
  eventId: number,
  input: EventThemeInput
): Promise<UpdateEventThemeResult> {
  const { supabase } = await requireOrganizer();
  const validation = eventThemeSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: "Informe uma cor válida.",
    };
  }

  const { data: current, error: currentError } = await supabase
    .from("events")
    .select("slug")
    .eq("id", eventId)
    .maybeSingle();

  if (currentError || !current) {
    return {
      success: false,
      message: "Não foi possível salvar. Tente de novo.",
    };
  }

  const { error } = await supabase
    .from("events")
    .update({
      background_color: validation.data.backgroundColor,
      title_color: validation.data.titleColor,
      button_color: validation.data.buttonColor,
      updated_at: new Date().toISOString(),
    })
    .eq("id", eventId);

  if (error) {
    return {
      success: false,
      message: "Não foi possível salvar. Tente de novo.",
    };
  }

  revalidatePath(`/painel/eventos/${eventId}`);
  revalidatePath(`/${current.slug}`);

  const isDefault =
    validation.data.backgroundColor === null &&
    validation.data.titleColor === null &&
    validation.data.buttonColor === null;

  return {
    success: true,
    message: isDefault ? "Tema padrão restaurado." : "Tema gravado.",
  };
}
