import { formatEventDate, todayInSaoPaulo } from "@/lib/event-date";

export type ConfirmationCalendarReason =
  | "open"
  | "before_start"
  | "end_reached"
  | "event_day_reached";

export type ConfirmationReason =
  | ConfirmationCalendarReason
  | "manual";

export type ConfirmationResolution = {
  status: "open" | "closed";
  calendarOpen: boolean;
  calendarReason: ConfirmationCalendarReason;
  lastOpenDay: string;
  closedByOrganizer: boolean;
  canCloseNow: boolean;
  canReactivate: boolean;
  reason: ConfirmationReason;
};

export type ConfirmationEventFields = {
  eventDate: string;
  confirmationStartsOn: string | null;
  confirmationEndsOn: string | null;
  confirmationManuallyClosed: boolean;
};

export function previousCalendarDay(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day));
  utc.setUTCDate(utc.getUTCDate() - 1);
  return utc.toISOString().slice(0, 10);
}

export function resolveConfirmation({
  today,
  eventDate,
  startsOn,
  endsOn,
  manuallyClosed,
}: {
  today: string;
  eventDate: string;
  startsOn: string | null;
  endsOn: string | null;
  manuallyClosed: boolean;
}): ConfirmationResolution {
  const lastOpenDay = previousCalendarDay(endsOn ?? eventDate);
  let calendarReason: ConfirmationCalendarReason = "open";

  if (today >= eventDate) {
    calendarReason = "event_day_reached";
  } else if (startsOn && today < startsOn) {
    calendarReason = "before_start";
  } else if (endsOn && today >= endsOn) {
    calendarReason = "end_reached";
  }

  const calendarOpen = calendarReason === "open";
  const closedByOrganizer = manuallyClosed && calendarOpen;
  const status = calendarOpen && !manuallyClosed ? "open" : "closed";

  return {
    status,
    calendarOpen,
    calendarReason,
    lastOpenDay,
    closedByOrganizer,
    canCloseNow: status === "open",
    canReactivate: status === "closed",
    reason: closedByOrganizer ? "manual" : calendarReason,
  };
}

export function confirmationPanelMessage(
  resolution: ConfirmationResolution,
  startsOn: string | null
) {
  switch (resolution.reason) {
    case "open":
      return `A confirmação está aberta até ${formatEventDate(resolution.lastOpenDay)}.`;
    case "manual":
      return `Você encerrou a confirmação. Ainda dá para reativar até ${formatEventDate(resolution.lastOpenDay)}.`;
    case "before_start":
      return `A confirmação ainda não abriu. Ela abre em ${formatEventDate(startsOn ?? "")}.`;
    case "end_reached":
      return "A confirmação está encerrada. O prazo já passou.";
    case "event_day_reached":
      return "A confirmação está encerrada. O prazo é o dia do evento e ele já chegou.";
  }
}

export function resolveEventConfirmation(
  event: ConfirmationEventFields,
  today = todayInSaoPaulo()
) {
  const confirmation = resolveConfirmation({
    today,
    eventDate: event.eventDate,
    startsOn: event.confirmationStartsOn,
    endsOn: event.confirmationEndsOn,
    manuallyClosed: event.confirmationManuallyClosed,
  });

  return {
    confirmation,
    confirmationMessage: confirmationPanelMessage(
      confirmation,
      event.confirmationStartsOn
    ),
  };
}
