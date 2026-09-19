import { EventHero } from "./event-hero";
import { EventMetrics } from "./event-metrics";
import { DeleteEvent } from "./delete-event";
import { PresenceList } from "./presence-list";
import type { PainelEvent } from "../_data-access/get-event";
import type { Presence } from "../_data-access/get-presences";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function EventContent({
  event,
  confirmations,
  total,
  confirmedLast24h,
  loadError,
}: {
  event: PainelEvent;
  confirmations: Presence[];
  total: number;
  confirmedLast24h: number;
  loadError?: string;
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
        <>
          <EventMetrics total={total} confirmedLast24h={confirmedLast24h} />
          <PresenceList
            eventId={event.id}
            confirmations={confirmations}
            total={total}
          />
        </>
      )}

      <DeleteEvent eventId={event.id} />
    </div>
  );
}
