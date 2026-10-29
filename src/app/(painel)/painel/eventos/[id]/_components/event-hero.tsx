import { CalendarIcon, ClockIcon, TriangleAlertIcon } from "lucide-react";

import { EventEditDialog } from "./event-edit-dialog";
import { EventPlace } from "../../../_components/event-place";
import { EventLink } from "./event-link";
import { EventSettingsLink } from "./event-settings-link";
import type { PainelEvent } from "../_data-access/get-event";
import { ConfirmationStatusBadge } from "../../../_components/confirmation-status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatEventDate, formatEventTime } from "@/lib/event-date";

export function EventHero({ event }: { event: PainelEvent }) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-heading text-3xl leading-tight tracking-tight">
                {event.title}
              </h1>
              <ConfirmationStatusBadge
                isOpen={event.confirmation.status === "open"}
              />
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
              className="text-muted-foreground"
            />
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <EventEditDialog event={event} />
            <EventSettingsLink eventId={event.id} />
          </div>
        </div>
        <EventLink slug={event.slug} />
        <div className="border-t border-border pt-6">
          <p className="flex min-w-0 items-start gap-2 text-sm text-muted-foreground [&_svg]:size-4 [&_svg]:shrink-0">
            <TriangleAlertIcon aria-hidden="true" />
            {event.confirmationMessage}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
