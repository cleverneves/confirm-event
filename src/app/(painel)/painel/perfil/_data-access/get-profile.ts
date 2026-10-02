import { requireOrganizer } from "@/lib/auth/require-organizer";
import type { ProfileFormValues } from "@/lib/profile-schema";

export type OrganizerProfile = {
  email: string;
  fields: ProfileFormValues;
  error?: string;
};

export async function getProfile(): Promise<OrganizerProfile> {
  const { user, supabase } = await requireOrganizer();
  const emptyFields: ProfileFormValues = {
    firstName: "",
    lastName: "",
    phone: "",
    company: "",
  };

  const { data, error } = await supabase
    .from("organizer_profiles")
    .select("first_name, last_name, phone, company")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return {
      email: user.email ?? "",
      fields: emptyFields,
      error: "Não foi possível carregar o perfil.",
    };
  }

  return {
    email: user.email ?? "",
    fields: {
      firstName: data?.first_name ?? "",
      lastName: data?.last_name ?? "",
      phone: data?.phone ?? "",
      company: data?.company ?? "",
    },
  };
}
