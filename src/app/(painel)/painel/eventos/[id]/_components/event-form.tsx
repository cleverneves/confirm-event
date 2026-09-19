"use client";

import { updateEventAction } from "../_actions/update-event";
import { EventFieldsForm } from "../../../_components/event-fields-form";
import type { PainelEvent } from "../_data-access/get-event";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatEventTime } from "@/lib/event-date";

export function EventForm({ event }: { event: PainelEvent }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados do evento</CardTitle>
        <CardDescription>
          O que estiver gravado aparece na página pública deste evento.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EventFieldsForm
          defaultValues={{
            title: event.title,
            details: event.details ?? "",
            eventDate: event.eventDate,
            eventTime: formatEventTime(event.eventTime),
            location: event.location,
          }}
          currentDate={event.eventDate}
          submitLabel="Salvar"
          onSubmit={(values) => updateEventAction(event.id, values)}
        />
      </CardContent>
    </Card>
  );
}
