import { Database } from "./supabase"

type Tables = Database["public"]["Tables"]
type EntityRow = Tables["Entity"]["Row"]
type EntityInsert = Tables["Entity"]["Insert"]
type ProviderHierarchyRow = Tables["provider_hierarchies"]["Row"]
type ProviderHierarchyInsert = Tables["provider_hierarchies"]["Insert"]

export type Provider = Omit<EntityRow, "type"> & {
  type: "PROVIDER"
  provider_hierarchies?: Array<{
    client_id: string | null
    parent_provider_id: string | null
    root_provider_id: string | null
    client?: {
      id: string
      name: string
    } | null
  }>
}

export interface CreateProviderDTO {
  name: string
  parent_provider_id?: string | null
  client_id?: string | null
} 