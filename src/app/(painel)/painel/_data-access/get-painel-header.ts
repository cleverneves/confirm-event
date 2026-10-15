import { requireOrganizer } from "@/lib/auth/require-organizer";
import { organizerDisplayName } from "@/lib/organizer-display";
import { profileImageUrl } from "@/lib/profile-image";

export type PainelHeaderUser = {
  displayName: string;
  imageUrl: string | null;
};

export async function getPainelHeaderUser(): Promise<PainelHeaderUser> {
  const { user, supabase } = await requireOrganizer();
  const email = user.email ?? "";

  const [profileResult, imageResult] = await Promise.all([
    supabase
      .from("organizer_profiles")
      .select("first_name, last_name")
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase
      .from("organizer_profile_images")
      .select("updated_at")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  const firstName = profileResult.data?.first_name ?? null;
  const lastName = profileResult.data?.last_name ?? null;
  const imageUpdatedAt = imageResult.data?.updated_at ?? null;

  return {
    displayName: organizerDisplayName({
      firstName,
      lastName,
      email,
    }),
    imageUrl: imageUpdatedAt
      ? profileImageUrl(user.id, imageUpdatedAt)
      : null,
  };
}
