"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { getUnitContainers } from "@/lib/api/unit-containers"

import type { OrganizationalUnit } from "@/lib/api/organizational-units"
import type { NodeName } from "@/lib/api/node-names"

interface Props {
  clientId: string
  nodes: NodeName[]
  units: OrganizationalUnit[]
  onCreateContainer: (container: any) => Promise<void>
}

export function UnitContainerManager({ clientId, nodes, units, onCreateContainer }: Props) {
  console.log('UnitContainerManager rendered with props:', { clientId, nodes, units })

  const [containers, setContainers] = useState<UnitContainer[]>([])
  const [selectedUnits, setSelectedUnits] = useState<string[]>([])
  const [containerName, setContainerName] = useState("")
  const [containerKey, setContainerKey] = useState("")

  useEffect(() => {
    console.log('UnitContainerManager useEffect called')
    loadContainers()
  }, [clientId])

  const loadContainers = useCallback(async () => {
    console.log('Loading containers for client:', clientId)
    try {
      const data = await getUnitContainers(clientId)
      console.log('Loaded containers:', data)
      setContainers(data)
    } catch (error) {
      console.error("Erro ao carregar containers:", error)
      toast.error("Erro ao carregar containers")
    }
  }, [clientId])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('handleSubmit called with containerName:', containerName)
    console.log('handleSubmit called with containerKey:', containerKey)
    console.log('handleSubmit called with selectedUnits:', selectedUnits)

    if (!containerName || !containerKey || selectedUnits.length === 0) {
      toast.error("Por favor, preencha todos os campos e selecione pelo menos uma unidade")
      return
    }

    try {
      const newContainer = {
        id: crypto.randomUUID(),
        client_id: clientId,
        name: containerName,
        container_key: containerKey,
        updated_at: new Date().toISOString(),
        deleted_at: null,
      }

      await onCreateContainer({ container: newContainer, unitIds: selectedUnits })

      setContainerName("")
      setContainerKey("")
      setSelectedUnits([])
    } catch (error) {
      console.error("Erro ao criar container:", error)
      toast.error("Erro ao criar container")
    }
  }, [clientId, containerName, containerKey, selectedUnits, onCreateContainer])

  console.log('UnitContainerManager rendering with state:', { containers, selectedUnits, containerName, containerKey })

  function handleUnitSelect(unitId: string) {
    setSelectedUnits(prev => {
      if (prev.includes(unitId)) {
        return prev.filter(id => id !== unitId)
      }
      return [...prev, unitId]
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Containers</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="containerName">Nome do Container</Label>
            <Input
              id="containerName"
              value={containerName}
              onChange={(e) => setContainerName(e.target.value)}
              placeholder="Ex: Container A"
            />
          </div>

          <div>
            <Label>Selecione as Unidades</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {units.map((unit) => (
                <div
                  key={unit.id}
                  className={`
                    p-2 border rounded cursor-pointer
                    ${selectedUnits.includes(unit.id) ? "bg-primary/10 border-primary" : ""}
                  `}
                  onClick={() => handleUnitSelect(unit.id)}
                >
                  <div className="font-medium">{unit.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ({nodes.find(n => n.id === unit.node_name_id)?.name})
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={!containerName || selectedUnits.length === 0}>
            <Plus className="w-4 h-4 mr-2" />
            Criar Container
          </Button>
        </form>

        {containers.map((container) => (
          <div key={container.id} className="mt-4">
            <h3 className="font-medium">{container.name}</h3>
            <p className="text-sm text-muted-foreground">
              Unidades: {container.items?.map(item => item.unit.name).join(", ")}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
} 