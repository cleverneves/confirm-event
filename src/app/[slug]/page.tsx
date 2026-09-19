import { redirect } from "next/navigation";

import { PublicContent, UnavailableEvent } from "./_components/content";
import { getPublicEvent } from "./_data-access/get-event-by-slug";

export default async function PublicEventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getPublicEvent(slug);

  if (!event) {
    return <UnavailableEvent />;
  }

  if (event.currentSlug !== slug) {
    redirect(`/${event.currentSlug}`);
  }

  return <PublicContent event={event} slug={event.currentSlug} />;
}
