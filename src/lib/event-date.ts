const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function todayInSaoPaulo() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "America/Sao_Paulo",
  });
}

export function isDateBeforeToday(date: string) {
  return DATE_PATTERN.test(date) && date < todayInSaoPaulo();
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

export function formatConfirmationDateTime(iso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(iso));
}
