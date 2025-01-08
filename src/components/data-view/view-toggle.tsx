"use client"

import * as React from "react"
import { LayoutGrid, Table } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"
import { useQueryState } from "nuqs"

export function ViewToggle() {
  const [viewMode, setViewMode] = useQueryState("viewMode", {
    defaultValue: "table",
    parse: (value: string) => value === "card" ? "card" : "table",
    serialize: (value: string) => value,
  })

  return (
    <div className="flex gap-2">
      <Toggle
        pressed={viewMode === "table"}
        onPressedChange={() => setViewMode("table")}
        aria-label="Visualização em tabela"
      >
        <Table className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={viewMode === "card"}
        onPressedChange={() => setViewMode("card")}
        aria-label="Visualização em cards"
      >
        <LayoutGrid className="h-4 w-4" />
      </Toggle>
    </div>
  )
} 