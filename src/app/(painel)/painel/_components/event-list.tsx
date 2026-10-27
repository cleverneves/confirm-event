import Link from "next/link";

import type { EventListItem } from "../_data-access/get-events";
import { EventPlace } from "./event-place";
import { EventIllustration } from "@/components/event-illustration";
import { ConfirmationStatusBadge } from "./confirmation-status-badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { formatEventDate, formatEventTime } from "@/lib/event-date";
import { PageLayoutMark } from "./page-layout-mark";
import { illustrationAspect, pageLayoutLabel } from "@/lib/event-illustration";
import { cn } from "@/lib/utils";

function formatConfirmedCount(total: number, maxGuestCapacity: number | null) {
  const confirmed = total === 1 ? "1 confirmado" : `${total} confirmados`;

  return maxGuestCapacity === null
    ? confirmed
    : `${confirmed} de ${maxGuestCapacity}`;
}

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
    <ul className="flex flex-col gap-4">
      {events.map((event) => (
        <li key={event.id}>
          <Link
            href={`/painel/eventos/${event.id}`}
            className="flex flex-col gap-3 rounded-lg bg-card p-5 shadow-panel ring-1 ring-muted-foreground/20 transition-shadow hover:shadow-elevated"
          >
            <div className="flex items-center gap-3">
              {event.imageUrl ? (
                <EventIllustration
                  src={event.imageUrl}
                  alt=""
                  aspect={illustrationAspect(event.pageLayout)}
                  className={cn(
                    "shrink-0 rounded-sm",
                    event.pageLayout === "image_only" ? "w-9" : "w-24"
                  )}
                />
              ) : null}
              <p className="flex min-w-0 flex-wrap items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <span>Layout:</span>
                <PageLayoutMark layout={event.pageLayout} size="list" />
                <span>{pageLayoutLabel(event.pageLayout)}</span>
              </p>
            </div>
            <div className="flex items-start justify-between gap-3">
              <p className="font-heading text-xl leading-none tracking-tight">
                {event.title}
              </p>
              <ConfirmationStatusBadge isOpen={event.confirmationOpen} />
            </div>
            {event.creatorName ? (
              <p className="text-sm text-muted-foreground">
                criado por: {event.creatorName}
              </p>
            ) : null}
            {event.confirmedCount === null ? (
              <p className="text-sm text-muted-foreground">
                Quantidade indisponível
              </p>
            ) : (
              <p className="text-sm font-medium text-success">
                {formatConfirmedCount(
                  event.confirmedCount,
                  event.maxGuestCapacity
                )}
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              {formatEventDate(event.eventDate)} · {formatEventTime(event.eventTime)}
            </p>
            <EventPlace
              venueName={event.venueName}
              address={event.address}
              className="text-sm text-muted-foreground"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
