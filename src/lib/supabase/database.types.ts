export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: number;
          title: string;
          details: string | null;
          event_date: string;
          event_time: string;
          location: string;
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          details?: string | null;
          event_date: string;
          event_time: string;
          location: string;
          slug: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          details?: string | null;
          event_date?: string;
          event_time?: string;
          location?: string;
          slug?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      event_slugs: {
        Row: {
          slug: string;
          event_id: number;
        };
        Insert: {
          slug: string;
          event_id: number;
        };
        Update: {
          slug?: string;
          event_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "event_slugs_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
        ];
      };
      confirmations: {
        Row: {
          id: number;
          event_id: number;
          full_name: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          event_id: number;
          full_name: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          event_id?: number;
          full_name?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "confirmations_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
