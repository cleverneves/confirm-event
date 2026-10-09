import { z } from "zod";

export const DEFAULT_BACKGROUND_COLOR_1 = "#f3f5f7";
export const DEFAULT_BACKGROUND_COLOR_2 = "#e0e1dd";
export const DEFAULT_TITLE_COLOR = "#0d1b2a";
export const DEFAULT_TEXT_COLOR = "#0d1b2a";
export const BUTTON_TEXT_LIGHT = "#e0e1dd";
export const BUTTON_TEXT_DARK = "#0d1b2a";

export const TITLE_ON_TOP_CONTRAST_WARNING =
  "O título pode ficar difícil de ler sobre a cor de cima. Você ainda pode salvar.";
export const TEXT_ON_TOP_CONTRAST_WARNING =
  "O texto pode ficar difícil de ler sobre a cor de cima. Você ainda pode salvar.";
export const TEXT_ON_BOTTOM_CONTRAST_WARNING =
  "O texto pode ficar difícil de ler sobre a cor de baixo. Você ainda pode salvar.";

const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/;
const STORED_HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const CONTRAST_THRESHOLD = 4.5;
const INVALID_COLOR_MESSAGE = "Informe uma cor válida";

export type StoredEventTheme = {
  backgroundColor1: string | null;
  backgroundColor2: string | null;
  titleColor: string | null;
  textColor: string | null;
};

export type EventThemeFields = {
  backgroundColor1: string;
  backgroundColor2: string;
  titleColor: string;
  textColor: string;
};

export type EventThemeFieldErrors = {
  backgroundColor1?: string[];
  backgroundColor2?: string[];
  titleColor?: string[];
  textColor?: string[];
};

export type ResolvedEventTheme = {
  backgroundColor1: string | null;
  backgroundColor2: string | null;
  titleColor: string | null;
  textColor: string | null;
  effectiveBackgroundColor1: string;
  effectiveBackgroundColor2: string;
  effectiveTitleColor: string;
  effectiveTextColor: string;
  /** O botão sempre usa a cor 1 efetiva. */
  buttonColor: string;
  buttonTextColor: string;
  backgroundImage: string;
};

const colorInput = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((value) => {
    if (value == null) {
      return null;
    }

    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed.toLowerCase();
  })
  .refine((value) => value === null || HEX_COLOR_PATTERN.test(value), {
    message: INVALID_COLOR_MESSAGE,
  });

export const eventThemeSchema = z.object({
  backgroundColor1: colorInput,
  backgroundColor2: colorInput,
  titleColor: colorInput,
  textColor: colorInput,
});

export type EventThemeInput = z.infer<typeof eventThemeSchema>;

const formColor = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || HEX_COLOR_PATTERN.test(value.toLowerCase()),
    { message: INVALID_COLOR_MESSAGE }
  );

export const eventThemeFormSchema = z.object({
  backgroundColor1: formColor,
  backgroundColor2: formColor,
  titleColor: formColor,
  textColor: formColor,
});

export function parseStoredColor(value: string | null | undefined) {
  if (!value || !STORED_HEX_PATTERN.test(value)) {
    return null;
  }

  return value.toLowerCase();
}

export function backgroundGradient(topColor: string, bottomColor: string) {
  return `linear-gradient(to bottom, ${topColor}, ${bottomColor})`;
}

export function resolveEventTheme(stored: StoredEventTheme): ResolvedEventTheme {
  const backgroundColor1 = parseStoredColor(stored.backgroundColor1);
  const backgroundColor2 = parseStoredColor(stored.backgroundColor2);
  const titleColor = parseStoredColor(stored.titleColor);
  const textColor = parseStoredColor(stored.textColor);

  const effectiveBackgroundColor1 =
    backgroundColor1 ?? DEFAULT_BACKGROUND_COLOR_1;
  const effectiveBackgroundColor2 =
    backgroundColor2 ?? DEFAULT_BACKGROUND_COLOR_2;

  return {
    backgroundColor1,
    backgroundColor2,
    titleColor,
    textColor,
    effectiveBackgroundColor1,
    effectiveBackgroundColor2,
    effectiveTitleColor: titleColor ?? DEFAULT_TITLE_COLOR,
    effectiveTextColor: textColor ?? DEFAULT_TEXT_COLOR,
    buttonColor: effectiveBackgroundColor1,
    buttonTextColor: buttonTextColor(effectiveBackgroundColor1),
    backgroundImage: backgroundGradient(
      effectiveBackgroundColor1,
      effectiveBackgroundColor2
    ),
  };
}

export function toThemeFormValues(stored: StoredEventTheme): EventThemeFields {
  const theme = resolveEventTheme(stored);

  return {
    backgroundColor1: theme.backgroundColor1 ?? "",
    backgroundColor2: theme.backgroundColor2 ?? "",
    titleColor: theme.titleColor ?? "",
    textColor: theme.textColor ?? "",
  };
}

export function contrastRatio(first: string, second: string) {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));

  return (lighter + 0.05) / (darker + 0.05);
}

export function hasLowContrast(firstColor: string, secondColor: string) {
  return contrastRatio(firstColor, secondColor) < CONTRAST_THRESHOLD;
}

/**
 * Avisos de contraste (não bloqueiam o salvamento), calculados com as cores efetivas:
 * título x cor 1, texto x cor 1 e texto x cor 2. Não há aviso entre cor 1 e cor 2.
 */
export function getContrastWarnings(colors: {
  backgroundColor1: string;
  backgroundColor2: string;
  titleColor: string;
  textColor: string;
}) {
  const warnings: string[] = [];

  if (hasLowContrast(colors.titleColor, colors.backgroundColor1)) {
    warnings.push(TITLE_ON_TOP_CONTRAST_WARNING);
  }

  if (hasLowContrast(colors.textColor, colors.backgroundColor1)) {
    warnings.push(TEXT_ON_TOP_CONTRAST_WARNING);
  }

  if (hasLowContrast(colors.textColor, colors.backgroundColor2)) {
    warnings.push(TEXT_ON_BOTTOM_CONTRAST_WARNING);
  }

  return warnings;
}

export function buttonTextColor(buttonColor: string) {
  const lightContrast = contrastRatio(buttonColor, BUTTON_TEXT_LIGHT);
  const darkContrast = contrastRatio(buttonColor, BUTTON_TEXT_DARK);

  return lightContrast >= darkContrast ? BUTTON_TEXT_LIGHT : BUTTON_TEXT_DARK;
}

export function buttonThemeStyle(
  buttonColor: string,
  textColor: string
): { backgroundColor: string; color: string } {
  return {
    backgroundColor: buttonColor,
    color: textColor,
  };
}

function relativeLuminance(hex: string) {
  const [red, green, blue] = hexToRgb(hex).map((channel) => {
    const srgb = channel / 255;
    return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  });

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.slice(1);

  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}
