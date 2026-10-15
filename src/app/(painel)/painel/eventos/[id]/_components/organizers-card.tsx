import type { EventOrganizer } from "../_data-access/get-organizers";
import { ProfileAvatar } from "../../../_components/profile-avatar";
import { AddOrganizerForm } from "./add-organizer-form";
import { LeaveEventButton } from "./leave-event-button";
import { RemoveOrganizerButton } from "./remove-organizer-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  canLeaveEvent,
  canManageOrganizers,
  type EventRole,
} from "@/lib/event-roles";

/** Organizadores do evento: o criador inclui e remove; o incluído apenas sai. */
export function OrganizersCard({
  eventId,
  role,
  organizers,
  loadError,
}: {
  eventId: number;
  role: EventRole;
  organizers: EventOrganizer[];
  loadError?: string;
}) {
  const isManager = canManageOrganizers(role);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Organizadores</CardTitle>
          <CardDescription>
            {isManager
              ? "Inclua contas já cadastradas para organizar este evento com você."
              : "Quem organiza este evento."}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {loadError ? (
          <Alert variant="destructive">
            <AlertTitle>Organizadores indisponíveis</AlertTitle>
            <AlertDescription>{loadError}</AlertDescription>
          </Alert>
        ) : (
          <ul className="flex flex-col divide-y divide-border">
            {organizers.map((organizer) => (
              <li
                key={organizer.userId}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <ProfileAvatar
                    src={organizer.imageUrl}
                    alt={organizer.name}
                    className="size-8"
                  />
                  <div className="flex min-w-0 flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-medium">
                      {organizer.name}
                    </span>
                    {organizer.isCreator ? (
                      <Badge variant="secondary">Criador</Badge>
                    ) : null}
                  </div>
                  <span className="truncate text-sm text-muted-foreground">
                    {organizer.email}
                  </span>
                  </div>
                </div>
                {isManager && !organizer.isCreator ? (
                  <RemoveOrganizerButton
                    eventId={eventId}
                    userId={organizer.userId}
                    name={organizer.name}
                  />
                ) : null}
              </li>
            ))}
          </ul>
        )}

        {isManager ? <AddOrganizerForm eventId={eventId} /> : null}
        {canLeaveEvent(role) ? <LeaveEventButton eventId={eventId} /> : null}
      </CardContent>
    </Card>
  );
}
