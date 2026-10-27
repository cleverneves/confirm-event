"use client";

import { useState } from "react";
import { SettingsIcon } from "lucide-react";

import { EventSettingsForm } from "./event-settings-form";
import type { PainelEvent } from "../_data-access/get-event";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function settingsFormKey(event: PainelEvent) {
  return [
    event.pageLayout,
    event.hasIllustration,
    event.maxGuestCapacity ?? "",
    event.confirmationStartsOn ?? "",
    event.confirmationEndsOn ?? "",
  ].join("-");
}

export function EventSettingsDialog({ event }: { event: PainelEvent }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <SettingsIcon data-icon="inline-start" />
        Configurações
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Configurações do evento</DialogTitle>
        </DialogHeader>
        {open ? (
          <EventSettingsForm
            key={settingsFormKey(event)}
            event={event}
            onSuccess={() => setOpen(false)}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
