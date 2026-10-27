"use server";

import { revalidatePath } from "next/cache";

import {
  NO_EVENT_ACCESS_MESSAGE,
  requireEventAccess,
} from "@/lib/auth/event-access";
import { isDateBeforeToday } from "@/lib/event-date";
import {
  EVENT_DATE_INVALIDATES_WINDOW_MESSAGE,
  eventOccasionFromFormData,
  isOccasionDateInvalidForSavedWindow,
  makeEventOccasionSchema,
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
  const { supabase, role } = await requireEventAccess(eventId);

  if (!role) {
    return { success: false, message: NO_EVENT_ACCESS_MESSAGE };
  }

  const { data: current, error: currentError } = await supabase
    .from("events")
    .select(
      "event_date, slug, confirmation_starts_on, confirmation_ends_on"
    )
    .eq("id", eventId)
    .maybeSingle();

  if (currentError || !current) {
    return {
      success: false,
      message: "Não foi possível salvar. Tente de novo.",
    };
  }

  const validation = makeEventOccasionSchema(current.event_date).safeParse(
    eventOccasionFromFormData(formData)
  );

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors as EventFieldErrors;

    return {
      success: false,
      errors,
      message: "Confira os dados informados.",
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

  if (
    isOccasionDateInvalidForSavedWindow(
      validation.data.eventDate,
      current.confirmation_starts_on,
      current.confirmation_ends_on
    )
  ) {
    return {
      success: false,
      errors: {
        eventDate: [EVENT_DATE_INVALIDATES_WINDOW_MESSAGE],
      },
      message: EVENT_DATE_INVALIDATES_WINDOW_MESSAGE,
    };
  }

  const { data: updated, error } = await supabase
    .from("events")
    .update({
      title: validation.data.title,
      details: validation.data.details.trim() || null,
      event_date: validation.data.eventDate,
      event_time: validation.data.eventTime,
      location: validation.data.location,
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
    message: "Dados do evento gravados.",
  };
}
