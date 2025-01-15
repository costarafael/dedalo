import { NextResponse } from 'next/server'
import { ModuleService } from '@/lib/core/services/module.service'
import { ModuleRepository } from '@/lib/core/repositories/module.repository'
import { handleError } from '@/lib/utils/handle-error'

const moduleService = new ModuleService(new ModuleRepository())

export async function GET() {
  try {
    const modules = await moduleService.findAll()
    return NextResponse.json(modules)
  } catch (error) {
    return handleError(error)
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const module = await moduleService.create(data)
    return NextResponse.json(module)
  } catch (error) {
    return handleError(error)
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json()
    const module = await moduleService.update(id, data)
    return NextResponse.json(module)
  } catch (error) {
    return handleError(error)
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await moduleService.delete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return handleError(error)
  }
} 