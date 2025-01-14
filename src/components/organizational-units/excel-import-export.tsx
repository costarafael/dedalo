"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Upload, FileSpreadsheet } from "lucide-react"
import { exportToExcel, importFromExcel } from "@/lib/core/services/excel.service"
import { toast } from "sonner"
import { NodeName, OrganizationalUnit, NodeHierarchyRule } from "@/lib/core/interfaces/repository.interfaces"

interface Props {
  clientId: string
  clientName: string
  nodes: NodeName[]
  units: OrganizationalUnit[]
  hierarchies: NodeHierarchyRule[]
  onImport: () => void
}

export function ExcelImportExport({ clientId, clientName, nodes, units, hierarchies, onImport }: Props) {
  const handleExport = async () => {
    try {
      await exportToExcel({
        clientId,
        clientName,
        nodes,
        units,
        hierarchies,
      })
      toast.success("Dados exportados com sucesso")
    } catch (error) {
      console.error("Erro ao exportar dados:", error)
      toast.error("Erro ao exportar dados")
    }
  }

  const handleImport = async (file: File) => {
    try {
      await importFromExcel({
        clientId,
        file,
      })
      toast.success("Dados importados com sucesso")
      onImport()
    } catch (error) {
      console.error("Erro ao importar dados:", error)
      toast.error("Erro ao importar dados")
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={handleExport}>
        <Download className="w-4 h-4 mr-2" />
        Exportar
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar dados</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
              <FileSpreadsheet className="w-12 h-12 mb-4 text-muted-foreground" />
              <input
                type="file"
                accept=".xlsx"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleImport(file)
                  }
                }}
                className="hidden"
                id="excel-import"
              />
              <label
                htmlFor="excel-import"
                className="px-4 py-2 text-sm font-medium text-center border rounded-md cursor-pointer hover:bg-accent"
              >
                Selecionar arquivo
              </label>
              <p className="mt-2 text-sm text-muted-foreground">
                Selecione um arquivo Excel (.xlsx)
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 