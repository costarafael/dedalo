import { createClientSchema } from "@/lib/validations/client"
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"
import { z } from "zod"

const supabase = createSupabaseClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Entity = Database["public"]["Tables"]["Entity"]["Row"]
type EntityInsert = Database["public"]["Tables"]["Entity"]["Insert"]

export async function getClients() {
  try {
    console.log("Buscando clientes...")
    const { data, error } = await supabase
      .from("Entity")
      .select("*")
      .eq("type", "CLIENT")
      .is("deleted_at", null)

    if (error) throw error

    console.log("Clientes encontrados:", data)
    return data
  } catch (error) {
    console.error("Erro ao buscar clientes:", error)
    throw error
  }
}

export async function createClient(values: z.infer<typeof createClientSchema>) {
  try {
    const now = new Date().toISOString()
    
    // Primeiro, gera o ID usando a função do banco
    const { data: generatedId, error: idError } = await supabase
      .rpc('generate_entity_id', {
        name: values.name,
        entity_type: 'CLIENT'
      })

    if (idError) throw idError

    const newClient: EntityInsert = {
      id: generatedId,
      name: values.name,
      type: "CLIENT",
      created_at: now,
      updated_at: now
    }

    const { data, error } = await supabase
      .from("Entity")
      .insert(newClient)
      .select()
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Erro ao criar cliente:", error)
    throw error
  }
}

export async function updateClient(id: string, values: z.infer<typeof createClientSchema>) {
  try {
    const updates: Partial<Entity> = {
      name: values.name,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from("Entity")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error)
    throw error
  }
}

export async function deleteClient(id: string) {
  try {
    const { error } = await supabase
      .from("Entity")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error
  } catch (error) {
    console.error("Erro ao deletar cliente:", error)
    throw error
  }
} 