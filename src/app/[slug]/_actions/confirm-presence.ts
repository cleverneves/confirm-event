"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  slug: z.string().min(1),
  fullName: z.string().trim().min(1, "Informe o nome completo"),
});

export type ConfirmPresenceInput = z.infer<typeof schema>;

export type ConfirmPresenceResult = {
  success: boolean;
  message?: string;
  errors?: {
    fullName?: string[];
  };
};

export async function confirmPresenceAction(
  input: ConfirmPresenceInput
): Promise<ConfirmPresenceResult> {
  const validation = schema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const { data: slugRow, error: slugError } = await supabase
    .from("event_slugs")
    .select("event_id, events(id, slug)")
    .eq("slug", validation.data.slug)
    .maybeSingle();

  const rawEvent = slugRow?.events;
  const event = Array.isArray(rawEvent) ? rawEvent[0] : rawEvent;

  if (slugError || !event) {
    return {
      success: false,
      message: "Este evento não está disponível.",
    };
  }

  const { error } = await supabase.from("confirmations").insert({
    event_id: event.id,
    full_name: validation.data.fullName,
  });

  if (error) {
    return {
      success: false,
      message: "Não foi possível confirmar. Tente de novo.",
    };
  }

  revalidatePath(`/painel/eventos/${event.id}`);
  revalidatePath(`/${event.slug}`);

  return {
    success: true,
    message: "Presença confirmada.",
  };
}
