"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Upload, FileSpreadsheet } from "lucide-react"
import { exportToExcel, importFromExcel } from "@/lib/services/excel-service"
import { toast } from "sonner"
import type { NodeName } from "@/lib/api/node-names"
import type { OrganizationalUnit } from "@/lib/api/organizational-units"
import type { UnitHierarchy } from '@/types/unit-hierarchy'

interface Props {
  clientId: string
  clientName: string
  nodes: NodeName[]
  units: OrganizationalUnit[]
  hierarchies: UnitHierarchy[]
  onImport: (data: {
    nodes: Partial<NodeName>[]
    units: Partial<OrganizationalUnit>[]
    hierarchies: Partial<UnitHierarchy>[]
  }) => Promise<void>
}

export function ExcelImportExport({
  clientId,
  clientName,
  nodes,
  units,
  hierarchies,
  onImport
}: Props) {
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [importDialogOpen, setImportDialogOpen] = useState(false)

  async function handleExport() {
    try {
      setIsExporting(true)
      exportToExcel({ nodes, units, hierarchies }, clientName)
      toast.success("Arquivo exportado com sucesso!")
    } catch (error) {
      console.error("Erro ao exportar:", error)
      toast.error("Erro ao exportar arquivo")
    } finally {
      setIsExporting(false)
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsImporting(true)
      const result = await importFromExcel(file)

      if (result.errors.length > 0) {
        toast.error(
          <div className="space-y-2">
            <p>Erros ao importar arquivo:</p>
            <ul className="list-disc pl-4">
              {result.errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )
        return
      }

      await onImport(result)
      toast.success("Arquivo importado com sucesso!")
      setImportDialogOpen(false)
    } catch (error) {
      console.error("Erro ao importar:", error)
      toast.error("Erro ao importar arquivo")
    } finally {
      setIsImporting(false)
      e.target.value = "" // Limpa o input
    }
  }

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <>Exportando...</>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Exportar Excel
          </>
        )}
      </Button>

      <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Importar Excel
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Importar Estrutura</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="excel-file">Selecione o arquivo Excel</Label>
              <Input
                id="excel-file"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleImport}
                disabled={isImporting}
              />
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>O arquivo deve conter as seguintes abas:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Nodes</li>
                <li>Unidades</li>
                <li>Hierarquias</li>
              </ul>
              <p>
                Faça primeiro uma exportação para ver o formato correto do arquivo.
              </p>
            </div>
            {isImporting && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileSpreadsheet className="w-4 h-4 animate-pulse" />
                Importando...
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 