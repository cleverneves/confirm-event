"use server";

import { revalidatePath } from "next/cache";

import {
  NO_EVENT_ACCESS_MESSAGE,
  requireEventAccess,
} from "@/lib/auth/event-access";
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
  const { supabase, role } = await requireEventAccess(eventId);

  if (!role) {
    return { success: false, message: NO_EVENT_ACCESS_MESSAGE };
  }

  const validation = eventThemeSchema.safeParse(input);

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;

    return {
      success: false,
      errors,
      message: errors.blurLevel?.[0] ?? "Informe uma cor válida.",
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

  const { data: updated, error } = await supabase
    .from("events")
    .update({
      background_color_1: validation.data.backgroundColor1,
      background_color_2: validation.data.backgroundColor2,
      title_color: validation.data.titleColor,
      text_color: validation.data.textColor,
      background_mode: validation.data.backgroundMode,
      blur_level: validation.data.blurLevel,
      updated_at: new Date().toISOString(),
    })
    .eq("id", eventId)
    .select("id")
    .maybeSingle();

  if (error || !updated) {
    return {
      success: false,
      message: "Não foi possível salvar. Tente de novo.",
    };
  }

  revalidatePath(`/painel/eventos/${eventId}`);
  revalidatePath(`/${current.slug}`);

  const isDefault =
    validation.data.backgroundColor1 === null &&
    validation.data.backgroundColor2 === null &&
    validation.data.titleColor === null &&
    validation.data.textColor === null &&
    validation.data.backgroundMode === "gradient" &&
    validation.data.blurLevel === null;

  return {
    success: true,
    message: isDefault ? "Tema padrão restaurado." : "Tema gravado.",
  };
}
