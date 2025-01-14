import { NextResponse } from 'next/server'
import { ProviderRepository } from '@/lib/core/repositories/provider.repository'

const providerRepository = new ProviderRepository()

export async function GET() {
  try {
    const providers = await providerRepository.findAll()
    return NextResponse.json({ data: providers })
  } catch (error) {
    console.error('Error fetching providers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
} 