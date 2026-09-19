import { ConfirmationForm } from "./confirmation-form";
import type { PublicEvent } from "../_data-access/get-event-by-slug";
import { formatEventDate, formatEventTime } from "@/lib/event-date";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="font-heading text-lg">{value}</dd>
    </div>
  );
}

export function PublicContent({
  event,
  slug,
}: {
  event: PublicEvent;
  slug: string;
}) {
  const details = event.details?.trim();

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-4 text-center">
        <p className="text-sm text-muted-foreground">Confirmação de presença</p>
        <h1 className="font-heading text-5xl leading-none tracking-tight sm:text-6xl">
          {event.title}
        </h1>
        {details ? (
          <p className="mx-auto max-w-sm text-muted-foreground">{details}</p>
        ) : null}
      </header>

      <dl className="grid gap-4 border-y border-border py-6 sm:grid-cols-3">
        <Detail label="Data" value={formatEventDate(event.eventDate)} />
        <Detail label="Horário" value={formatEventTime(event.eventTime)} />
        <Detail label="Local" value={event.location} />
      </dl>

      <ConfirmationForm slug={slug} />
    </main>
  );
}

export function UnavailableEvent() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-4 px-6 py-16 text-center">
      <h1 className="font-heading text-3xl leading-none">Evento indisponível</h1>
      <p className="text-muted-foreground">
        Este evento não está disponível. Confira o link com quem organizou.
      </p>
    </main>
  );
}
