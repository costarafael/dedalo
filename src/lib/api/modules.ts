import { createServerClient } from "@/lib/supabase-server"

export async function getModules() {
  const supabase = createServerClient()

  const { data: modules, error } = await supabase
    .from("modules")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching modules:", error)
    return []
  }

  return modules
} 