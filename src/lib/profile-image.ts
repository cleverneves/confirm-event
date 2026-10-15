import {
  detectIllustrationContentType,
  ILLUSTRATION_JPEG,
  ILLUSTRATION_PNG,
  isAllowedIllustrationMime,
  isAllowedIllustrationName,
} from "@/lib/event-illustration";

export const PROFILE_IMAGE_MAX_BYTES = 2 * 1024 * 1024;

export const PROFILE_IMAGE_INVALID_MESSAGE =
  "Envie uma imagem jpg ou png de até 2 MB.";

export const PROFILE_IMAGE_SAVE_FAILED_MESSAGE =
  "Não foi possível salvar a imagem. Tente de novo.";

export const PROFILE_IMAGE_REMOVE_FAILED_MESSAGE =
  "Não foi possível remover a imagem. Tente de novo.";

export type ProfileImageContentType =
  | typeof ILLUSTRATION_JPEG
  | typeof ILLUSTRATION_PNG;

export function profileImageUrl(userId: string, updatedAt: string) {
  return `/painel/perfil/imagem/${encodeURIComponent(userId)}?v=${encodeURIComponent(updatedAt)}`;
}

export function validateProfileImageFile(file: File) {
  if (file.size === 0 || file.size > PROFILE_IMAGE_MAX_BYTES) {
    return PROFILE_IMAGE_INVALID_MESSAGE;
  }

  if (!isAllowedIllustrationName(file.name) || !isAllowedIllustrationMime(file.type)) {
    return PROFILE_IMAGE_INVALID_MESSAGE;
  }

  return null;
}

export async function validateProfileImageBytes(bytes: Uint8Array) {
  if (bytes.length === 0 || bytes.length > PROFILE_IMAGE_MAX_BYTES) {
    return { ok: false as const, message: PROFILE_IMAGE_INVALID_MESSAGE };
  }

  const contentType = detectIllustrationContentType(bytes);

  if (!contentType) {
    return { ok: false as const, message: PROFILE_IMAGE_INVALID_MESSAGE };
  }

  return { ok: true as const, bytes, contentType };
}

export async function readProfileImageFromFormData(formData: FormData) {
  const file = formData.get("profileImage");

  if (!(file instanceof File) || file.size === 0) {
    return { kind: "absent" as const };
  }

  const clientError = validateProfileImageFile(file);

  if (clientError) {
    return { kind: "invalid" as const, message: clientError };
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const validated = await validateProfileImageBytes(bytes);

  if (!validated.ok) {
    return { kind: "invalid" as const, message: validated.message };
  }

  return {
    kind: "replace" as const,
    bytes: validated.bytes,
    contentType: validated.contentType,
  };
}
