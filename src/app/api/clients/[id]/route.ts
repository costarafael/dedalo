import { NextResponse } from 'next/server'
import { getServerClient } from '@/lib/database/supabase'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getServerClient()
    const { data, error } = await supabase
      .from('Entity')
      .select('*')
      .eq('id', params.id)
      .eq('type', 'CLIENT')
      .is('deleted_at', null)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao buscar cliente:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getServerClient()
    const body = await request.json()

    const { data, error } = await supabase
      .from('Entity')
      .update(body)
      .eq('id', params.id)
      .eq('type', 'CLIENT')
      .is('deleted_at', null)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getServerClient()
    const { error } = await supabase
      .from('Entity')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', params.id)
      .eq('type', 'CLIENT')

    if (error) throw error

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Erro ao deletar cliente:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 