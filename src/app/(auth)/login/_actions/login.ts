"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.email("Informe um e-mail válido"),
  password: z.string().min(1, "Informe a senha"),
});

export type LoginInput = z.infer<typeof schema>;

export type LoginResult = {
  success: boolean;
  message?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

function loginFailureMessage(error: { code?: string; message?: string } | null) {
  const code = error?.code?.toLowerCase() ?? "";
  const message = error?.message?.toLowerCase() ?? "";

  if (code === "email_not_confirmed" || message.includes("email not confirmed")) {
    return "Confirme o e-mail da conta para entrar no painel.";
  }

  return "Não foi possível entrar.";
}

export async function loginAction(input: LoginInput): Promise<LoginResult> {
  const validation = schema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: validation.data.email,
      password: validation.data.password,
    });

    if (error) {
      console.error("login", error.code, error.message);
      return {
        success: false,
        message: loginFailureMessage(error),
      };
    }
  } catch {
    return {
      success: false,
      message: "Não foi possível entrar.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/painel");
}
