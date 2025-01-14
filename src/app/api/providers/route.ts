import { NextResponse } from 'next/server'
import { ProviderRepository } from '@/lib/core/repositories/provider.repository'

const providerRepository = new ProviderRepository()

export async function GET() {
  try {
    const providers = await providerRepository.findAll()
    return NextResponse.json(providers)
  } catch (error) {
    console.error('Error fetching providers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, client_id, parent_provider_id } = body

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    if (!client_id && !parent_provider_id) {
      return NextResponse.json(
        { error: 'Provider must be linked to a client or another provider' },
        { status: 400 }
      )
    }

    // Cria o provider
    const provider = await providerRepository.create({ name })

    // Adiciona à hierarquia
    await providerRepository.addToHierarchy({
      provider_id: provider.id,
      client_id,
      parent_provider_id,
    })

    // Busca o provider atualizado
    const updatedProvider = await providerRepository.findById(provider.id)
    return NextResponse.json(updatedProvider)
  } catch (error) {
    console.error('Error creating provider:', error)
    return NextResponse.json(
      { error: 'Failed to create provider' },
      { status: 500 }
    )
  }
} 