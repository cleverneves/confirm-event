"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";

import { updateEventAction } from "../_actions/update-event";
import { EventFieldsForm } from "../../../_components/event-fields-form";
import type { PainelEvent } from "../_data-access/get-event";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatEventTime } from "@/lib/event-date";

export function EventEditDialog({ event }: { event: PainelEvent }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <PencilIcon data-icon="inline-start" />
        Editar Dados do Evento
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar dados do evento</DialogTitle>
          <DialogDescription>
            O que estiver gravado aparece na página pública deste evento.
          </DialogDescription>
        </DialogHeader>
        <EventFieldsForm
          key={`${event.title}-${event.eventDate}-${event.eventTime}-${event.location}-${event.details ?? ""}`}
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
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
