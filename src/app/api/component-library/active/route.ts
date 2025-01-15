import { NextResponse } from 'next/server'
import { componentLibraryService } from '@/lib/core/services/component-library.service'
import { handleError } from '@/lib/utils/handle-error'

export async function GET() {
  try {
    const components = await componentLibraryService.findActive()
    return NextResponse.json(components)
  } catch (error) {
    console.error('Error in GET /api/component-library/active:', error)
    return handleError(error)
  }
} 