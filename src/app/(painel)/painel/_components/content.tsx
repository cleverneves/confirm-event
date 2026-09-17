import { EventForm } from "./event-form";
import { PresenceList } from "./presence-list";
import { Totals } from "./totals";
import type { EventDetails } from "@/app/_data-access/get-event";
import type {
  PresencePerson,
  PresenceTotals,
} from "../_data-access/get-presences";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Party } from "@/lib/supabase/database.types";

export function PainelContent({
  event,
  people,
  totals,
  filter,
  loadError,
}: {
  event: EventDetails | null;
  people: PresencePerson[];
  totals: PresenceTotals | null;
  filter: "todas" | Party;
  loadError?: string;
}) {
  return (
    <div className="flex flex-col gap-10">
      <EventForm event={event} />

      {loadError || !totals ? (
        <Alert variant="destructive">
          <AlertTitle>Presenças indisponíveis</AlertTitle>
          <AlertDescription>
            {loadError ?? "Não foi possível obter as presenças."}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="flex flex-col gap-6">
          <Totals totals={totals} />
          <PresenceList people={people} filter={filter} />
        </div>
      )}
    </div>
  );
}
