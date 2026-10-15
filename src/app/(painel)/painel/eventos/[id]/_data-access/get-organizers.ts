import { requireOrganizer } from "@/lib/auth/require-organizer";
import { organizerDisplayName } from "@/lib/organizer-display";

export type EventOrganizer = {
  userId: string;
  email: string;
  /** Nome e sobrenome gravados no perfil; o e-mail quando o perfil não tem os dois. */
  name: string;
  isCreator: boolean;
};

export type OrganizersResult = {
  organizers: EventOrganizer[];
  error?: string;
};

/** Criador (primeiro) e organizadores incluídos. Só responde a quem organiza o evento. */
export async function getEventOrganizers(
  eventId: number
): Promise<OrganizersResult> {
  const { supabase } = await requireOrganizer();

  try {
    const { data, error } = await supabase.rpc("list_event_organizers", {
      p_event_id: eventId,
    });

    if (error) {
      return {
        organizers: [],
        error: "Não foi possível carregar os organizadores.",
      };
    }

    return {
      organizers: (data ?? []).map((organizer) => ({
        userId: organizer.member_user_id,
        email: organizer.member_email,
        name: organizerDisplayName({
          firstName: organizer.first_name,
          lastName: organizer.last_name,
          email: organizer.member_email,
        }),
        isCreator: organizer.is_creator,
      })),
    };
  } catch {
    return {
      organizers: [],
      error: "Não foi possível carregar os organizadores.",
    };
  }
}
