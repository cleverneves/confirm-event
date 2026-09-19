"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireOrganizer } from "@/lib/auth/require-organizer";
import { createEventSchema, type EventFields } from "@/lib/event-schema";
import { nextAvailableSlug } from "@/lib/slug";

export type CreateEventResult = {
  success: boolean;
  message?: string;
  errors?: {
    title?: string[];
    details?: string[];
    eventDate?: string[];
    eventTime?: string[];
    location?: string[];
  };
};

export async function createEventAction(
  input: EventFields
): Promise<CreateEventResult> {
  const { supabase } = await requireOrganizer();
  const validation = createEventSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
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

  const { data: event, error: eventError } = await supabase
    .from("events")
    .insert({
      title: validation.data.title,
      details,
      event_date: validation.data.eventDate,
      event_time: validation.data.eventTime,
      location: validation.data.location,
      slug,
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
