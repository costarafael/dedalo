import { NextResponse } from 'next/server'
import { componentLibraryService } from '@/lib/core/services/component-library.service'
import { handleError } from '@/lib/utils/handle-error'
import type { ComponentLibraryInsert, ComponentLibraryUpdate } from '@/lib/core/interfaces/component-library.interfaces'

export async function GET() {
  try {
    const components = await componentLibraryService.findAll()
    return NextResponse.json(components)
  } catch (error) {
    console.error('Error in GET /api/component-library:', error)
    return handleError(error)
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json() as ComponentLibraryInsert
    const component = await componentLibraryService.create(data)
    return NextResponse.json(component)
  } catch (error) {
    console.error('Error in POST /api/component-library:', error)
    return handleError(error)
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json() as ComponentLibraryUpdate & { id: string }
    const component = await componentLibraryService.update(id, data)
    return NextResponse.json(component)
  } catch (error) {
    console.error('Error in PUT /api/component-library:', error)
    return handleError(error)
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json() as { id: string }
    await componentLibraryService.delete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/component-library:', error)
    return handleError(error)
  }
} 