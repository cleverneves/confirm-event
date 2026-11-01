"use server";

import { revalidatePath } from "next/cache";

import {
  NO_EVENT_ACCESS_MESSAGE,
  requireEventAccess,
} from "@/lib/auth/event-access";
import {
  confirmationWindowColumns,
  eventGeneralSettingsFromFormData,
  makeEventGeneralSettingsSchema,
  maxGuestCapacityColumn,
  type EventGeneralSettingsFieldErrors,
} from "@/lib/event-schema";

export type UpdateEventGeneralSettingsResult = {
  success: boolean;
  message?: string;
  errors?: EventGeneralSettingsFieldErrors;
};

export async function updateEventGeneralSettingsAction(
  eventId: number,
  formData: FormData
): Promise<UpdateEventGeneralSettingsResult> {
  const { supabase, role } = await requireEventAccess(eventId);

  if (!role) {
    return { success: false, message: NO_EVENT_ACCESS_MESSAGE };
  }

  const { data: current, error: currentError } = await supabase
    .from("events")
    .select("event_date, slug")
    .eq("id", eventId)
    .maybeSingle();

  if (currentError || !current) {
    return {
      success: false,
      message: "Não foi possível salvar. Tente de novo.",
    };
  }

  const validation = makeEventGeneralSettingsSchema(current.event_date).safeParse(
    eventGeneralSettingsFromFormData(formData)
  );

  if (!validation.success) {
    const errors = validation.error.flatten()
      .fieldErrors as EventGeneralSettingsFieldErrors;

    return {
      success: false,
      errors,
      message:
        errors.confirmationStartsOn || errors.confirmationEndsOn
          ? "Ajuste a janela de confirmação ou deixe as duas datas vazias."
          : "Confira os dados informados.",
    };
  }

  const window = confirmationWindowColumns(validation.data);

  const { data: updated, error } = await supabase
    .from("events")
    .update({
      ...maxGuestCapacityColumn(validation.data),
      confirmation_starts_on: window.confirmation_starts_on,
      confirmation_ends_on: window.confirmation_ends_on,
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

  revalidatePath("/painel");
  revalidatePath(`/painel/eventos/${eventId}`);
  revalidatePath(`/${current.slug}`);
  revalidatePath(`/${current.slug}/imagem`);

  return {
    success: true,
    message: "Configurações gravadas.",
  };
}
