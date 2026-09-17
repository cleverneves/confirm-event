import type { Party, PersonRole } from "@/lib/supabase/database.types";

export const PARTY_LABEL: Record<Party, string> = {
  mariana: "Festa da Mariana",
  victor: "Festa do Victor",
};

export const ROLE_LABEL: Record<PersonRole, string> = {
  titular: "Quem confirmou",
  acompanhante: "Acompanhante",
};

export function isParty(value: string | undefined): value is Party {
  return value === "mariana" || value === "victor";
}
