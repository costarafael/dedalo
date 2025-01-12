import { getClientService } from "@/lib/services/client"
import { NextResponse } from "next/server"

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const clientService = getClientService()
    const client = await clientService.getById(params.id)
    if (!client) {
      return new NextResponse(null, { status: 404 })
    }
    return NextResponse.json(client)
  } catch (error) {
    console.error("Erro ao buscar cliente:", error)
    return new NextResponse(null, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const data = await request.json()
    const clientService = getClientService()
    const client = await clientService.update(params.id, data)
    return NextResponse.json(client)
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error)
    return new NextResponse(null, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const clientService = getClientService()
    await clientService.delete(params.id)
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Erro ao remover cliente:", error)
    return new NextResponse(null, { status: 500 })
  }
} 