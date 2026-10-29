import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { EventSection } from "./_components/event-section";
import { getPainelEvent, parseEventId } from "./_data-access/get-event";

export default async function EventIdLayout({
  children,
  params,
}: {
  children: ReactNode;
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

  return (
    <EventSection key={event.id} event={event}>
      {children}
    </EventSection>
  );
}
