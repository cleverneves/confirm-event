export const ILLUSTRATION_MAX_BYTES = 8 * 1024 * 1024;
export const ILLUSTRATION_JPEG = "image/jpeg";
export const ILLUSTRATION_PNG = "image/png";

export const PAGE_LAYOUTS = ["personalized", "image_only"] as const;
export type EventPageLayout = (typeof PAGE_LAYOUTS)[number];
export const DEFAULT_PAGE_LAYOUT: EventPageLayout = "personalized";

export type IllustrationAspect = "banner" | "portrait";

export const ILLUSTRATION_FIELD_HELP =
  "Opcional. Use jpg ou png, no máximo 8 MB. Proporção 4:1; tamanho ideal 1584×396.";

export const ILLUSTRATION_FIELD_HELP_IMAGE_ONLY =
  "Obrigatória. Use jpg ou png, no máximo 8 MB. Tamanho ideal 700×923.";

export const ILLUSTRATION_ASPECT_WARNING =
  "A imagem pode ficar desconfigurada. A faixa é 4:1 e a imagem preenche o espaço.";

export const ILLUSTRATION_ASPECT_WARNING_PORTRAIT =
  "A imagem pode ficar desconfigurada. A área é 700:923 e a imagem preenche o espaço.";

export const ILLUSTRATION_INVALID_TYPE_MESSAGE = "Use um arquivo jpg ou png.";

export const ILLUSTRATION_TOO_LARGE_MESSAGE =
  "O arquivo pode ter no máximo 8 MB.";

export const IMAGE_ONLY_REQUIRES_IMAGE_MESSAGE =
  "Esse layout precisa de uma imagem.";

export type IllustrationContentType =
  | typeof ILLUSTRATION_JPEG
  | typeof ILLUSTRATION_PNG;

export function parsePageLayout(value: unknown): EventPageLayout {
  if (value === "image_only") {
    return "image_only";
  }

  return "personalized";
}

export function illustrationAspect(layout: EventPageLayout): IllustrationAspect {
  return layout === "image_only" ? "portrait" : "banner";
}

export function illustrationFieldHelp(layout: EventPageLayout) {
  return layout === "image_only"
    ? ILLUSTRATION_FIELD_HELP_IMAGE_ONLY
    : ILLUSTRATION_FIELD_HELP;
}

export function illustrationAspectWarning(layout: EventPageLayout) {
  return layout === "image_only"
    ? ILLUSTRATION_ASPECT_WARNING_PORTRAIT
    : ILLUSTRATION_ASPECT_WARNING;
}

export function eventIllustrationUrl(slug: string, updatedAt: string) {
  return `/${slug}/imagem?v=${encodeURIComponent(updatedAt)}`;
}

export function isAllowedIllustrationName(name: string) {
  return /\.(jpe?g|png)$/i.test(name);
}

export function isAllowedIllustrationMime(type: string) {
  return type === ILLUSTRATION_JPEG || type === ILLUSTRATION_PNG;
}

export function hasTargetAspect(
  width: number,
  height: number,
  ratioW: number,
  ratioH: number
) {
  if (height <= 0) {
    return false;
  }

  return Math.abs(width * ratioH - height * ratioW) <= ratioH;
}

export function hasFourToOneAspect(width: number, height: number) {
  return hasTargetAspect(width, height, 4, 1);
}

export function hasLayoutAspect(
  layout: EventPageLayout,
  width: number,
  height: number
) {
  if (layout === "image_only") {
    return hasTargetAspect(width, height, 700, 923);
  }

  return hasFourToOneAspect(width, height);
}

export function detectIllustrationContentType(
  bytes: Uint8Array
): IllustrationContentType | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return ILLUSTRATION_JPEG;
  }

  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return ILLUSTRATION_PNG;
  }

  return null;
}

export function validateIllustrationFile(file: File) {
  if (file.size === 0) {
    return ILLUSTRATION_INVALID_TYPE_MESSAGE;
  }

  if (file.size > ILLUSTRATION_MAX_BYTES) {
    return ILLUSTRATION_TOO_LARGE_MESSAGE;
  }

  if (!isAllowedIllustrationName(file.name) || !isAllowedIllustrationMime(file.type)) {
    return ILLUSTRATION_INVALID_TYPE_MESSAGE;
  }

  return null;
}
