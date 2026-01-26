export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      idea_votes: {
        Row: {
          created_at: string
          id: string
          idea_id: string
          session_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          idea_id: string
          session_id: string
        }
        Update: {
          created_at?: string
          id?: string
          idea_id?: string
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "idea_votes_idea_id_fkey"
            columns: ["idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
        ]
      }
      ideas: {
        Row: {
          created_at: string
          description: string
          id: string
          priority: Database["public"]["Enums"]["idea_priority"]
          source: Database["public"]["Enums"]["idea_source"]
          status: Database["public"]["Enums"]["idea_status"]
          title: string
          updated_at: string
          votes: number
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          priority?: Database["public"]["Enums"]["idea_priority"]
          source?: Database["public"]["Enums"]["idea_source"]
          status?: Database["public"]["Enums"]["idea_status"]
          title: string
          updated_at?: string
          votes?: number
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          priority?: Database["public"]["Enums"]["idea_priority"]
          source?: Database["public"]["Enums"]["idea_source"]
          status?: Database["public"]["Enums"]["idea_status"]
          title?: string
          updated_at?: string
          votes?: number
        }
        Relationships: []
      }
      leads: {
        Row: {
          admin_notified: boolean
          ai_readiness_level: string
          avg_salary: number
          chat_id: number | null
          created_at: string
          employee_count: number
          id: string
          industry: string
          lead_id: string
          max_savings: number
          min_savings: number
          name: string
          pain_points: string[]
          pdf_base64: string | null
          pdf_sent: boolean
          phone: string
          potential_savings: number
          roi: number
          routine_time_share: number
          telegram_nick: string
          updated_at: string
        }
        Insert: {
          admin_notified?: boolean
          ai_readiness_level: string
          avg_salary: number
          chat_id?: number | null
          created_at?: string
          employee_count: number
          id?: string
          industry: string
          lead_id?: string
          max_savings: number
          min_savings: number
          name: string
          pain_points?: string[]
          pdf_base64?: string | null
          pdf_sent?: boolean
          phone: string
          potential_savings: number
          roi: number
          routine_time_share: number
          telegram_nick: string
          updated_at?: string
        }
        Update: {
          admin_notified?: boolean
          ai_readiness_level?: string
          avg_salary?: number
          chat_id?: number | null
          created_at?: string
          employee_count?: number
          id?: string
          industry?: string
          lead_id?: string
          max_savings?: number
          min_savings?: number
          name?: string
          pain_points?: string[]
          pdf_base64?: string | null
          pdf_sent?: boolean
          phone?: string
          potential_savings?: number
          roi?: number
          routine_time_share?: number
          telegram_nick?: string
          updated_at?: string
        }
        Relationships: []
      }
      release_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          published_at: string
          status: Database["public"]["Enums"]["release_status"]
          summary: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          published_at?: string
          status?: Database["public"]["Enums"]["release_status"]
          summary: string
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          published_at?: string
          status?: Database["public"]["Enums"]["release_status"]
          summary?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      roadmap_items: {
        Row: {
          created_at: string
          eta: string | null
          id: string
          related_idea_id: string | null
          short_description: string | null
          status: Database["public"]["Enums"]["roadmap_status"]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          eta?: string | null
          id?: string
          related_idea_id?: string | null
          short_description?: string | null
          status?: Database["public"]["Enums"]["roadmap_status"]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          eta?: string | null
          id?: string
          related_idea_id?: string | null
          short_description?: string | null
          status?: Database["public"]["Enums"]["roadmap_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "roadmap_items_related_idea_id_fkey"
            columns: ["related_idea_id"]
            isOneToOne: false
            referencedRelation: "ideas"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_idea_vote: {
        Args: { p_idea_id: string; p_session_id: string }
        Returns: boolean
      }
    }
    Enums: {
      idea_priority: "low" | "medium" | "high"
      idea_source: "client" | "internal" | "partner" | "client_form"
      idea_status: "backlog" | "planned" | "in_progress" | "done"
      release_status: "released" | "beta" | "internal"
      roadmap_status: "planned" | "in_progress" | "done"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      idea_priority: ["low", "medium", "high"],
      idea_source: ["client", "internal", "partner", "client_form"],
      idea_status: ["backlog", "planned", "in_progress", "done"],
      release_status: ["released", "beta", "internal"],
      roadmap_status: ["planned", "in_progress", "done"],
    },
  },
} as const
