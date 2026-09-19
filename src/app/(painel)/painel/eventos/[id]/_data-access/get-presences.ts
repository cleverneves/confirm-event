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
      confirmedLast24h: number;
      error?: undefined;
    }
  | {
      confirmations: Presence[];
      total: number;
      confirmedLast24h: number;
      error: string;
    };

const DAY_MS = 24 * 60 * 60 * 1000;

export async function getPresences(eventId: number): Promise<PresencesResult> {
  const { supabase } = await requireOrganizer();

  try {
    const { data, error } = await supabase
      .from("confirmations")
      .select("id, full_name, created_at")
      .eq("event_id", eventId)
      .order("created_at", { ascending: false });

    if (error) {
      return {
        confirmations: [],
        total: 0,
        confirmedLast24h: 0,
        error: "Não foi possível obter as presenças.",
      };
    }

    const confirmations = (data ?? []).map((row) => ({
      id: row.id,
      fullName: row.full_name,
      createdAt: row.created_at,
    }));

    const cutoff = new Date(Date.now() - DAY_MS).toISOString();
    const confirmedLast24h = confirmations.filter(
      (confirmation) => confirmation.createdAt >= cutoff
    ).length;

    return {
      confirmations,
      total: confirmations.length,
      confirmedLast24h,
    };
  } catch {
    return {
      confirmations: [],
      total: 0,
      confirmedLast24h: 0,
      error: "Não foi possível obter as presenças.",
    };
  }
}
