import Link from "next/link";

import { EventList } from "./_components/event-list";
import { getEvents } from "./_data-access/get-events";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function PainelPage() {
  const { events, error } = await getEvents();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase">
          Painel
        </p>
        <h1 className="font-heading text-3xl leading-none tracking-tight">
          Meus Eventos
        </h1>
        <p className="text-muted-foreground">
          Escolha um evento para ver o link, os dados e as confirmações.
        </p>
      </div>

      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível carregar</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
}
