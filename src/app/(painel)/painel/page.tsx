import { PainelContent } from "./_components/content";
import { getPresences } from "./_data-access/get-presences";
import { getEvent } from "@/app/_data-access/get-event";
import { isParty } from "@/lib/party";

export default async function PainelPage({
  searchParams,
}: {
  searchParams: Promise<{ festa?: string | string[] }>;
}) {
  const params = await searchParams;
  const festaParam = Array.isArray(params.festa)
    ? params.festa[0]
    : params.festa;
  const filter = isParty(festaParam) ? festaParam : "todas";

  const [event, presences] = await Promise.all([getEvent(), getPresences()]);

  return (
    <PainelContent
      event={event}
      people={presences.people}
      totals={presences.totals}
      filter={filter}
      loadError={presences.error}
    />
  );
}
