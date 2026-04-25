export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          role: 'client' | 'admin'
          created_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          role?: 'client' | 'admin'
          created_at?: string
        }
        Update: {
          full_name?: string | null
          email?: string | null
          role?: 'client' | 'admin'
        }
        Relationships: []
      }
      clients: {
        Row: {
          id: string
          profile_id: string | null
          full_name: string
          email: string
          phone: string | null
          company_name: string | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id?: string | null
          full_name: string
          email: string
          phone?: string | null
          company_name?: string | null
          created_at?: string
        }
        Update: {
          profile_id?: string | null
          full_name?: string
          email?: string
          phone?: string | null
          company_name?: string | null
        }
        Relationships: []
      }
      matters: {
        Row: {
          id: string
          client_id: string
          title: string
          matter_type: string
          current_stage: string
          progress: number
          status: string
          next_step: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          title: string
          matter_type: string
          current_stage?: string
          progress?: number
          status?: string
          next_step?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          title?: string
          matter_type?: string
          current_stage?: string
          progress?: number
          status?: string
          next_step?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      matter_updates: {
        Row: {
          id: string
          matter_id: string
          update_title: string
          update_body: string
          visible_to_client: boolean
          created_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          matter_id: string
          update_title: string
          update_body: string
          visible_to_client?: boolean
          created_by?: string | null
          created_at?: string
        }
        Update: {
          update_title?: string
          update_body?: string
          visible_to_client?: boolean
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      get_user_role: {
        Args: Record<string, never>
        Returns: string
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row']
export type Client = Database['public']['Tables']['clients']['Row']
export type Matter = Database['public']['Tables']['matters']['Row']
export type MatterUpdate = Database['public']['Tables']['matter_updates']['Row']

export const MATTER_STAGES = [
  { label: 'Intake Received', progress: 12 },
  { label: 'Documents Under Review', progress: 25 },
  { label: 'Application Prepared', progress: 38 },
  { label: 'Filed With Authority', progress: 50 },
  { label: 'Under Examination', progress: 65 },
  { label: 'Authority Response', progress: 78 },
  { label: 'Approved / Registered', progress: 90 },
  { label: 'Completed', progress: 100 },
] as const

export type MatterStage = (typeof MATTER_STAGES)[number]['label']

export const MATTER_TYPES = [
  'Trademark',
  'Patent',
  'Copyright',
  'Industrial Design',
  'Trade Secret',
  'Domain Name',
  'Corporate Formation',
  'Contract Review',
  'IP Enforcement',
  'Other',
] as const

export function getProgressForStage(stage: string): number {
  const found = MATTER_STAGES.find((s) => s.label === stage)
  return found?.progress ?? 12
}