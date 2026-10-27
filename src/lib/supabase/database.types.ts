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
          address: string;
          venue_name: string | null;
          slug: string;
          confirmation_starts_on: string | null;
          confirmation_ends_on: string | null;
          confirmation_manually_closed: boolean;
          background_color_1: string | null;
          background_color_2: string | null;
          title_color: string | null;
          text_color: string | null;
          illustration: string | null;
          illustration_content_type: string | null;
          page_layout: string;
          background_mode: string;
          blur_level: number | null;
          max_guest_capacity: number | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          details?: string | null;
          event_date: string;
          event_time: string;
          address: string;
          venue_name: string | null;
          slug: string;
          confirmation_starts_on?: string | null;
          confirmation_ends_on?: string | null;
          confirmation_manually_closed?: boolean;
          background_color_1?: string | null;
          background_color_2?: string | null;
          title_color?: string | null;
          text_color?: string | null;
          illustration?: string | null;
          illustration_content_type?: string | null;
          page_layout?: string;
          background_mode?: string;
          blur_level?: number | null;
          max_guest_capacity?: number | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          details?: string | null;
          event_date?: string;
          event_time?: string;
          address?: string;
          venue_name?: string | null;
          slug?: string;
          confirmation_starts_on?: string | null;
          confirmation_ends_on?: string | null;
          confirmation_manually_closed?: boolean;
          background_color_1?: string | null;
          background_color_2?: string | null;
          title_color?: string | null;
          text_color?: string | null;
          illustration?: string | null;
          illustration_content_type?: string | null;
          page_layout?: string;
          background_mode?: string;
          blur_level?: number | null;
          max_guest_capacity?: number | null;
          created_by?: string | null;
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
      event_organizers: {
        Row: {
          event_id: number;
          user_id: string;
          created_at: string;
        };
        Insert: {
          event_id: number;
          user_id: string;
          created_at?: string;
        };
        Update: {
          event_id?: number;
          user_id?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "event_organizers_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
        ];
      };
      organizer_profiles: {
        Row: {
          user_id: string;
          first_name: string;
          last_name: string;
          phone: string | null;
          company: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          first_name: string;
          last_name: string;
          phone?: string | null;
          company?: string | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          first_name?: string;
          last_name?: string;
          phone?: string | null;
          company?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      organizer_profile_images: {
        Row: {
          user_id: string;
          image: string;
          content_type: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          image: string;
          content_type: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          image?: string;
          content_type?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      add_event_organizer: {
        Args: { p_event_id: number; p_email: string };
        Returns: string;
      };
      can_manage_event: {
        Args: { p_event_id: number };
        Returns: boolean;
      };
      event_creator_labels: {
        Args: { p_event_ids: number[] };
        Returns: {
          label_event_id: number;
          creator_email: string;
          first_name: string | null;
          last_name: string | null;
        }[];
      };
      leave_event: {
        Args: { p_event_id: number };
        Returns: string;
      };
      list_event_organizers: {
        Args: { p_event_id: number };
        Returns: {
          member_user_id: string;
          member_email: string;
          first_name: string | null;
          last_name: string | null;
          is_creator: boolean;
          profile_image_updated_at: string | null;
        }[];
      };
      organizer_profile_image: {
        Args: { p_user_id: string };
        Returns: {
          image: string;
          content_type: string;
        }[];
      };
      can_view_organizer_profile_image: {
        Args: { p_user_id: string };
        Returns: boolean;
      };
      remove_event_organizer: {
        Args: { p_event_id: number; p_user_id: string };
        Returns: string;
      };
      confirmation_accepts_name: {
        Args: { p_event_id: number };
        Returns: boolean;
      };
      event_confirmed_count: {
        Args: { p_event_id: number };
        Returns: number;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
