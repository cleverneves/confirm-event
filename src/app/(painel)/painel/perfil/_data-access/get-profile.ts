import { requireOrganizer } from "@/lib/auth/require-organizer";
import { profileImageUrl } from "@/lib/profile-image";
import type { ProfileFormValues } from "@/lib/profile-schema";

export type OrganizerProfile = {
  email: string;
  fields: ProfileFormValues;
  imageUrl: string | null;
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

  const [profileResult, imageResult] = await Promise.all([
    supabase
      .from("organizer_profiles")
      .select("first_name, last_name, phone, company")
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase
      .from("organizer_profile_images")
      .select("updated_at")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  if (profileResult.error) {
    return {
      email: user.email ?? "",
      fields: emptyFields,
      imageUrl: null,
      error: "Não foi possível carregar o perfil.",
    };
  }

  const data = profileResult.data;
  const imageUpdatedAt = imageResult.data?.updated_at ?? null;

  return {
    email: user.email ?? "",
    fields: {
      firstName: data?.first_name ?? "",
      lastName: data?.last_name ?? "",
      phone: data?.phone ?? "",
      company: data?.company ?? "",
    },
    imageUrl: imageUpdatedAt
      ? profileImageUrl(user.id, imageUpdatedAt)
      : null,
  };
}
