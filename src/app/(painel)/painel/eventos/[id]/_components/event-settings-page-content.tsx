"use client";

import { EventSettingsForm } from "./event-settings-form";
import { settingsFormKey } from "../_lib/settings-form-key";
import type { PainelEvent } from "../_data-access/get-event";

export function EventSettingsPageContent({ event }: { event: PainelEvent }) {
  return (
    <div className="flex max-w-lg flex-col gap-6">
      <h1 className="font-heading text-3xl leading-tight tracking-tight">
        Configurações do evento
      </h1>
      <EventSettingsForm key={settingsFormKey(event)} event={event} />
    </div>
  );
}
