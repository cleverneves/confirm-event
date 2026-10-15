"use server";

import { revalidatePath } from "next/cache";

import { requireOrganizer } from "@/lib/auth/require-organizer";
import { encodeIllustrationForDb } from "@/lib/event-illustration-server";
import {
  PROFILE_IMAGE_INVALID_MESSAGE,
  PROFILE_IMAGE_REMOVE_FAILED_MESSAGE,
  PROFILE_IMAGE_SAVE_FAILED_MESSAGE,
  profileImageUrl,
  readProfileImageFromFormData,
} from "@/lib/profile-image";

export type UpdateProfileImageResult = {
  success: boolean;
  message?: string;
  removed?: boolean;
  imageUrl?: string | null;
};

export async function saveProfileImageAction(
  formData: FormData
): Promise<UpdateProfileImageResult> {
  const { user, supabase } = await requireOrganizer();
  const change = await readProfileImageFromFormData(formData);

  if (change.kind === "absent") {
    return { success: false, message: PROFILE_IMAGE_INVALID_MESSAGE };
  }

  if (change.kind === "invalid") {
    return { success: false, message: change.message };
  }

  const updatedAt = new Date().toISOString();
  const { error } = await supabase.from("organizer_profile_images").upsert({
    user_id: user.id,
    image: encodeIllustrationForDb(change.bytes),
    content_type: change.contentType,
    updated_at: updatedAt,
  });

  if (error) {
    return { success: false, message: PROFILE_IMAGE_SAVE_FAILED_MESSAGE };
  }

  revalidatePath("/painel", "layout");
  revalidatePath("/painel/perfil");

  return {
    success: true,
    message: "Imagem salva.",
    imageUrl: profileImageUrl(user.id, updatedAt),
  };
}

export async function removeProfileImageAction(): Promise<UpdateProfileImageResult> {
  const { user, supabase } = await requireOrganizer();

  const { error } = await supabase
    .from("organizer_profile_images")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    return { success: false, message: PROFILE_IMAGE_REMOVE_FAILED_MESSAGE };
  }

  revalidatePath("/painel", "layout");
  revalidatePath("/painel/perfil");

  return {
    success: true,
    message: "Imagem removida.",
    removed: true,
    imageUrl: null,
  };
}
