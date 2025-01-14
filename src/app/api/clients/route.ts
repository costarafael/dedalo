import { NextResponse } from 'next/server'
import { ClientRepository } from '@/lib/core/repositories/client.repository'

const clientRepository = new ClientRepository()

export async function GET() {
  try {
    const clients = await clientRepository.findAll()
    return NextResponse.json(clients)
  } catch (error) {
    console.error('Erro ao buscar clientes:', error)
    return NextResponse.json(
      { error: 'Não foi possível carregar a lista de clientes' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const client = await clientRepository.create(data)
    return NextResponse.json(client)
  } catch (error) {
    console.error('Erro ao criar cliente:', error)
    return NextResponse.json(
      { error: 'Não foi possível criar o cliente' },
      { status: 500 }
    )
  }
} 