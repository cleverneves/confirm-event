const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function todayInSaoPaulo() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });
}

export function isDateBeforeToday(date: string) {
  return DATE_PATTERN.test(date) && date < todayInSaoPaulo();
}

export function isValidCalendarDate(date: string) {
  if (!DATE_PATTERN.test(date)) {
    return false;
  }

  const [year, month, day] = date.split("-").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day));

  return (
    utc.getUTCFullYear() === year &&
    utc.getUTCMonth() === month - 1 &&
    utc.getUTCDate() === day
  );
}

export function formatEventDate(eventDate: string) {
  const [year, month, day] = eventDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatEventTime(eventTime: string) {
  return eventTime.slice(0, 5);
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Dia da semana por extenso, só com a primeira letra maiúscula (ex.: "Sábado"). */
export function formatInviteWeekday(eventDate: string) {
  const [year, month, day] = eventDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return capitalize(
    new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date)
  );
}

/** Data curta `DD/MM`, sem ano (ex.: "07/11"). */
export function formatInviteShortDate(eventDate: string) {
  const [, month, day] = eventDate.split("-");

  return `${day}/${month}`;
}

/** Horário do convite: "às 14h", "às 14h05", "às 9h", "às 0h30". */
export function formatInviteTime(eventTime: string) {
  const [hours, minutes] = eventTime.split(":").map(Number);
  const formattedMinutes = minutes === 0 ? "" : String(minutes).padStart(2, "0");

  return `às ${hours}h${formattedMinutes}`;
}

/** Linha do convite: "Sábado | 07/11 | às 14h". */
export function formatInviteDateTimeLine(eventDate: string, eventTime: string) {
  return [
    formatInviteWeekday(eventDate),
    formatInviteShortDate(eventDate),
    formatInviteTime(eventTime),
  ].join(" | ");
}

export function formatConfirmationDateTime(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}
