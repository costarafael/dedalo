"use client"

import { useState } from "react"
import { DynamicDataTable } from "@/components/data-table/dynamic-data-table"

// Exemplo de template e registros (substituir por dados do banco)
const exampleTemplate = {
  id: "T123",
  name: "Formulário de Clientes",
  fields: [
    {
      id: "name",
      name: "Nome",
      type: "text",
      required: true,
    },
    {
      id: "status",
      name: "Status",
      type: "select",
      required: true,
      options: [
        { label: "Ativo", value: "active" },
        { label: "Inativo", value: "inactive" },
      ],
    },
    {
      id: "department",
      name: "Departamento",
      type: "relation",
      required: true,
      relation: {
        table: "departments",
        labelField: "name",
        valueField: "id",
      },
    },
    {
      id: "roles",
      name: "Funções",
      type: "multi-select",
      required: false,
      relation: {
        table: "roles",
        labelField: "name",
        valueField: "id",
        filter: { isActive: true },
      },
    },
    {
      id: "supervisor",
      name: "Supervisor",
      type: "select",
      required: false,
      relation: {
        table: "users",
        labelField: "name",
        valueField: "id",
        filter: { role: "supervisor" },
      },
    },
  ],
}

const exampleRecords = [
  {
    id: "R1",
    name: "Cliente 1",
    values: [
      { 
        id: "v1", 
        fieldId: "name", 
        value: "João Silva" 
      },
      { 
        id: "v2", 
        fieldId: "status", 
        value: "active" 
      },
      {
        id: "v3",
        fieldId: "department",
        value: "d1",
        relationData: {
          id: "d1",
          name: "Vendas",
          code: "VND",
        }
      },
      {
        id: "v4",
        fieldId: "roles",
        value: ["r1", "r2"],
        relationData: [
          { id: "r1", name: "Vendedor" },
          { id: "r2", name: "Atendente" },
        ]
      },
      {
        id: "v5",
        fieldId: "supervisor",
        value: "u1",
        relationData: {
          id: "u1",
          name: "Carlos Supervisor",
          email: "carlos@exemplo.com",
        }
      },
    ],
  },
  {
    id: "R2", 
    name: "Cliente 2",
    values: [
      { 
        id: "v6", 
        fieldId: "name", 
        value: "Maria Santos" 
      },
      { 
        id: "v7", 
        fieldId: "status", 
        value: "inactive" 
      },
      {
        id: "v8",
        fieldId: "department",
        value: "d2",
        relationData: {
          id: "d2",
          name: "Marketing",
          code: "MKT",
        }
      },
      {
        id: "v9",
        fieldId: "roles",
        value: ["r3"],
        relationData: [
          { id: "r3", name: "Analista" },
        ]
      },
      {
        id: "v10",
        fieldId: "supervisor",
        value: "u2",
        relationData: {
          id: "u2",
          name: "Ana Supervisora",
          email: "ana@exemplo.com",
        }
      },
    ],
  },
]

// Exemplo de contagem para faceted filters
const exampleFacetedFilters = {
  status: {
    active: 1,
    inactive: 1,
  },
  department: {
    d1: 1, // Vendas
    d2: 1, // Marketing
  },
  roles: {
    r1: 1, // Vendedor
    r2: 1, // Atendente
    r3: 1, // Analista
  },
}

export default function RecordsPage() {
  const [selectedRows, setSelectedRows] = useState<any[]>([])

  const handleDelete = async (rows: any[]) => {
    console.log("Deletando registros:", rows)
    // Implementar deleção
  }

  return (
    <div className="container mx-auto py-10">
      <DynamicDataTable
        template={exampleTemplate}
        records={exampleRecords}
        pageCount={1}
        facetedFilters={exampleFacetedFilters}
        enableAdvancedFilter={true}
        enableFloatingBar={true}
        onRowsChange={setSelectedRows}
        onPageCountChange={(count) => console.log("Page count changed:", count)}
        onLoadingChange={(loading) => console.log("Loading changed:", loading)}
        onDelete={handleDelete}
      />
    </div>
  )
} 