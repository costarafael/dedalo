import { getServerClient } from "@/lib/database/supabase"

export async function getModules() {
  const supabase = getServerClient()

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