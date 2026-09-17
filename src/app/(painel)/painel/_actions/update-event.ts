"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireOrganizer } from "@/lib/auth/require-organizer";

const schema = z.object({
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Informe um dia válido"),
  eventTime: z.string().regex(/^\d{2}:\d{2}$/, "Informe um horário válido"),
  location: z.string().trim().min(1, "Informe o local"),
});

export type UpdateEventInput = z.infer<typeof schema>;

export type UpdateEventResult = {
  success: boolean;
  message?: string;
  errors?: {
    eventDate?: string[];
    eventTime?: string[];
    location?: string[];
  };
};

export async function updateEventAction(
  input: UpdateEventInput
): Promise<UpdateEventResult> {
  const { supabase } = await requireOrganizer();
  const validation = schema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase
    .from("events")
    .update({
      event_date: validation.data.eventDate,
      event_time: validation.data.eventTime,
      location: validation.data.location,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) {
    return {
      success: false,
      message: "Não foi possível salvar. Tente de novo.",
    };
  }

  revalidatePath("/");
  revalidatePath("/painel");

  return {
    success: true,
    message: "Dados do evento gravados.",
  };
}
