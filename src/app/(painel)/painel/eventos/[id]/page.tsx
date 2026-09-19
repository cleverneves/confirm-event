import { notFound } from "next/navigation";

import { EventContent } from "./_components/content";
import { getPainelEvent, parseEventId } from "./_data-access/get-event";
import { getPresences } from "./_data-access/get-presences";

export default async function EventPage({
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

  return (
    <EventContent
      event={event}
      confirmations={presences.confirmations}
      total={presences.total}
      confirmedLast24h={presences.confirmedLast24h}
      loadError={presences.error}
    />
  );
}
