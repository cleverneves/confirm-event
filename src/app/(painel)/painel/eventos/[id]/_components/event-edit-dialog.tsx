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
        Editar
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar evento</DialogTitle>
        </DialogHeader>
        {open ? (
          <EventFieldsForm
            key={`${event.title}-${event.eventDate}-${event.eventTime}-${event.venueName ?? ""}-${event.address}-${event.details ?? ""}`}
            mode="occasion"
            defaultValues={{
              title: event.title,
              details: event.details ?? "",
              eventDate: event.eventDate,
              eventTime: formatEventTime(event.eventTime),
              venueName: event.venueName ?? "",
              address: event.address,
            }}
            currentDate={event.eventDate}
            submitLabel="Salvar"
            onSubmit={(formData) => updateEventAction(event.id, formData)}
            onSuccess={() => setOpen(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
