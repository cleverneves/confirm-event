import { z } from "zod";

import { isDateBeforeToday, isValidCalendarDate } from "@/lib/event-date";
import { PAGE_LAYOUTS } from "@/lib/event-illustration";
import { isValidSlug, normalizeSlug } from "@/lib/slug";

const WINDOW_PAIR_MESSAGE =
  "Informe o início e o fim da janela, ou deixe os dois vazios.";

const eventFieldsObject = z.object({
  title: z.string().trim().min(1, "Informe o título"),
  details: z.string(),
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Informe um dia válido"),
  eventTime: z.string().regex(/^\d{2}:\d{2}$/, "Informe um horário válido"),
  location: z.string().trim().min(1, "Informe o local"),
  layout: z.enum(PAGE_LAYOUTS),
  confirmationStartsOn: z.string(),
  confirmationEndsOn: z.string(),
});

export const eventFieldsSchema =
  eventFieldsObject.superRefine(refineConfirmationWindow);

export function makeEventFieldsSchema(currentDate?: string) {
  return eventFieldsObject.superRefine((data, ctx) => {
    refineConfirmationWindow(data, ctx);

    if (currentDate && data.eventDate === currentDate) {
      return;
    }

    if (isDateBeforeToday(data.eventDate)) {
      ctx.addIssue({
        code: "custom",
        path: ["eventDate"],
        message: "A data não pode estar no passado.",
      });
    }
  });
}

export const createEventSchema = makeEventFieldsSchema();

export const eventSlugSchema = z
  .string()
  .trim()
  .min(1, "Informe o trecho do link")
  .transform(normalizeSlug)
  .refine((slug) => isValidSlug(slug), {
    message: "Use letras, números e hífen. Não pode ser vazio nem só hífens.",
  });

export type EventFields = z.infer<typeof eventFieldsSchema>;

export type EventFieldErrors = {
  title?: string[];
  details?: string[];
  eventDate?: string[];
  eventTime?: string[];
  location?: string[];
  layout?: string[];
  confirmationStartsOn?: string[];
  confirmationEndsOn?: string[];
  illustration?: string[];
};

export function eventFieldsFromFormData(formData: FormData): EventFields {
  return {
    title: String(formData.get("title") ?? ""),
    details: String(formData.get("details") ?? ""),
    eventDate: String(formData.get("eventDate") ?? ""),
    eventTime: String(formData.get("eventTime") ?? ""),
    location: String(formData.get("location") ?? ""),
    layout: String(formData.get("layout") ?? "") as EventFields["layout"],
    confirmationStartsOn: String(formData.get("confirmationStartsOn") ?? ""),
    confirmationEndsOn: String(formData.get("confirmationEndsOn") ?? ""),
  };
}

export function confirmationWindowColumns(data: EventFields) {
  const startsOn = data.confirmationStartsOn.trim();
  const endsOn = data.confirmationEndsOn.trim();

  return {
    confirmation_starts_on: startsOn === "" ? null : startsOn,
    confirmation_ends_on: endsOn === "" ? null : endsOn,
  };
}

function refineConfirmationWindow(
  data: z.infer<typeof eventFieldsObject>,
  ctx: z.RefinementCtx
) {
  const startsOn = data.confirmationStartsOn.trim();
  const endsOn = data.confirmationEndsOn.trim();

  if (startsOn === "" && endsOn === "") {
    return;
  }

  if (startsOn === "" || endsOn === "") {
    if (startsOn === "") {
      ctx.addIssue({
        code: "custom",
        path: ["confirmationStartsOn"],
        message: WINDOW_PAIR_MESSAGE,
      });
    }

    if (endsOn === "") {
      ctx.addIssue({
        code: "custom",
        path: ["confirmationEndsOn"],
        message: WINDOW_PAIR_MESSAGE,
      });
    }

    return;
  }

  const isStartValid = isValidCalendarDate(startsOn);
  const isEndValid = isValidCalendarDate(endsOn);

  if (!isStartValid) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmationStartsOn"],
      message: "Informe um dia válido",
    });
  }

  if (!isEndValid) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmationEndsOn"],
      message: "Informe um dia válido",
    });
  }

  if (!isStartValid || !isEndValid || !isValidCalendarDate(data.eventDate)) {
    return;
  }

  if (startsOn >= endsOn) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmationStartsOn"],
      message: "A data inicial tem de ser anterior à data final.",
    });
  }

  if (startsOn >= data.eventDate) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmationStartsOn"],
      message: "A data inicial tem de ser anterior à data do evento.",
    });
  }

  if (endsOn >= data.eventDate) {
    ctx.addIssue({
      code: "custom",
      path: ["confirmationEndsOn"],
      message: "A data final tem de ser anterior à data do evento.",
    });
  }
}
