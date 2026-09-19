import { requireOrganizer } from "@/lib/auth/require-organizer";

export type Presence = {
  id: number;
  fullName: string;
  createdAt: string;
};

export type PresencesResult =
  | {
      confirmations: Presence[];
      total: number;
      error?: undefined;
    }
  | {
      confirmations: Presence[];
      total: number;
      error: string;
    };

export async function getPresences(eventId: number): Promise<PresencesResult> {
  const { supabase } = await requireOrganizer();

  try {
    const { data, error } = await supabase
      .from("confirmations")
      .select("id, full_name, created_at")
      .eq("event_id", eventId)
      .order("created_at", { ascending: true });

    if (error) {
      return {
        confirmations: [],
        total: 0,
        error: "Não foi possível obter as presenças.",
      };
    }

    const confirmations = (data ?? []).map((row) => ({
      id: row.id,
      fullName: row.full_name,
      createdAt: row.created_at,
    }));

    return {
      confirmations,
      total: confirmations.length,
    };
  } catch {
    return {
      confirmations: [],
      total: 0,
      error: "Não foi possível obter as presenças.",
    };
  }
}
