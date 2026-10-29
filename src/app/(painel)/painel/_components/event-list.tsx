import Link from "next/link";
import { CalendarIcon, ClockIcon, UserRoundCheckIcon } from "lucide-react";

import type { EventListItem } from "../_data-access/get-events";
import { EventPlace } from "./event-place";
import { EventListThumbnail } from "./event-list-thumbnail";
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
            <div className="flex items-start gap-3">
              <EventListThumbnail
                imageUrl={event.imageUrl}
                pageLayout={event.pageLayout}
              />
              <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                <p className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1">
                  <span className="font-heading text-xl leading-none tracking-tight">
                    {event.title}
                  </span>
                  <span
                    className="text-sm text-muted-foreground"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                  {event.confirmedCount === null ? (
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <UserRoundCheckIcon
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      Quantidade indisponível
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
                      <UserRoundCheckIcon
                        className="size-4 shrink-0"
                        aria-hidden="true"
                      />
                      {formatConfirmedCount(
                        event.confirmedCount,
                        event.maxGuestCapacity
                      )}
                    </span>
                  )}
                </p>
                <ConfirmationStatusBadge
                  isOpen={event.confirmationOpen}
                  className="shrink-0"
                />
              </div>
            </div>
            <p className="flex min-w-0 items-start gap-2 text-sm text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
              <CalendarIcon aria-hidden="true" />
              {formatEventDate(event.eventDate)}
            </p>
            <p className="flex min-w-0 items-start gap-2 text-sm text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
              <ClockIcon aria-hidden="true" />
              {formatEventTime(event.eventTime)}
            </p>
            <EventPlace
              venueName={event.venueName}
              address={event.address}
              variant="inline"
              className="text-sm text-muted-foreground"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
