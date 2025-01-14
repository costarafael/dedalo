import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Singleton para o cliente do browser
let browserClient: ReturnType<typeof createClientComponentClient<Database>> | null = null

// Singleton para o cliente do servidor
let serverClient: ReturnType<typeof createClient<Database>> | null = null

// Exporta funções de utilidade para obter os clientes
export const getBrowserClient = () => {
  if (!browserClient) {
    browserClient = createClientComponentClient<Database>()
  }
  return browserClient
}

export const getServerClient = () => {
  if (!serverClient) {
    serverClient = createClient<Database>(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  }
  return serverClient
}

// Exporta o cliente do servidor para uso em componentes do servidor
export const supabase = getServerClient() 