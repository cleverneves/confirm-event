"use server";

import { z } from "zod";

import { getRequestOrigin } from "@/lib/request-origin";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.email("Informe um e-mail válido"),
});

export type RecoverPasswordInput = z.infer<typeof schema>;

export type RecoverPasswordResult = {
  success: boolean;
  message?: string;
  errors?: {
    email?: string[];
  };
};

const GENERIC_MESSAGE =
  "Se o e-mail for o da conta, você receberá as instruções.";

export async function recoverPasswordAction(
  input: RecoverPasswordInput
): Promise<RecoverPasswordResult> {
  const validation = schema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const origin = await getRequestOrigin();

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(
      validation.data.email,
      {
        redirectTo: `${origin}/auth/confirm?next=/redefinir-senha`,
      }
    );

    if (error) {
      const code = error.code?.toLowerCase() ?? "";

      if (
        code.includes("rate_limit") ||
        code === "over_email_send_rate_limit" ||
        code === "over_request_rate_limit"
      ) {
        return {
          success: false,
          message: "Não foi possível concluir o pedido. Tente de novo.",
        };
      }
    }
  } catch {
    return {
      success: false,
      message: "Não foi possível concluir o pedido. Tente de novo.",
    };
  }

  return {
    success: true,
    message: GENERIC_MESSAGE,
  };
}
