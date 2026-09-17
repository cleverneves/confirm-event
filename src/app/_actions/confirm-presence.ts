"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { findDuplicateNameKey } from "@/lib/people/name-key";
import { createClient } from "@/lib/supabase/server";
import type { ConfirmPresenceResult } from "@/lib/supabase/database.types";

const personSchema = z.object({
  firstName: z.string().trim().min(1, "Informe o nome"),
  lastName: z.string().trim().min(1, "Informe o sobrenome"),
});

const schema = z
  .object({
    party: z.enum(["mariana", "victor"], {
      error: "Escolha a festa",
    }),
    titular: personSchema,
    companions: z.array(personSchema),
  })
  .superRefine((data, ctx) => {
    const duplicate = findDuplicateNameKey([data.titular, ...data.companions]);
    if (duplicate) {
      ctx.addIssue({
        code: "custom",
        path: ["companions"],
        message: "Há nomes repetidos neste envio.",
      });
    }
  });

export type ConfirmPresenceInput = z.infer<typeof schema>;

export type ConfirmPresenceActionResult = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

function rpcFailureMessage(details?: string) {
  const text = details?.toLowerCase() ?? "";

  if (text.includes("confirm_presence") && text.includes("does not exist")) {
    return "O banco ainda não tem a função de confirmação. Rode a migration do projeto.";
  }

  if (text.includes("could not find the function")) {
    return "O banco ainda não tem a função de confirmação. Rode a migration do projeto.";
  }

  return "Não foi possível confirmar. Tente de novo.";
}

function conflictMessage(result: ConfirmPresenceResult) {
  const name = result.name ?? "Essa pessoa";

  if (result.code === "same_party") {
    if (result.is_companion) {
      return `${name} já confirmou nesta festa.`;
    }
    return "Você já confirmou nesta festa.";
  }

  if (result.code === "other_party") {
    if (result.is_companion) {
      return `${name} já está na outra festa.`;
    }
    return "Você já está na outra festa.";
  }

  if (result.code === "duplicate_in_payload") {
    return "Há nomes repetidos neste envio.";
  }

  return "Não foi possível confirmar. Tente de novo.";
}

export async function confirmPresenceAction(
  input: ConfirmPresenceInput
): Promise<ConfirmPresenceActionResult> {
  const validation = schema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: validation.error.issues[0]?.message,
    };
  }

  const supabase = await createClient();

  try {
    const { data, error } = await supabase.rpc("confirm_presence", {
      p_party: validation.data.party,
      p_titular: {
        first_name: validation.data.titular.firstName,
        last_name: validation.data.titular.lastName,
      },
      p_companions: validation.data.companions.map((companion) => ({
        first_name: companion.firstName,
        last_name: companion.lastName,
      })),
    });

    if (error || !data) {
      console.error("confirm_presence", error);
      return {
        success: false,
        message: rpcFailureMessage(error?.message),
      };
    }

    if (!data.ok) {
      return {
        success: false,
        message: conflictMessage(data),
      };
    }
  } catch {
    return {
      success: false,
      message: "Não foi possível confirmar. Tente de novo.",
    };
  }

  revalidatePath("/painel");

  return {
    success: true,
    message: "Presença confirmada.",
  };
}
