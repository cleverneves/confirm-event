import { z } from "zod";

export const PHONE_INVALID_MESSAGE =
  "O telefone precisa ser brasileiro, com DDD, celular ou fixo.";

const NAME_MAX = 80;
const COMPANY_MAX = 120;

export type ParsedBrazilianPhone =
  | { success: true; phone: string | null }
  | { success: false };

/**
 * Aceita vazio, ou um telefone nacional com DDD (fixo 10 dígitos / celular 11
 * com 9 após o DDD), com ou sem pontuação comum e com ou sem +55/55 na frente.
 */
export function parseBrazilianPhone(value: string): ParsedBrazilianPhone {
  const trimmed = value.trim();

  if (!trimmed) {
    return { success: true, phone: null };
  }

  const cleaned = trimmed.replace(/[()\s-]/g, "");

  let national: string;

  if (cleaned.startsWith("+")) {
    if (!cleaned.startsWith("+55") || !/^\+55\d+$/.test(cleaned)) {
      return { success: false };
    }

    national = cleaned.slice(3);
  } else if (!/^\d+$/.test(cleaned)) {
    return { success: false };
  } else if (cleaned.startsWith("55") && (cleaned.length === 12 || cleaned.length === 13)) {
    national = cleaned.slice(2);
  } else {
    national = cleaned;
  }

  if (/^\d{10}$/.test(national) || /^\d{2}9\d{8}$/.test(national)) {
    return { success: true, phone: national };
  }

  return { success: false };
}

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Informe o nome")
    .max(NAME_MAX, "Use no máximo 80 caracteres."),
  lastName: z
    .string()
    .trim()
    .min(1, "Informe o sobrenome")
    .max(NAME_MAX, "Use no máximo 80 caracteres."),
  phone: z.string().refine((value) => parseBrazilianPhone(value).success, {
    message: PHONE_INVALID_MESSAGE,
  }),
  company: z
    .string()
    .trim()
    .max(COMPANY_MAX, "Use no máximo 120 caracteres."),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export type ProfileFieldErrors = {
  firstName?: string[];
  lastName?: string[];
  phone?: string[];
  company?: string[];
};

export type ProfileColumns = {
  first_name: string;
  last_name: string;
  phone: string | null;
  company: string | null;
};

export function profileColumns(data: ProfileFormValues): ProfileColumns {
  const parsedPhone = parseBrazilianPhone(data.phone);

  return {
    first_name: data.firstName,
    last_name: data.lastName,
    phone: parsedPhone.success ? parsedPhone.phone : null,
    company: data.company || null,
  };
}
