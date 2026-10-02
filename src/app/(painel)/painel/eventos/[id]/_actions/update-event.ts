"use server";

import { revalidatePath } from "next/cache";

import { requireOrganizer } from "@/lib/auth/require-organizer";
import { isDateBeforeToday } from "@/lib/event-date";
import {
  illustrationColumns,
  readIllustrationFromFormData,
} from "@/lib/event-illustration-server";
import {
  confirmationWindowColumns,
  eventFieldsFromFormData,
  eventFieldsSchema,
  type EventFieldErrors,
} from "@/lib/event-schema";

export type UpdateEventResult = {
  success: boolean;
  message?: string;
  errors?: EventFieldErrors;
};

export async function updateEventAction(
  eventId: number,
  formData: FormData
): Promise<UpdateEventResult> {
  const { supabase } = await requireOrganizer();
  const validation = eventFieldsSchema.safeParse(eventFieldsFromFormData(formData));

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors as EventFieldErrors;

    return {
      success: false,
      errors,
      message:
        errors.confirmationStartsOn || errors.confirmationEndsOn
          ? "Ajuste a janela de confirmação ou deixe as duas datas vazias."
          : "Confira os dados informados.",
    };
  }

  const illustration = await readIllustrationFromFormData(formData);

  if (illustration.kind === "invalid") {
    return {
      success: false,
      errors: { illustration: [illustration.message] },
      message: illustration.message,
    };
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

  if (
    validation.data.eventDate !== current.event_date &&
    isDateBeforeToday(validation.data.eventDate)
  ) {
    return {
      success: false,
      errors: {
        eventDate: ["A data não pode estar no passado."],
      },
    };
  }

  const window = confirmationWindowColumns(validation.data);

  const { error } = await supabase
    .from("events")
    .update({
      title: validation.data.title,
      details: validation.data.details.trim() || null,
      event_date: validation.data.eventDate,
      event_time: validation.data.eventTime,
      location: validation.data.location,
      confirmation_starts_on: window.confirmation_starts_on,
      confirmation_ends_on: window.confirmation_ends_on,
      updated_at: new Date().toISOString(),
      ...illustrationColumns(illustration),
    })
    .eq("id", eventId);

  if (error) {
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
    message: "Dados do evento gravados.",
  };
}
