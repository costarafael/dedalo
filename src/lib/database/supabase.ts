import { createClient } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Anon Key must be defined')
}

// Cliente para uso no servidor
export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
  db: {
    schema: 'public'
  }
})

// Cliente para uso no browser
export const createBrowserClient = () => {
  return createClientComponentClient<Database>()
}

// Exporta o cliente do browser para uso em componentes
export const browserClient = createBrowserClient()

// Exporta o cliente do servidor para uso em componentes do servidor
export const serverClient = supabase

// Exporta o cliente do browser para uso em hooks
export const useSupabase = () => {
  return browserClient
}

// Exporta o cliente do servidor para uso em rotas da API
export const getServerClient = () => {
  return serverClient
}

// Exporta o cliente do browser para uso em componentes
export const getBrowserClient = () => {
  return browserClient
}

// Exporta o cliente do servidor para uso em testes
export const getTestClient = () => {
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: {
      schema: 'public'
    }
  })
} 