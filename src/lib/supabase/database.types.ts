export type Party = "mariana" | "victor";
export type PersonRole = "titular" | "acompanhante";

export type ConfirmPresenceResult = {
  ok: boolean;
  code?: "same_party" | "other_party" | "duplicate_in_payload" | "invalid";
  name?: string;
  is_companion?: boolean;
};

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: number;
          event_date: string | null;
          event_time: string | null;
          location: string | null;
          updated_at: string;
        };
        Insert: {
          id?: number;
          event_date?: string | null;
          event_time?: string | null;
          location?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: number;
          event_date?: string | null;
          event_time?: string | null;
          location?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      confirmations: {
        Row: {
          id: number;
          party: Party;
          created_at: string;
        };
        Insert: {
          id?: number;
          party: Party;
          created_at?: string;
        };
        Update: {
          id?: number;
          party?: Party;
          created_at?: string;
        };
        Relationships: [];
      };
      people: {
        Row: {
          id: number;
          confirmation_id: number;
          first_name: string;
          last_name: string;
          party: Party;
          role: PersonRole;
          name_key: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          confirmation_id: number;
          first_name: string;
          last_name: string;
          party: Party;
          role: PersonRole;
          created_at?: string;
        };
        Update: {
          id?: number;
          confirmation_id?: number;
          first_name?: string;
          last_name?: string;
          party?: Party;
          role?: PersonRole;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      confirm_presence: {
        Args: {
          p_party: Party;
          p_titular: { first_name: string; last_name: string };
          p_companions?: { first_name: string; last_name: string }[];
        };
        Returns: ConfirmPresenceResult;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
