"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { NodeName, OrganizationalUnit } from "@/lib/core/interfaces/repository.interfaces"
import { UnitContainerService } from "@/lib/core/services/unit-container.service"

interface Props {
  clientId: string
  nodes: NodeName[]
  units: OrganizationalUnit[]
  onCreateContainer: () => void
}

const containerService = new UnitContainerService()

export function UnitContainerManager({ clientId, nodes, units, onCreateContainer }: Props) {
  const [name, setName] = useState("")
  const [selectedNode, setSelectedNode] = useState("")
  const [selectedUnits, setSelectedUnits] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name || !selectedNode || selectedUnits.length === 0) return

    try {
      const container = await containerService.createContainer({
        client_id: clientId,
        name,
        node_name_id: selectedNode,
      })

      await Promise.all(
        selectedUnits.map(unitId =>
          containerService.addUnit(container.id, unitId)
        )
      )

      setName("")
      setSelectedNode("")
      setSelectedUnits([])
      onCreateContainer()
      toast.success("Container criado com sucesso")
    } catch (error) {
      console.error("Erro ao criar container:", error)
      toast.error("Erro ao criar container")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Container</CardTitle>
        <CardDescription>
          Agrupe unidades organizacionais em containers para facilitar a gestão
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="container-name">Nome do Container</Label>
            <Input
              id="container-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Container A"
            />
          </div>
          <div>
            <Label htmlFor="node-type">Tipo do Node</Label>
            <Select value={selectedNode} onValueChange={setSelectedNode}>
              <SelectTrigger id="node-type">
                <SelectValue placeholder="Selecione um tipo" />
              </SelectTrigger>
              <SelectContent>
                {nodes.map((node) => (
                  <SelectItem key={node.id} value={node.id}>
                    {node.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Unidades</Label>
            <div className="grid grid-cols-2 gap-2 mt-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
              {units.map((unit) => {
                const node = nodes.find(n => n.id === unit.node_name_id)
                return (
                  <div
                    key={unit.id}
                    className={`p-2 border rounded cursor-pointer ${
                      selectedUnits.includes(unit.id)
                        ? "bg-primary/10 border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedUnits(prev => {
                        if (prev.includes(unit.id)) {
                          return prev.filter(id => id !== unit.id)
                        }
                        return [...prev, unit.id]
                      })
                    }}
                  >
                    <div className="font-medium">{unit.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {node?.name}
                    </div>
                  </div>
                )
              })}
            </div>
            {selectedUnits.length > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                {selectedUnits.length} unidade(s) selecionada(s)
              </p>
            )}
          </div>
          <Button 
            type="submit" 
            disabled={!name || !selectedNode || selectedUnits.length === 0}
          >
            Criar Container
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 