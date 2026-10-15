import { z } from "zod";

export const ORGANIZER_EMAIL_INVALID_MESSAGE = "Informe um e-mail válido.";

const EMAIL_MAX = 254;

export const addOrganizerSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, ORGANIZER_EMAIL_INVALID_MESSAGE)
    .max(EMAIL_MAX, ORGANIZER_EMAIL_INVALID_MESSAGE)
    .pipe(z.email(ORGANIZER_EMAIL_INVALID_MESSAGE)),
});

export type AddOrganizerInput = z.input<typeof addOrganizerSchema>;
