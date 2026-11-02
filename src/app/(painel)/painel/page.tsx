import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { EventList } from "./_components/event-list";
import { getEvents } from "./_data-access/get-events";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default async function PainelPage() {
  const { events, error } = await getEvents();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase">
          Painel
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-heading text-3xl leading-none tracking-tight">
            Meus Eventos
          </h1>
          <Button
            render={<Link href="/painel/eventos/novo" />}
            nativeButton={false}
            className="shrink-0"
          >
            <PlusIcon data-icon="inline-start" />
            Novo Evento
          </Button>
        </div>
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
