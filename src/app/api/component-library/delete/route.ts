import { NextResponse } from 'next/server'
import { componentLibraryService } from '@/lib/core/services/component-library.service'
import { handleError } from '@/lib/utils/handle-error'

export async function POST(request: Request) {
  try {
    const { id } = await request.json() as { id: string }
    await componentLibraryService.delete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in POST /api/component-library/delete:', error)
    return handleError(error)
  }
} 