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
      approvals: {
        Row: {
          approved_at: string | null
          comments: string | null
          created_at: string | null
          employee_contribution: number | null
          employer_contribution: number | null
          id: string
          manager_id: string
          package_id: string
          requested_by: string
          status: Database["public"]["Enums"]["approval_status"] | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          comments?: string | null
          created_at?: string | null
          employee_contribution?: number | null
          employer_contribution?: number | null
          id?: string
          manager_id: string
          package_id: string
          requested_by: string
          status?: Database["public"]["Enums"]["approval_status"] | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          comments?: string | null
          created_at?: string | null
          employee_contribution?: number | null
          employer_contribution?: number | null
          id?: string
          manager_id?: string
          package_id?: string
          requested_by?: string
          status?: Database["public"]["Enums"]["approval_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "approvals_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approvals_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "reward_packages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approvals_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      burnout_predictions: {
        Row: {
          ai_reasoning: string | null
          confidence_score: number | null
          contributing_factors: string[] | null
          created_at: string | null
          employee_id: string
          engagement_score: number | null
          id: string
          last_analyzed_at: string | null
          manager_notified: boolean | null
          missed_deadlines: number | null
          notification_sent: boolean | null
          overtime_hours: number | null
          predicted_burnout_date: string | null
          preventive_rewards_suggested: boolean | null
          recommended_intervention: string | null
          risk_level: Database["public"]["Enums"]["burnout_risk_level"]
          risk_score: number
          sentiment_score: number | null
          stress_indicators: Json | null
          time_since_last_break: number | null
          updated_at: string | null
          work_intensity_score: number | null
        }
        Insert: {
          ai_reasoning?: string | null
          confidence_score?: number | null
          contributing_factors?: string[] | null
          created_at?: string | null
          employee_id: string
          engagement_score?: number | null
          id?: string
          last_analyzed_at?: string | null
          manager_notified?: boolean | null
          missed_deadlines?: number | null
          notification_sent?: boolean | null
          overtime_hours?: number | null
          predicted_burnout_date?: string | null
          preventive_rewards_suggested?: boolean | null
          recommended_intervention?: string | null
          risk_level?: Database["public"]["Enums"]["burnout_risk_level"]
          risk_score: number
          sentiment_score?: number | null
          stress_indicators?: Json | null
          time_since_last_break?: number | null
          updated_at?: string | null
          work_intensity_score?: number | null
        }
        Update: {
          ai_reasoning?: string | null
          confidence_score?: number | null
          contributing_factors?: string[] | null
          created_at?: string | null
          employee_id?: string
          engagement_score?: number | null
          id?: string
          last_analyzed_at?: string | null
          manager_notified?: boolean | null
          missed_deadlines?: number | null
          notification_sent?: boolean | null
          overtime_hours?: number | null
          predicted_burnout_date?: string | null
          preventive_rewards_suggested?: boolean | null
          recommended_intervention?: string | null
          risk_level?: Database["public"]["Enums"]["burnout_risk_level"]
          risk_score?: number
          sentiment_score?: number | null
          stress_indicators?: Json | null
          time_since_last_break?: number | null
          updated_at?: string | null
          work_intensity_score?: number | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string | null
          employee_count: number | null
          id: string
          industry: string | null
          monthly_budget: number | null
          name: string
          settings: Json | null
          updated_at: string | null
          wallet_balance: number | null
        }
        Insert: {
          created_at?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          monthly_budget?: number | null
          name: string
          settings?: Json | null
          updated_at?: string | null
          wallet_balance?: number | null
        }
        Update: {
          created_at?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          monthly_budget?: number | null
          name?: string
          settings?: Json | null
          updated_at?: string | null
          wallet_balance?: number | null
        }
        Relationships: []
      }
      employee_preferences: {
        Row: {
          created_at: string | null
          employee_id: string
          favorite_destinations: string[] | null
          free_text_preferences: string | null
          id: string
          interests_ranking: Json | null
          notification_channels: string[] | null
          opt_in_personalized_recommendations: boolean | null
          preferred_activities: string[] | null
          preferred_travel_types: string[] | null
          travel_restrictions: string | null
          trip_duration_preference: string | null
          updated_at: string | null
          vacation_timing_preferences: string[] | null
          work_schedule: string | null
        }
        Insert: {
          created_at?: string | null
          employee_id: string
          favorite_destinations?: string[] | null
          free_text_preferences?: string | null
          id?: string
          interests_ranking?: Json | null
          notification_channels?: string[] | null
          opt_in_personalized_recommendations?: boolean | null
          preferred_activities?: string[] | null
          preferred_travel_types?: string[] | null
          travel_restrictions?: string | null
          trip_duration_preference?: string | null
          updated_at?: string | null
          vacation_timing_preferences?: string[] | null
          work_schedule?: string | null
        }
        Update: {
          created_at?: string | null
          employee_id?: string
          favorite_destinations?: string[] | null
          free_text_preferences?: string | null
          id?: string
          interests_ranking?: Json | null
          notification_channels?: string[] | null
          opt_in_personalized_recommendations?: boolean | null
          preferred_activities?: string[] | null
          preferred_travel_types?: string[] | null
          travel_restrictions?: string | null
          trip_duration_preference?: string | null
          updated_at?: string | null
          vacation_timing_preferences?: string[] | null
          work_schedule?: string | null
        }
        Relationships: []
      }
      hris_events: {
        Row: {
          created_at: string | null
          employee_id: string
          event_data: Json | null
          event_type: Database["public"]["Enums"]["event_type"]
          id: string
          processed: boolean | null
          source: Database["public"]["Enums"]["event_source"]
        }
        Insert: {
          created_at?: string | null
          employee_id: string
          event_data?: Json | null
          event_type: Database["public"]["Enums"]["event_type"]
          id?: string
          processed?: boolean | null
          source: Database["public"]["Enums"]["event_source"]
        }
        Update: {
          created_at?: string | null
          employee_id?: string
          event_data?: Json | null
          event_type?: Database["public"]["Enums"]["event_type"]
          id?: string
          processed?: boolean | null
          source?: Database["public"]["Enums"]["event_source"]
        }
        Relationships: [
          {
            foreignKeyName: "hris_events_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          behavioral_data: Json | null
          confidence_score: number | null
          created_at: string | null
          employee_id: string
          id: string
          milestone_type: Database["public"]["Enums"]["milestone_type"]
          predicted_date: string | null
          status: Database["public"]["Enums"]["milestone_status"] | null
          trigger_date: string
          updated_at: string | null
        }
        Insert: {
          behavioral_data?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          employee_id: string
          id?: string
          milestone_type: Database["public"]["Enums"]["milestone_type"]
          predicted_date?: string | null
          status?: Database["public"]["Enums"]["milestone_status"] | null
          trigger_date: string
          updated_at?: string | null
        }
        Update: {
          behavioral_data?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          employee_id?: string
          id?: string
          milestone_type?: Database["public"]["Enums"]["milestone_type"]
          predicted_date?: string | null
          status?: Database["public"]["Enums"]["milestone_status"] | null
          trigger_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "milestones_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      package_feedback: {
        Row: {
          customization_requests: Json | null
          employee_id: string
          id: string
          package_id: string
          preference_data: Json | null
          rating: number | null
          submitted_at: string | null
        }
        Insert: {
          customization_requests?: Json | null
          employee_id: string
          id?: string
          package_id: string
          preference_data?: Json | null
          rating?: number | null
          submitted_at?: string | null
        }
        Update: {
          customization_requests?: Json | null
          employee_id?: string
          id?: string
          package_id?: string
          preference_data?: Json | null
          rating?: number | null
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_feedback_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_feedback_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "reward_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          company_id: string | null
          created_at: string | null
          department: string | null
          email: string
          full_name: string
          hire_date: string | null
          id: string
          manager_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          full_name: string
          hire_date?: string | null
          id: string
          manager_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          company_id?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          full_name?: string
          hire_date?: string | null
          id?: string
          manager_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reward_packages: {
        Row: {
          ai_reasoning: string | null
          availability_status: string | null
          category: Database["public"]["Enums"]["reward_category"]
          created_at: string | null
          description: string | null
          destination: string | null
          estimated_cost: number
          id: string
          image_url: string | null
          milestone_id: string
          options: Json | null
          preference_score: number | null
          status: Database["public"]["Enums"]["package_status"] | null
          title: string
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          ai_reasoning?: string | null
          availability_status?: string | null
          category: Database["public"]["Enums"]["reward_category"]
          created_at?: string | null
          description?: string | null
          destination?: string | null
          estimated_cost: number
          id?: string
          image_url?: string | null
          milestone_id: string
          options?: Json | null
          preference_score?: number | null
          status?: Database["public"]["Enums"]["package_status"] | null
          title: string
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          ai_reasoning?: string | null
          availability_status?: string | null
          category?: Database["public"]["Enums"]["reward_category"]
          created_at?: string | null
          description?: string | null
          destination?: string | null
          estimated_cost?: number
          id?: string
          image_url?: string | null
          milestone_id?: string
          options?: Json | null
          preference_score?: number | null
          status?: Database["public"]["Enums"]["package_status"] | null
          title?: string
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reward_packages_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          company_id: string | null
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          company_id?: string | null
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_transactions: {
        Row: {
          amount: number
          approved_by: string | null
          balance_after: number
          created_at: string | null
          employee_id: string
          id: string
          milestone_id: string | null
          notes: string | null
          package_id: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
        }
        Insert: {
          amount: number
          approved_by?: string | null
          balance_after: number
          created_at?: string | null
          employee_id: string
          id?: string
          milestone_id?: string | null
          notes?: string | null
          package_id?: string | null
          transaction_type: Database["public"]["Enums"]["transaction_type"]
        }
        Update: {
          amount?: number
          approved_by?: string | null
          balance_after?: number
          created_at?: string | null
          employee_id?: string
          id?: string
          milestone_id?: string | null
          notes?: string | null
          package_id?: string | null
          transaction_type?: Database["public"]["Enums"]["transaction_type"]
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_milestone_id_fkey"
            columns: ["milestone_id"]
            isOneToOne: false
            referencedRelation: "milestones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wallet_transactions_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "reward_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      wellness_scores: {
        Row: {
          created_at: string | null
          data_sources: Json | null
          employee_id: string
          energy_level: number | null
          engagement_level: number | null
          id: string
          overall_score: number
          stress_level: number | null
          work_life_balance: number | null
        }
        Insert: {
          created_at?: string | null
          data_sources?: Json | null
          employee_id: string
          energy_level?: number | null
          engagement_level?: number | null
          id?: string
          overall_score: number
          stress_level?: number | null
          work_life_balance?: number | null
        }
        Update: {
          created_at?: string | null
          data_sources?: Json | null
          employee_id?: string
          energy_level?: number | null
          engagement_level?: number | null
          id?: string
          overall_score?: number
          stress_level?: number | null
          work_life_balance?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_employee_data: {
        Args: { requesting_user_id: string; target_employee_id: string }
        Returns: boolean
      }
      get_user_company_id: {
        Args: { _user_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "employer" | "employee"
      approval_status: "pending" | "approved" | "rejected"
      burnout_risk_level: "low" | "medium" | "high" | "critical"
      event_source: "workday" | "adp" | "bamboo" | "slack" | "manual"
      event_type:
        | "hire"
        | "promotion"
        | "team_change"
        | "pto"
        | "collaboration"
        | "performance_review"
      milestone_status: "pending" | "active" | "completed" | "expired"
      milestone_type:
        | "anniversary"
        | "burnout_risk"
        | "life_event"
        | "achievement"
      package_status:
        | "draft"
        | "pending_approval"
        | "approved"
        | "rejected"
        | "redeemed"
      reward_category:
        | "travel"
        | "wellness"
        | "learning"
        | "equity"
        | "flight_voucher"
        | "hotel_stay"
        | "experience_package"
        | "travel_gift_card"
      transaction_type:
        | "employer_contribution"
        | "employee_contribution"
        | "reward_redemption"
        | "milestone_bonus"
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
      app_role: ["admin", "employer", "employee"],
      approval_status: ["pending", "approved", "rejected"],
      burnout_risk_level: ["low", "medium", "high", "critical"],
      event_source: ["workday", "adp", "bamboo", "slack", "manual"],
      event_type: [
        "hire",
        "promotion",
        "team_change",
        "pto",
        "collaboration",
        "performance_review",
      ],
      milestone_status: ["pending", "active", "completed", "expired"],
      milestone_type: [
        "anniversary",
        "burnout_risk",
        "life_event",
        "achievement",
      ],
      package_status: [
        "draft",
        "pending_approval",
        "approved",
        "rejected",
        "redeemed",
      ],
      reward_category: [
        "travel",
        "wellness",
        "learning",
        "equity",
        "flight_voucher",
        "hotel_stay",
        "experience_package",
        "travel_gift_card",
      ],
      transaction_type: [
        "employer_contribution",
        "employee_contribution",
        "reward_redemption",
        "milestone_bonus",
      ],
    },
  },
} as const
