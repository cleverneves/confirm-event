import { notFound } from "next/navigation";

import { PresenceList } from "../_components/presence-list";
import { getPainelEvent, parseEventId } from "../_data-access/get-event";
import { getPresences } from "../_data-access/get-presences";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function EventGuestsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = parseEventId(id);

  if (!eventId) {
    notFound();
  }

  const [event, presences] = await Promise.all([
    getPainelEvent(eventId),
    getPresences(eventId),
  ]);

  if (!event) {
    notFound();
  }

  if (presences.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Presenças indisponíveis</AlertTitle>
        <AlertDescription>{presences.error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <PresenceList
      eventId={event.id}
      confirmations={presences.confirmations}
      total={presences.total}
    />
  );
}
