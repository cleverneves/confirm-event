"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { resolveConfirmation } from "@/lib/confirmation-window";
import { todayInSaoPaulo } from "@/lib/event-date";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  slug: z.string().min(1),
  fullName: z.string().trim().min(1, "Informe o nome completo"),
});

export type ConfirmPresenceInput = z.infer<typeof schema>;

export type ConfirmPresenceResult = {
  success: boolean;
  unavailable?: boolean;
  message?: string;
  errors?: {
    fullName?: string[];
  };
};

const UNAVAILABLE_RESULT: ConfirmPresenceResult = {
  success: false,
  unavailable: true,
  message: "Confirmação indisponível",
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
    .select(
      "event_id, events(id, slug, event_date, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed)"
    )
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

  const confirmation = resolveConfirmation({
    today: todayInSaoPaulo(),
    eventDate: event.event_date,
    startsOn: event.confirmation_starts_on,
    endsOn: event.confirmation_ends_on,
    manuallyClosed: event.confirmation_manually_closed,
  });

  if (confirmation.status !== "open") {
    return UNAVAILABLE_RESULT;
  }

  const { error } = await supabase.from("confirmations").insert({
    event_id: event.id,
    full_name: validation.data.fullName,
  });

  if (error) {
    if (isRowLevelSecurityError(error)) {
      return UNAVAILABLE_RESULT;
    }

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

function isRowLevelSecurityError(error: { code?: string; message?: string }) {
  return (
    error.code === "42501" ||
    error.code === "PGRST301" ||
    /row-level security/i.test(error.message ?? "")
  );
}
