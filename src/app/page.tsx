import { PublicContent } from "./_components/content";
import { getEvent } from "./_data-access/get-event";

export default async function HomePage() {
  const event = await getEvent();

  return <PublicContent event={event} />;
}
