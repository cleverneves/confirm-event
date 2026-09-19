import Link from "next/link";
import { CalendarIcon, MapPinIcon } from "lucide-react";

import { EventEditDialog } from "./event-edit-dialog";
import { EventLink } from "./event-link";
import type { PainelEvent } from "../_data-access/get-event";
import { Card, CardContent } from "@/components/ui/card";
import { formatEventDate, formatEventTime } from "@/lib/event-date";

export function EventHero({ event }: { event: PainelEvent }) {
  return (
    <div className="flex flex-col gap-4">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/painel" className="hover:text-foreground">
          Meus Eventos
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">{event.title}</span>
      </nav>

      <Card>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 flex-col gap-3">
              <p className="flex items-center gap-2 text-sm text-muted-foreground [&_svg]:size-4">
                <CalendarIcon />
                {formatEventDate(event.eventDate)} · {formatEventTime(event.eventTime)}
              </p>
              <h1 className="font-heading text-3xl leading-tight tracking-tight">
                {event.title}
              </h1>
              <p className="flex items-center gap-2 text-muted-foreground [&_svg]:size-4">
                <MapPinIcon />
                {event.location}
              </p>
            </div>
            <EventEditDialog event={event} />
          </div>
          <EventLink eventId={event.id} slug={event.slug} />
        </CardContent>
      </Card>
    </div>
  );
}
