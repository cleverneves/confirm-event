import Link from "next/link";

import { EventList } from "./_components/event-list";
import { getEvents } from "./_data-access/get-events";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default async function PainelPage() {
  const { events, error } = await getEvents();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-3xl leading-none">Eventos</h1>
          <p className="text-muted-foreground">
            Escolha um evento para ver o link, os dados e as confirmações.
          </p>
        </div>
        {events.length > 0 ? (
          <Button render={<Link href="/painel/eventos/novo" />} nativeButton={false}>
            Criar evento
          </Button>
        ) : null}
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
