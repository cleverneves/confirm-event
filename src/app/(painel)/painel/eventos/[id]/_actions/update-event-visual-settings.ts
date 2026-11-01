"use server";

import { revalidatePath } from "next/cache";

import {
  NO_EVENT_ACCESS_MESSAGE,
  requireEventAccess,
} from "@/lib/auth/event-access";
import { parsePageLayout } from "@/lib/event-illustration";
import {
  illustrationColumns,
  readIllustrationFromFormData,
  resolvePageLayoutSave,
} from "@/lib/event-illustration-server";
import {
  eventVisualSettingsFromFormData,
  makeEventVisualSettingsSchema,
  type EventVisualSettingsFieldErrors,
} from "@/lib/event-schema";

export type UpdateEventVisualSettingsResult = {
  success: boolean;
  message?: string;
  errors?: EventVisualSettingsFieldErrors;
};

export async function updateEventVisualSettingsAction(
  eventId: number,
  formData: FormData
): Promise<UpdateEventVisualSettingsResult> {
  const { supabase, role } = await requireEventAccess(eventId);

  if (!role) {
    return { success: false, message: NO_EVENT_ACCESS_MESSAGE };
  }

  const { data: current, error: currentError } = await supabase
    .from("events")
    .select("slug, page_layout, illustration_content_type")
    .eq("id", eventId)
    .maybeSingle();

  if (currentError || !current) {
    return {
      success: false,
      message: "Não foi possível salvar. Tente de novo.",
    };
  }

  const validation = makeEventVisualSettingsSchema().safeParse(
    eventVisualSettingsFromFormData(formData)
  );

  if (!validation.success) {
    const errors = validation.error.flatten()
      .fieldErrors as EventVisualSettingsFieldErrors;

    return {
      success: false,
      errors,
      message: "Confira os dados informados.",
    };
  }

  const illustration = await readIllustrationFromFormData(formData);

  const resolved = resolvePageLayoutSave({
    requestedLayout: validation.data.layout,
    persistedLayout: parsePageLayout(current.page_layout),
    persistedHasIllustration: Boolean(current.illustration_content_type),
    illustration,
  });

  if (resolved.kind === "invalid") {
    return {
      success: false,
      errors: { illustration: [resolved.message] },
      message: resolved.message,
    };
  }

  const { data: updated, error } = await supabase
    .from("events")
    .update({
      page_layout: resolved.pageLayout,
      updated_at: new Date().toISOString(),
      ...illustrationColumns(resolved.illustration),
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

  revalidatePath("/painel");
  revalidatePath(`/painel/eventos/${eventId}`);
  revalidatePath(`/${current.slug}`);
  revalidatePath(`/${current.slug}/imagem`);

  return {
    success: true,
    message: "Configurações gravadas.",
  };
}
