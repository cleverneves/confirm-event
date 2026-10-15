"use server";

import { revalidatePath } from "next/cache";

import {
  NO_EVENT_ACCESS_MESSAGE,
  requireEventAccess,
} from "@/lib/auth/event-access";
import { isDateBeforeToday } from "@/lib/event-date";
import { parsePageLayout } from "@/lib/event-illustration";
import {
  illustrationColumns,
  readIllustrationFromFormData,
  resolvePageLayoutSave,
} from "@/lib/event-illustration-server";
import {
  confirmationWindowColumns,
  eventFieldsFromFormData,
  eventFieldsSchema,
  maxGuestCapacityColumn,
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

  const { data: current, error: currentError } = await supabase
    .from("events")
    .select("event_date, slug, page_layout, illustration_content_type")
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

  const window = confirmationWindowColumns(validation.data);

  const { data: updated, error } = await supabase
    .from("events")
    .update({
      title: validation.data.title,
      details: validation.data.details.trim() || null,
      event_date: validation.data.eventDate,
      event_time: validation.data.eventTime,
      location: validation.data.location,
      ...maxGuestCapacityColumn(validation.data),
      confirmation_starts_on: window.confirmation_starts_on,
      confirmation_ends_on: window.confirmation_ends_on,
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
    message: "Dados do evento gravados.",
  };
}
