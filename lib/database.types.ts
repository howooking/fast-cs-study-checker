export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          id: string
          user_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          id: string
          user_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subjects: {
        Row: {
          created_at: string
          id: string
          is_done: boolean
          link: string | null
          number: number
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_done?: boolean
          link?: string | null
          number: number
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_done?: boolean
          link?: string | null
          number?: number
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subjects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
