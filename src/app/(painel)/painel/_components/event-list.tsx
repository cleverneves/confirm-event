import Link from "next/link";

import type { EventListItem } from "../_data-access/get-events";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { formatEventDate } from "@/lib/event-date";

export function EventList({ events }: { events: EventListItem[] }) {
  if (events.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyTitle>Nenhum evento ainda</EmptyTitle>
          <EmptyDescription>
            Crie o primeiro evento para gerar o link de confirmação.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button render={<Link href="/painel/eventos/novo" />} nativeButton={false}>
            Criar evento
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {events.map((event) => (
        <li key={event.id}>
          <Link
            href={`/painel/eventos/${event.id}`}
            className="flex flex-col gap-1 rounded-xl border border-border/80 bg-card px-4 py-3 hover:bg-muted/40"
          >
            <p className="font-heading text-lg leading-none">{event.title}</p>
            <p className="text-sm text-muted-foreground">
              {formatEventDate(event.eventDate)}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
