import { z } from "zod";

import { isDateBeforeToday } from "@/lib/event-date";
import { isValidSlug, normalizeSlug } from "@/lib/slug";

export const eventFieldsSchema = z.object({
  title: z.string().trim().min(1, "Informe o título"),
  details: z.string(),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Informe um dia válido"),
  eventTime: z.string().regex(/^\d{2}:\d{2}$/, "Informe um horário válido"),
  location: z.string().trim().min(1, "Informe o local"),
});

export const createEventSchema = eventFieldsSchema.superRefine((data, ctx) => {
  if (isDateBeforeToday(data.eventDate)) {
    ctx.addIssue({
      code: "custom",
      path: ["eventDate"],
      message: "A data não pode estar no passado.",
    });
  }
});

export const eventSlugSchema = z
  .string()
  .trim()
  .min(1, "Informe o trecho do link")
  .transform(normalizeSlug)
  .refine((slug) => isValidSlug(slug), {
    message: "Use letras, números e hífen. Não pode ser vazio nem só hífens.",
  });

export type EventFields = z.infer<typeof eventFieldsSchema>;
