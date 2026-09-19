import Link from "next/link";
import { notFound } from "next/navigation";

import { EventContent } from "./_components/content";
import { getPainelEvent, parseEventId } from "./_data-access/get-event";
import { getPresences } from "./_data-access/get-presences";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        size="sm"
        className="w-fit"
        render={<Link href="/painel" />}
        nativeButton={false}
      >
        Voltar aos eventos
      </Button>
      <EventContent
        event={event}
        confirmations={presences.confirmations}
        total={presences.total}
        loadError={presences.error}
      />
    </div>
  );
}
