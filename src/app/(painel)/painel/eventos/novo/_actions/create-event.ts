"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireOrganizer } from "@/lib/auth/require-organizer";
import {
  illustrationColumns,
  readIllustrationFromFormData,
  resolvePageLayoutSave,
} from "@/lib/event-illustration-server";
import {
  confirmationWindowColumns,
  createEventSchema,
  eventFieldsFromFormData,
  type EventFieldErrors,
} from "@/lib/event-schema";
import { nextAvailableSlug } from "@/lib/slug";

export type CreateEventResult = {
  success: boolean;
  message?: string;
  errors?: EventFieldErrors;
};

export async function createEventAction(
  formData: FormData
): Promise<CreateEventResult> {
  const { supabase } = await requireOrganizer();
  const validation = createEventSchema.safeParse(eventFieldsFromFormData(formData));

  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors as EventFieldErrors;

    return {
      success: false,
      errors,
      message: validationErrorMessage(errors),
    };
  }

  const illustration = await readIllustrationFromFormData(formData);
  const resolved = resolvePageLayoutSave({
    requestedLayout: validation.data.layout,
    persistedLayout: null,
    persistedHasIllustration: false,
    illustration,
  });

  if (resolved.kind === "invalid") {
    return {
      success: false,
      errors: { illustration: [resolved.message] },
      message: resolved.message,
    };
  }

  const slug = await nextAvailableSlug(validation.data.title, async (candidate) => {
    const { data } = await supabase
      .from("event_slugs")
      .select("slug")
      .eq("slug", candidate)
      .maybeSingle();

    return Boolean(data);
  });

  if (!slug) {
    return {
      success: false,
      message: "Não foi possível criar o evento. Tente de novo.",
    };
  }

  const details = validation.data.details.trim() || null;
  const window = confirmationWindowColumns(validation.data);

  const { data: event, error: eventError } = await supabase
    .from("events")
    .insert({
      title: validation.data.title,
      details,
      event_date: validation.data.eventDate,
      event_time: validation.data.eventTime,
      location: validation.data.location,
      slug,
      confirmation_starts_on: window.confirmation_starts_on,
      confirmation_ends_on: window.confirmation_ends_on,
      page_layout: resolved.pageLayout,
      ...illustrationColumns(resolved.illustration),
    })
    .select("id")
    .single();

  if (eventError || !event) {
    return {
      success: false,
      message: "Não foi possível criar o evento. Tente de novo.",
    };
  }

  const { error: slugError } = await supabase.from("event_slugs").insert({
    slug,
    event_id: event.id,
  });

  if (slugError) {
    await supabase.from("events").delete().eq("id", event.id);
    return {
      success: false,
      message: "Não foi possível criar o evento. Tente de novo.",
    };
  }

  revalidatePath("/painel");
  redirect(`/painel/eventos/${event.id}`);
}

function validationErrorMessage(errors: EventFieldErrors) {
  if (errors.confirmationStartsOn || errors.confirmationEndsOn) {
    return "Ajuste a janela de confirmação ou deixe as duas datas vazias.";
  }

  return "Confira os dados informados.";
}
