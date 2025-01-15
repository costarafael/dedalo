"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import type { ComponentLibrary } from "@/lib/core/interfaces/component-library.interfaces"
import { useComponentLibrary } from "@/lib/hooks/use-component-library"

export const columns: ColumnDef<ComponentLibrary>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div>{row.getValue("name")}</div>
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => <div>{row.getValue("description")}</div>
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("category")}</Badge>
    )
  },
  {
    accessorKey: "version",
    header: "Versão",
    cell: ({ row }) => <div>{row.getValue("version")}</div>
  },
  {
    accessorKey: "is_active",
    header: "Ativo",
    cell: ({ row }) => (
      <Badge variant={row.getValue("is_active") ? "default" : "secondary"}>
        {row.getValue("is_active") ? "Sim" : "Não"}
      </Badge>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { remove } = useComponentLibrary()

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => remove(row.original.id)}>
              <Trash className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
] 