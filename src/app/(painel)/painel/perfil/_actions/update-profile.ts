"use server";

import { revalidatePath } from "next/cache";

import { requireOrganizer } from "@/lib/auth/require-organizer";
import {
  profileColumns,
  profileFormSchema,
  type ProfileFieldErrors,
  type ProfileFormValues,
} from "@/lib/profile-schema";

export type UpdateProfileResult = {
  success: boolean;
  message?: string;
  errors?: ProfileFieldErrors;
  fields?: ProfileFormValues;
};

export async function updateProfileAction(
  input: ProfileFormValues
): Promise<UpdateProfileResult> {
  const { user, supabase } = await requireOrganizer();
  const validation = profileFormSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
      message: "Confira os dados informados.",
    };
  }

  const columns = profileColumns(validation.data);
  const { error } = await supabase.from("organizer_profiles").upsert({
    user_id: user.id,
    first_name: columns.first_name,
    last_name: columns.last_name,
    phone: columns.phone,
    company: columns.company,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return {
      success: false,
      message: "Não foi possível salvar.",
    };
  }

  revalidatePath("/painel/perfil");

  return {
    success: true,
    message: "Perfil salvo.",
    fields: {
      firstName: columns.first_name,
      lastName: columns.last_name,
      phone: columns.phone ?? "",
      company: columns.company ?? "",
    },
  };
}
