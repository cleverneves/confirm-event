"use server";

import { revalidatePath } from "next/cache";

import {
  NO_EVENT_ACCESS_MESSAGE,
  requireEventAccess,
} from "@/lib/auth/event-access";
import { eventSlugSchema } from "@/lib/event-schema";

export type UpdateEventSlugResult = {
  success: boolean;
  message?: string;
  errors?: {
    slug?: string[];
  };
};

export async function updateEventSlugAction(
  eventId: number,
  input: { slug: string }
): Promise<UpdateEventSlugResult> {
  const { supabase, role } = await requireEventAccess(eventId);

  if (!role) {
    return { success: false, message: NO_EVENT_ACCESS_MESSAGE };
  }

  const validation = eventSlugSchema.safeParse(input.slug);

  if (!validation.success) {
    return {
      success: false,
      errors: {
        slug: [
          validation.error.issues[0]?.message ?? "Trecho de link inválido.",
        ],
      },
    };
  }

  const newSlug = validation.data;

  const { data: current, error: currentError } = await supabase
    .from("events")
    .select("slug")
    .eq("id", eventId)
    .maybeSingle();

  if (currentError || !current) {
    return {
      success: false,
      message: "Não foi possível alterar o link. Tente de novo.",
    };
  }

  if (current.slug === newSlug) {
    return {
      success: true,
      message: "Link atualizado.",
    };
  }

  const { data: existing } = await supabase
    .from("event_slugs")
    .select("slug, event_id")
    .eq("slug", newSlug)
    .maybeSingle();

  if (existing && existing.event_id !== eventId) {
    return {
      success: false,
      errors: {
        slug: ["Esse endereço não está disponível."],
      },
    };
  }

  if (!existing) {
    const { error: insertError } = await supabase.from("event_slugs").insert({
      slug: newSlug,
      event_id: eventId,
    });

    if (insertError) {
      return {
        success: false,
        message: "Não foi possível alterar o link. Tente de novo.",
      };
    }
  }

  const { data: updated, error: updateError } = await supabase
    .from("events")
    .update({
      slug: newSlug,
      updated_at: new Date().toISOString(),
    })
    .eq("id", eventId)
    .select("id")
    .maybeSingle();

  if (updateError || !updated) {
    return {
      success: false,
      message: "Não foi possível alterar o link. Tente de novo.",
    };
  }

  revalidatePath("/painel");
  revalidatePath(`/painel/eventos/${eventId}`);
  revalidatePath(`/${current.slug}`);
  revalidatePath(`/${newSlug}`);

  return {
    success: true,
    message: "Link atualizado.",
  };
}
