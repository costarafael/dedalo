import { NextResponse } from 'next/server'
import { TemplateFieldService } from '@/lib/core/services/template-field.service'
import { handleError } from '@/lib/utils/handle-error'

const service = new TemplateFieldService()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const field = await service.findById(params.id)
    return NextResponse.json(field)
  } catch (error) {
    return handleError(error)
  }
} 