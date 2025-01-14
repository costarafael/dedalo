"use client"

import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNodeHierarchies } from "@/lib/http/hooks/use-node-hierarchies"
import { useOrganizationalUnits } from "@/lib/http/hooks/use-organizational-units"
import { ExcelImportExport } from "./excel-import-export"
import { UnitContainerManager } from "./unit-container-manager"
import { OrganizationalUnitsLoading } from "./loading"
import { NodeList } from "./node-list"
import { NodeName } from "@/lib/core/interfaces/repository.interfaces"

interface Props {
  id: string
}

export function OrganizationalUnitsManager({ id }: Props) {
  const queryClient = useQueryClient()
  const [selectedNode, setSelectedNode] = useState("")
  const [newUnitName, setNewUnitName] = useState("")
  const [selectedParentUnits, setSelectedParentUnits] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("nodes")

  const { hierarchies, isLoading: isLoadingHierarchies, createHierarchy } = useNodeHierarchies()
  const { 
    nodes, 
    units, 
    rootUnit, 
    isLoading,
    createNode,
    updateNodeOrder,
    updateNode,
    deleteNode,
    createUnit
  } = useOrganizationalUnits(id)

  const handleNodeSubmit = (data: { name: string, unit_selection_mode: "single" | "multiple" }) => {
    createNode(data)
  }

  const handleCreateUnit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newUnitName || !selectedNode) return

    createUnit({
      name: newUnitName,
      node_name_id: selectedNode,
    }, {
      onSuccess: (newUnit) => {
        // Criar hierarquias para cada unidade pai selecionada
        if (selectedParentUnits.length > 0) {
          selectedParentUnits.forEach(parentId =>
            createHierarchy({
              parent_node_id: parentId,
              child_node_id: newUnit.id,
            })
          )
        } else if (rootUnit) {
          // Se nenhuma unidade pai foi selecionada, criar hierarquia com a unidade raiz
          createHierarchy({
            parent_node_id: rootUnit.id,
            child_node_id: newUnit.id,
          })
        }

        setNewUnitName("")
        setSelectedParentUnits([])
        setSelectedNode("")
      }
    })
  }

  const handleEditNode = (node: NodeName) => {
    const newName = prompt("Novo nome do node:", node.name)
    if (!newName || newName === node.name) return

    updateNode({ id: node.id, data: { name: newName } })
  }

  if (isLoading || isLoadingHierarchies) {
    return <OrganizationalUnitsLoading />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <ExcelImportExport
          clientId={id}
          clientName={rootUnit?.name || "cliente"}
          nodes={nodes}
          units={units}
          hierarchies={hierarchies}
          onImport={() => {
            queryClient.invalidateQueries({ queryKey: ["nodes", id] })
            queryClient.invalidateQueries({ queryKey: ["units", id] })
            queryClient.invalidateQueries({ queryKey: ["node-hierarchies"] })
          }}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="nodes" className="flex-1">Nodes</TabsTrigger>
          <TabsTrigger value="units" className="flex-1">Unidades</TabsTrigger>
          <TabsTrigger value="containers" className="flex-1">Containers</TabsTrigger>
        </TabsList>

        <TabsContent value="nodes" className="space-y-4">
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handleNodeSubmit({
              name: formData.get("name") as string,
              unit_selection_mode: formData.get("unit_selection_mode") as "single" | "multiple"
            })
            e.currentTarget.reset()
          }} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="node-name">Nome do Node</Label>
              <Input
                id="node-name"
                name="name"
                placeholder="Ex: Empreendimento"
              />
            </div>
            <div>
              <Label htmlFor="unit-selection-mode">Modo de Seleção</Label>
              <Select name="unit_selection_mode" defaultValue="single">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um modo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Única</SelectItem>
                  <SelectItem value="multiple">Múltipla</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="mt-8">
              Criar Node
            </Button>
          </form>

          <NodeList
            nodes={nodes}
            onReorder={updateNodeOrder}
            onEdit={handleEditNode}
            onDelete={deleteNode}
          />
        </TabsContent>

        <TabsContent value="units" className="space-y-4">
          <form onSubmit={handleCreateUnit} className="flex gap-4">
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="unit-name">Nome da Unidade</Label>
                <Input
                  id="unit-name"
                  value={newUnitName}
                  onChange={(e) => setNewUnitName(e.target.value)}
                  placeholder="Ex: Unidade A"
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
                <Label htmlFor="parent-units">Unidades Pai</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
                  {rootUnit && (
                    <div
                      className={`p-2 border rounded cursor-pointer ${
                        selectedParentUnits.includes(rootUnit.id)
                          ? "bg-primary/10 border-primary"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedParentUnits(prev => {
                          if (prev.includes(rootUnit.id)) {
                            return prev.filter(id => id !== rootUnit.id)
                          }
                          return [rootUnit.id, ...prev]
                        })
                      }}
                    >
                      <div className="font-medium">{rootUnit.name}</div>
                      <div className="text-xs text-muted-foreground">(Root)</div>
                    </div>
                  )}
                  {units
                    .filter(unit => unit.id !== rootUnit?.id)
                    .map((unit) => {
                    const node = nodes.find(n => n.id === unit.node_name_id)
                    return (
                      <div
                        key={unit.id}
                        className={`p-2 border rounded cursor-pointer ${
                          selectedParentUnits.includes(unit.id)
                            ? "bg-primary/10 border-primary"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedParentUnits(prev => {
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
                    )}
                  )}
                </div>
                {selectedParentUnits.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {selectedParentUnits.length} unidade(s) selecionada(s)
                  </p>
                )}
              </div>
            </div>
            <Button 
              type="submit" 
              className="mt-8"
              disabled={!newUnitName || !selectedNode}
            >
              Criar Unidade
            </Button>
          </form>

          <div className="space-y-2">
            {units.map((unit) => {
              const parents = units.filter(u => 
                hierarchies.some(h => h.parent_node_id === u.id && h.child_node_id === unit.id)
              )
              const children = units.filter(u => 
                hierarchies.some(h => h.parent_node_id === unit.id && h.child_node_id === u.id)
              )
              const node = nodes.find((n) => n.id === unit.node_name_id)

              return (
                <div key={unit.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{unit.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Tipo: {node?.name}
                      </p>
                    </div>
                  </div>
                  {(parents.length > 0 || children.length > 0) && (
                    <div className="mt-2 space-y-2">
                      {parents.length > 0 && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Pais:</span>{" "}
                          {parents.map((p, i) => (
                            <span key={p.id}>
                              {p.name}
                              {i < parents.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </div>
                      )}
                      {children.length > 0 && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Filhos:</span>{" "}
                          {children.map((c) => c.name).join(", ")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="containers">
          <UnitContainerManager
            clientId={id}
            nodes={nodes}
            units={units}
            onCreateContainer={() => {
              queryClient.invalidateQueries({ queryKey: ["nodes", id] })
              queryClient.invalidateQueries({ queryKey: ["units", id] })
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 