import { requireOrganizer } from "@/lib/auth/require-organizer";
import type { Party, PersonRole } from "@/lib/supabase/database.types";

export type PresencePerson = {
  id: number;
  firstName: string;
  lastName: string;
  party: Party;
  role: PersonRole;
};

export type PresenceTotals = {
  geral: number;
  mariana: number;
  victor: number;
};

export type PresencesResult =
  | {
      people: PresencePerson[];
      totals: PresenceTotals;
      error?: undefined;
    }
  | {
      people: PresencePerson[];
      totals: null;
      error: string;
    };

export async function getPresences(): Promise<PresencesResult> {
  const { supabase } = await requireOrganizer();

  try {
    const { data, error } = await supabase
      .from("people")
      .select("id, first_name, last_name, party, role")
      .order("first_name", { ascending: true })
      .order("last_name", { ascending: true });

    if (error) {
      return {
        people: [],
        totals: null,
        error: "Não foi possível obter as presenças.",
      };
    }

    const people: PresencePerson[] = (data ?? []).map((person) => ({
      id: person.id,
      firstName: person.first_name,
      lastName: person.last_name,
      party: person.party,
      role: person.role,
    }));

    return {
      people,
      totals: {
        geral: people.length,
        mariana: people.filter((person) => person.party === "mariana").length,
        victor: people.filter((person) => person.party === "victor").length,
      },
    };
  } catch {
    return {
      people: [],
      totals: null,
      error: "Não foi possível obter as presenças.",
    };
  }
}
