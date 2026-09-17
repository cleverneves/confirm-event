import { ConfirmationForm } from "./confirmation-form";
import {
  formatEventDate,
  formatEventTime,
  isEventPublished,
  type EventDetails,
} from "@/app/_data-access/get-event";

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="font-heading text-lg">{value}</dd>
    </div>
  );
}

export function PublicContent({ event }: { event: EventDetails | null }) {
  const published = event ? isEventPublished(event) : false;

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-6 text-center">
        <p className="text-sm text-muted-foreground">Uma festa, duas listas</p>
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-6xl leading-none tracking-tight sm:text-7xl">
            Mariana
          </h1>
          <p className="font-heading text-xl italic text-victor">
            e
          </p>
          <h1 className="font-heading text-6xl leading-none tracking-tight sm:text-7xl">
            Victor
          </h1>
        </div>
        <p className="mx-auto max-w-sm text-muted-foreground">
          Confirmam o aniversário no mesmo lugar e horário. Escolha de quem é o
          convite e diga quem vai.
        </p>
      </header>

      <dl className="grid gap-4 border-y border-border py-6 sm:grid-cols-3">
        <Detail
          label="Dia"
          value={
            published && event?.eventDate
              ? formatEventDate(event.eventDate)
              : "a definir"
          }
        />
        <Detail
          label="Horário"
          value={
            published && event?.eventTime
              ? formatEventTime(event.eventTime)
              : "a definir"
          }
        />
        <Detail
          label="Local"
          value={published && event?.location ? event.location : "a definir"}
        />
      </dl>

      <ConfirmationForm />
    </main>
  );
}
