import { EventForm } from "./event-form";
import { EventLink } from "./event-link";
import { DeleteEvent } from "./delete-event";
import { PresenceList } from "./presence-list";
import type { PainelEvent } from "../_data-access/get-event";
import type { Presence } from "../_data-access/get-presences";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function EventContent({
  event,
  confirmations,
  total,
  loadError,
}: {
  event: PainelEvent;
  confirmations: Presence[];
  total: number;
  loadError?: string;
}) {
  return (
    <div className="flex flex-col gap-8">
      <EventForm event={event} />
      <EventLink eventId={event.id} slug={event.slug} />

      {loadError ? (
        <Alert variant="destructive">
          <AlertTitle>Presenças indisponíveis</AlertTitle>
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
      ) : (
        <PresenceList
          eventId={event.id}
          confirmations={confirmations}
          total={total}
        />
      )}

      <DeleteEvent eventId={event.id} />
    </div>
  );
}
