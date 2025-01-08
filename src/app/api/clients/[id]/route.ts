import { createClient } from "@supabase/supabase-js"
import { Database } from "@/types/supabase"
import { NextResponse } from "next/server"

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: client, error } = await supabase
      .from("Entity")
      .select("*")
      .eq("id", await params.id)
      .eq("type", "CLIENT")
      .is("deleted_at", null)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    if (!client) {
      return new NextResponse("Cliente não encontrado", { status: 404 })
    }

    return NextResponse.json(client)
  } catch (error) {
    console.error("Erro ao buscar cliente:", error)
    return new NextResponse("Erro ao buscar cliente", { status: 500 })
  }
} 