import { notFound } from "next/navigation";

import { EventSettingsPageContent } from "../_components/event-settings-page-content";
import { getPainelEvent, parseEventId } from "../_data-access/get-event";

export default async function EventSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const eventId = parseEventId(id);

  if (!eventId) {
    notFound();
  }

  const event = await getPainelEvent(eventId);

  if (!event) {
    notFound();
  }

  return <EventSettingsPageContent event={event} />;
}
