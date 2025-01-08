export interface Client {
  id: string
  name: string
  description?: string
  created_at: string
  updated_at: string
}

export interface CreateClientDTO {
  name: string
  description?: string
} 