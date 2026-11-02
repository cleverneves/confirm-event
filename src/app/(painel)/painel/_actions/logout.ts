"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type LogoutResult = {
  success: false;
  message: string;
};

export async function logoutAction(): Promise<LogoutResult | void> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      success: false,
      message: "Não foi possível sair.",
    };
  }

  redirect("/login");
}
