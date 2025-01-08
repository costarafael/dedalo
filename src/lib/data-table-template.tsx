import { ColumnDef } from "@tanstack/react-table"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

interface TemplateField {
  id: string
  name: string
  type: string
  required: boolean
  options?: { label: string; value: string }[]
  relation?: {
    table: string // nome da tabela relacionada
    labelField: string // campo que será mostrado
    valueField: string // campo usado como valor
    filter?: Record<string, any> // filtros opcionais
  }
}

interface RecordValue {
  id: string
  fieldId: string
  value: any
  relationData?: any // dados da relação, se existir
}

export function generateColumnsFromTemplate(
  template: { fields: TemplateField[] }
): ColumnDef<any>[] {
  const columns = template.fields.map((field) => ({
    id: field.id,
    accessorKey: field.id,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={field.name} />
    ),
    cell: ({ row, getValue }) => {
      const recordValue = row.original.values?.find(
        (v: RecordValue) => v.fieldId === field.id
      )
      
      const value = recordValue?.value
      const relationData = recordValue?.relationData

      switch (field.type) {
        case "select":
          if (field.relation) {
            // Se tem dados relacionais, usa eles
            return relationData?.[field.relation.labelField] || value
          }
          return field.options?.find((opt) => opt.value === value)?.label || value
          
        case "multi-select":
          if (field.relation) {
            // Para multi-select com relação, espera um array de dados relacionais
            return Array.isArray(relationData)
              ? relationData
                  .map((item) => item[field.relation!.labelField])
                  .join(", ")
              : value
          }
          return Array.isArray(value)
            ? value
                .map(
                  (v) => field.options?.find((opt) => opt.value === v)?.label || v
                )
                .join(", ")
            : value
            
        case "relation":
          // Tipo específico para relações
          return relationData?.[field.relation!.labelField] || value
          
        case "boolean":
          return value ? "Sim" : "Não"
          
        case "date":
          return value ? new Date(value).toLocaleDateString() : ""
          
        default:
          return value
      }
    },
    enableSorting: true,
    enableHiding: true,
  }))

  console.log('Generated columns:', columns)

  return columns
}

export function generateSearchableColumns(template: { fields: TemplateField[] }) {
  const searchableColumns = template.fields
    .filter((field) => 
      ["text", "select", "multi-select", "relation"].includes(field.type)
    )
    .map((field) => ({
      id: field.id,
      title: field.name,
    }))

  console.log('Generated searchable columns:', searchableColumns)

  return searchableColumns
}

export function generateFilterableColumns(template: { fields: TemplateField[] }) {
  const filterableColumns = template.fields
    .filter((field) => 
      field.options || 
      field.relation || 
      ["boolean", "date"].includes(field.type)
    )
    .map((field) => ({
      id: field.id,
      title: field.name,
      options: field.options?.map((opt) => ({
        label: opt.label,
        value: opt.value,
      })) || [],
      relation: field.relation,
    }))

  console.log('Generated filterable columns:', filterableColumns)

  return filterableColumns
} 