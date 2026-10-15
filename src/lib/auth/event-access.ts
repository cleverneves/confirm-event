import { requireOrganizer } from "@/lib/auth/require-organizer";
import type { EventRole } from "@/lib/event-roles";

export {
  canDeleteEvent,
  NO_EVENT_ACCESS_MESSAGE,
  type EventRole,
} from "@/lib/event-roles";

type OrganizerSupabase = Awaited<ReturnType<typeof requireOrganizer>>["supabase"];

/** Papel da conta no evento, ou `null` quando ela não organiza (ou o evento não existe). */
export async function getEventRole(
  supabase: OrganizerSupabase,
  userId: string,
  eventId: number
): Promise<EventRole | null> {
  const { data: event, error } = await supabase
    .from("events")
    .select("created_by")
    .eq("id", eventId)
    .maybeSingle();

  if (error || !event) {
    return null;
  }

  if (event.created_by === null) {
    return "legacy";
  }

  if (event.created_by === userId) {
    return "creator";
  }

  const { data: membership } = await supabase
    .from("event_organizers")
    .select("user_id")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .maybeSingle();

  return membership ? "organizer" : null;
}

/** Exige sessão e devolve o papel da conta no evento (`null` quando ela não organiza). */
export async function requireEventAccess(eventId: number) {
  const { user, supabase } = await requireOrganizer();
  const role = await getEventRole(supabase, user.id, eventId);

  return { user, supabase, role };
}
