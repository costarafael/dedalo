import { NextResponse } from "next/server"
import { supabase } from "@/lib/database/supabase"
import { handleError } from "@/lib/utils/handle-error"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return handleError(error)
  }
} 