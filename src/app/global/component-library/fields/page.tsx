"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useComponentLibrary } from "@/lib/hooks/use-component-library"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export default function FieldsPage() {
  const { components, isLoading } = useComponentLibrary()

  if (isLoading) {
    return <div>Carregando...</div>
  }

  // Filtra apenas os componentes que são campos de formulário
  const fields = components.filter(component => 
    component.category === 'FORM' || 
    component.category === 'DATA'
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Fields</h1>
        <Button asChild>
          <Link href="/global/component-library/fields/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Field
          </Link>
        </Button>
      </div>

      <DataTable columns={columns} data={fields} />
    </div>
  )
} 