"use client"

import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { AddModuleDialog } from "./add-module-dialog"
import { useModules } from "@/lib/http/hooks/use-modules"

export default function ModulesPage() {
  const { modules, isLoading } = useModules()

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Módulos</h1>
          <AddModuleDialog />
        </div>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Carregando módulos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Módulos</h1>
        <AddModuleDialog />
      </div>

      <DataTable
        columns={columns}
        data={modules}
      />
    </div>
  )
} 