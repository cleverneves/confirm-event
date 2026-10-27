import Link from "next/link";
import { CalendarIcon } from "lucide-react";

import { EventEditDialog } from "./event-edit-dialog";
import { EventPlace } from "../../../_components/event-place";
import { EventLink } from "./event-link";
import { EventSettingsDialog } from "./event-settings-dialog";
import type { PainelEvent } from "../_data-access/get-event";
import { ConfirmationStatusBadge } from "../../../_components/confirmation-status-badge";
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
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="font-heading text-3xl leading-tight tracking-tight">
                  {event.title}
                </h1>
                <ConfirmationStatusBadge
                  isOpen={event.confirmation.status === "open"}
                />
              </div>
              <EventPlace
                venueName={event.venueName}
                address={event.address}
                className="text-muted-foreground"
              />
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <EventEditDialog event={event} />
              <EventSettingsDialog event={event} />
            </div>
          </div>
          <EventLink slug={event.slug} />
          <div className="border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">
              {event.confirmationMessage}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
