import { z } from "zod";

export const DEFAULT_BACKGROUND_COLOR = "#f3f5f7";
export const DEFAULT_TITLE_COLOR = "#0d1b2a";
export const DEFAULT_BUTTON_COLOR = "#0d1b2a";
export const BUTTON_TEXT_LIGHT = "#e0e1dd";
export const BUTTON_TEXT_DARK = "#0d1b2a";

export const TITLE_CONTRAST_WARNING =
  "O título pode ficar difícil de ler neste fundo. Você ainda pode salvar.";

const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/;
const STORED_HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const CONTRAST_THRESHOLD = 4.5;

export type StoredEventTheme = {
  backgroundColor: string | null;
  titleColor: string | null;
  buttonColor: string | null;
};

export type EventThemeFields = {
  backgroundColor: string;
  titleColor: string;
  buttonColor: string;
};

export type EventThemeFieldErrors = {
  backgroundColor?: string[];
  titleColor?: string[];
  buttonColor?: string[];
};

export type ResolvedEventTheme = {
  backgroundColor: string | null;
  titleColor: string | null;
  buttonColor: string | null;
  buttonTextColor: string;
  effectiveBackgroundColor: string;
  effectiveTitleColor: string;
  effectiveButtonColor: string;
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
    message: "Informe uma cor válida",
  });

export const eventThemeSchema = z.object({
  backgroundColor: colorInput,
  titleColor: colorInput,
  buttonColor: colorInput,
});

export type EventThemeInput = z.infer<typeof eventThemeSchema>;

const formColor = z
  .string()
  .trim()
  .refine((value) => value === "" || HEX_COLOR_PATTERN.test(value.toLowerCase()), {
    message: "Informe uma cor válida",
  });

export const eventThemeFormSchema = z.object({
  backgroundColor: formColor,
  titleColor: formColor,
  buttonColor: formColor,
});

export function parseStoredColor(value: string | null | undefined) {
  if (!value || !STORED_HEX_PATTERN.test(value)) {
    return null;
  }

  return value.toLowerCase();
}

export function resolveEventTheme(stored: StoredEventTheme): ResolvedEventTheme {
  const backgroundColor = parseStoredColor(stored.backgroundColor);
  const titleColor = parseStoredColor(stored.titleColor);
  const buttonColor = parseStoredColor(stored.buttonColor);
  const effectiveButtonColor = buttonColor ?? DEFAULT_BUTTON_COLOR;

  return {
    backgroundColor,
    titleColor,
    buttonColor,
    buttonTextColor: buttonTextColor(effectiveButtonColor),
    effectiveBackgroundColor: backgroundColor ?? DEFAULT_BACKGROUND_COLOR,
    effectiveTitleColor: titleColor ?? DEFAULT_TITLE_COLOR,
    effectiveButtonColor,
  };
}

export function toThemeFormValues(stored: StoredEventTheme): EventThemeFields {
  const theme = resolveEventTheme(stored);

  return {
    backgroundColor: theme.backgroundColor ?? "",
    titleColor: theme.titleColor ?? "",
    buttonColor: theme.buttonColor ?? "",
  };
}

export function contrastRatio(first: string, second: string) {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));

  return (lighter + 0.05) / (darker + 0.05);
}

export function hasLowTitleContrast(backgroundColor: string, titleColor: string) {
  return contrastRatio(backgroundColor, titleColor) < CONTRAST_THRESHOLD;
}

export function buttonTextColor(buttonColor: string) {
  const lightContrast = contrastRatio(buttonColor, BUTTON_TEXT_LIGHT);
  const darkContrast = contrastRatio(buttonColor, BUTTON_TEXT_DARK);

  return lightContrast >= darkContrast ? BUTTON_TEXT_LIGHT : BUTTON_TEXT_DARK;
}

export function buttonThemeStyle(
  buttonColor: string | null,
  textColor: string
): { backgroundColor: string; color: string } | undefined {
  if (!buttonColor) {
    return undefined;
  }

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
