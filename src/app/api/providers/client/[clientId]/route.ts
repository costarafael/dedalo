import { NextResponse } from 'next/server'
import { ProviderRepository } from '@/lib/core/repositories/provider.repository'

const providerRepository = new ProviderRepository()

export async function GET(
  request: Request,
  context: { params: { clientId: string } }
) {
  try {
    const { clientId } = await context.params
    const providers = await providerRepository.findByClient(clientId)
    return NextResponse.json(providers)
  } catch (error) {
    console.error('Error fetching providers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
} 