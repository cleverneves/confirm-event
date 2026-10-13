"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { resolveConfirmation } from "@/lib/confirmation-window";
import { todayInSaoPaulo } from "@/lib/event-date";
import { createClient } from "@/lib/supabase/server";

const slugSchema = z.string().min(1);

const fullNameSchema = z.string().trim().min(1, "Informe o nome e sobrenome");

export type ConfirmPresenceInput = {
  slug: string;
  fullName: string;
};

export type ConfirmPresenceResult = {
  success: boolean;
  unavailable?: boolean;
  /** Não há vaga: o nome não foi gravado. */
  soldOut?: boolean;
  /** Em caso de sucesso, indica se ainda há vaga para confirmar outra pessoa. */
  canConfirmAnother?: boolean;
  message?: string;
  errors?: {
    fullName?: string[];
  };
};

const RETRY_MESSAGE = "Não foi possível confirmar. Tente de novo.";

const UNAVAILABLE_RESULT: ConfirmPresenceResult = {
  success: false,
  unavailable: true,
  message: "Confirmação indisponível",
};

const SOLD_OUT_RESULT: ConfirmPresenceResult = {
  success: false,
  soldOut: true,
};

const CAPACITY_REACHED_ERROR = "event_capacity_reached";

export async function confirmPresenceAction(
  input: ConfirmPresenceInput
): Promise<ConfirmPresenceResult> {
  const slugValidation = slugSchema.safeParse(input.slug);

  if (!slugValidation.success) {
    return {
      success: false,
      message: "Este evento não está disponível.",
    };
  }

  const supabase = await createClient();
  const { data: slugRow, error: slugError } = await supabase
    .from("event_slugs")
    .select(
      "event_id, events(id, slug, event_date, max_guest_capacity, confirmation_starts_on, confirmation_ends_on, confirmation_manually_closed)"
    )
    .eq("slug", slugValidation.data)
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

  const capacity = event.max_guest_capacity;

  // A vaga é revista no envio, antes da validação do nome: sem vaga, nada é gravado.
  if (capacity !== null) {
    const total = await countConfirmedGuests(supabase, event.id);

    if (total === null) {
      return { success: false, message: RETRY_MESSAGE };
    }

    if (total >= capacity) {
      return SOLD_OUT_RESULT;
    }
  }

  const nameValidation = fullNameSchema.safeParse(input.fullName);

  if (!nameValidation.success) {
    return {
      success: false,
      errors: {
        fullName: nameValidation.error.issues.map((issue) => issue.message),
      },
    };
  }

  const { error } = await supabase.from("confirmations").insert({
    event_id: event.id,
    full_name: nameValidation.data,
  });

  if (error) {
    // O trigger do banco recusa o envio que passaria da capacidade, inclusive em corrida.
    if (isCapacityReachedError(error)) {
      return SOLD_OUT_RESULT;
    }

    if (isRowLevelSecurityError(error)) {
      return UNAVAILABLE_RESULT;
    }

    return { success: false, message: RETRY_MESSAGE };
  }

  const canConfirmAnother = await hasRoomForAnotherGuest(
    supabase,
    event.id,
    capacity
  );

  revalidatePath(`/painel/eventos/${event.id}`);
  revalidatePath(`/${event.slug}`);

  return {
    success: true,
    canConfirmAnother,
    message: "Presença confirmada.",
  };
}

type PublicSupabase = Awaited<ReturnType<typeof createClient>>;

async function countConfirmedGuests(supabase: PublicSupabase, eventId: number) {
  const { data: total, error } = await supabase.rpc("event_confirmed_count", {
    p_event_id: eventId,
  });

  if (error || total === null) {
    return null;
  }

  return total;
}

/** Sem capacidade há sempre vaga; se o total não puder ser lido, o convite não é exibido. */
async function hasRoomForAnotherGuest(
  supabase: PublicSupabase,
  eventId: number,
  capacity: number | null
) {
  if (capacity === null) {
    return true;
  }

  const total = await countConfirmedGuests(supabase, eventId);

  return total !== null && total < capacity;
}

function isCapacityReachedError(error: { message?: string }) {
  return (error.message ?? "").includes(CAPACITY_REACHED_ERROR);
}

function isRowLevelSecurityError(error: { code?: string; message?: string }) {
  return (
    error.code === "42501" ||
    error.code === "PGRST301" ||
    /row-level security/i.test(error.message ?? "")
  );
}
