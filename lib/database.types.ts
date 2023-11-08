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
      subjects: {
        Row: {
          created_at: string
          id: string
          is_done: boolean
          link: string | null
          number: number
          title: string
          user_id: string | null
          user_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_done?: boolean
          link?: string | null
          number: number
          title: string
          user_id?: string | null
          user_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_done?: boolean
          link?: string | null
          number?: number
          title?: string
          user_id?: string | null
          user_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subjects_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
