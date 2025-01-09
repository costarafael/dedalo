import { NextResponse } from 'next/server'
import { ClientRepository } from '@/lib/core/repositories'
import { ClientService } from '@/lib/core/services'

// Instanciando o service com suas dependências
const clientRepository = new ClientRepository()
const clientService = new ClientService(clientRepository)

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientService.getById(params.id)
    if (!client) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 })
    }

    return NextResponse.json(client)
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
    const body = await request.json()
    const updatedClient = await clientService.update(params.id, body)

    return NextResponse.json(updatedClient)
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error)
    if (error instanceof Error && error.message === 'Cliente não encontrado') {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await clientService.delete(params.id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Erro ao deletar cliente:', error)
    if (error instanceof Error && error.message === 'Cliente não encontrado') {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 