import { EventHero } from "./event-hero";
import { EventMetrics } from "./event-metrics";
import { DeleteEvent } from "./delete-event";
import { OrganizersCard } from "./organizers-card";
import type { PainelEvent } from "../_data-access/get-event";
import type { EventOrganizer } from "../_data-access/get-organizers";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { canDeleteEvent } from "@/lib/event-roles";

export function EventContent({
  event,
  total,
  confirmedLast24h,
  loadError,
  organizers,
  organizersLoadError,
}: {
  event: PainelEvent;
  total: number;
  confirmedLast24h: number;
  loadError?: string;
  organizers: EventOrganizer[];
  organizersLoadError?: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      <EventHero event={event} />

      {loadError ? (
        <Alert variant="destructive">
          <AlertTitle>Presenças indisponíveis</AlertTitle>
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
      ) : (
        <EventMetrics total={total} confirmedLast24h={confirmedLast24h} />
      )}

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
