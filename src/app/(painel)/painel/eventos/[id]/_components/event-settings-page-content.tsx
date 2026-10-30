"use client";

import { DeleteEvent } from "./delete-event";
import { EventSettingsForm } from "./event-settings-form";
import { OrganizersCard } from "./organizers-card";
import { settingsFormKey } from "../_lib/settings-form-key";
import type { PainelEvent } from "../_data-access/get-event";
import type { EventOrganizer } from "../_data-access/get-organizers";
import { canDeleteEvent } from "@/lib/event-roles";

export function EventSettingsPageContent({
  event,
  organizers,
  organizersLoadError,
}: {
  event: PainelEvent;
  organizers: EventOrganizer[];
  organizersLoadError?: string;
}) {
  return (
    <div className="flex max-w-lg flex-col gap-6">
      <h1 className="font-heading text-3xl leading-tight tracking-tight">
        Configurações do evento
      </h1>
      <EventSettingsForm key={settingsFormKey(event)} event={event} />
      <OrganizersCard
        eventId={event.id}
        role={event.viewerRole}
        organizers={organizers}
        loadError={organizersLoadError}
      />
      {canDeleteEvent(event.viewerRole) ? (
        <DeleteEvent eventId={event.id} />
      ) : null}
    </div>
  );
}
