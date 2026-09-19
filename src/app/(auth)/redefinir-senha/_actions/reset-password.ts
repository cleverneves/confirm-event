"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

export type ResetPasswordInput = z.infer<typeof schema>;

export type ResetPasswordResult = {
  success: boolean;
  message?: string;
  errors?: {
    password?: string[];
  };
};

export async function resetPasswordAction(
  input: ResetPasswordInput
): Promise<ResetPasswordResult> {
  const validation = schema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      message: "O link é inválido ou venceu. Solicite a recuperação de novo.",
    };
  }

  try {
    const { error } = await supabase.auth.updateUser({
      password: validation.data.password,
    });

    if (error) {
      return {
        success: false,
        message: "Não foi possível definir a senha nova. Tente de novo.",
      };
    }
  } catch {
    return {
      success: false,
      message: "Não foi possível definir a senha nova. Tente de novo.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/painel");
}
