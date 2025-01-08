"use client"

import { ColumnDef } from "@tanstack/react-table"

export interface Client {
  id: string
  name: string
  email: string
  status: "active" | "inactive"
}

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]

export const searchableColumns = [
  {
    id: "name",
    title: "Nome"
  },
  {
    id: "email",
    title: "Email"
  }
]

export const filterableColumns = [
  {
    id: "status",
    title: "Status",
    options: [
      { value: "active", label: "Ativo" },
      { value: "inactive", label: "Inativo" }
    ]
  }
] 