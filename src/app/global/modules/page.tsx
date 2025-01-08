"use client"

import { useEffect, useState } from "react"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { getBrowserClient } from "@/lib/database/supabase"
import { AddModuleDialog } from "./add-module-dialog"
import type { Module } from "./columns"

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([])

  useEffect(() => {
    async function fetchModules() {
      const supabase = getBrowserClient()
      const { data, error } = await supabase
        .from("modules")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching modules:", error)
        return
      }

      setModules(data || [])
    }

    fetchModules()
  }, [])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Módulos</h1>
        <AddModuleDialog />
      </div>
      <DataTable columns={columns} data={modules} />
    </div>
  )
} 