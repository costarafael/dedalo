"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, ChevronRight, ChevronDown, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { getNodeNames, createNodeName, type NodeName, updateNodeOrder, updateNodeName, deleteNodeName } from "@/lib/api/node-names"
import { 
  getOrganizationalUnits, 
  createOrganizationalUnit, 
  getRootUnit, 
  type OrganizationalUnit,
  type NewOrganizationalUnit 
} from "@/lib/api/organizational-units"
import { getNodeHierarchyRules, createNodeHierarchyRule } from "@/lib/api/node-hierarchies"
import { getUnitHierarchies, createUnitHierarchy, type UnitHierarchy } from "@/lib/api/unit-hierarchies"
import { getUnitContainers, createUnitContainer, type UnitContainer } from "@/lib/api/unit-containers"
import { UnitContainerManager } from "./unit-container-manager"
import { OrganizationalUnitsLoading } from "./loading"
import { NodeList } from "./node-list"
import { ExcelImportExport } from "./excel-import-export"

interface Props {
  id: string
}

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  unit_selection_mode: z.enum(["single", "multiple"]),
})

type FormData = z.infer<typeof formSchema>

export function OrganizationalUnitsManager({ id }: Props) {
  const [nodes, setNodes] = useState<NodeName[]>([])
  const [units, setUnits] = useState<OrganizationalUnit[]>([])
  const [containers, setContainers] = useState<UnitContainer[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNode, setSelectedNode] = useState<string>("")
  const [newNodeName, setNewNodeName] = useState("")
  const [newUnitName, setNewUnitName] = useState("")
  const [selectedParentUnits, setSelectedParentUnits] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("nodes")
  const [rootUnit, setRootUnit] = useState<OrganizationalUnit | null>(null)
  const [hierarchies, setHierarchies] = useState<UnitHierarchy[]>([])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      unit_selection_mode: "single",
    },
  })

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const [nodesData, unitsData, containersData, rootUnitData, hierarchiesData] = await Promise.all([
        getNodeNames(id),
        getOrganizationalUnits(id),
        getUnitContainers(id),
        getRootUnit(id),
        getUnitHierarchies(id)
      ])
      setNodes(nodesData)
      setUnits(unitsData)
      setContainers(containersData)
      setRootUnit(rootUnitData)
      setHierarchies(hierarchiesData)

      console.log('Loaded data:', { 
        nodes: nodesData, 
        units: unitsData, 
        containers: containersData, 
        rootUnit: rootUnitData, 
        hierarchies: hierarchiesData 
      })
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      toast.error("Erro ao carregar dados")
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleNodeNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNodeName(e.target.value)
  }, [])

  const handleNodeSubmit = useCallback(async (data: FormData) => {
    try {
      await createNodeName({
        client_id: id,
        name: data.name,
        unit_selection_mode: data.unit_selection_mode,
      })
      
      form.reset()
      toast.success("Node criado com sucesso")
      loadData()
    } catch (error) {
      console.error("Erro ao criar node:", error)
      toast.error("Erro ao criar node")
    }
  }, [id, form, loadData])

  const handleCreateUnit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newUnitName || !selectedNode) return

    try {
      const newUnit: NewOrganizationalUnit = {
        id: crypto.randomUUID(),
        client_id: id,
        name: newUnitName,
        node_name_id: selectedNode,
        type: "OPTION" as const,
        updated_at: new Date().toISOString(),
        is_active: true,
        deleted_at: null
      }

      const createdUnit = await createOrganizationalUnit(newUnit)

      // Se não houver unidades pai selecionadas e existir uma unidade root, usar root como pai
      const parentUnits = selectedParentUnits.length > 0 
        ? selectedParentUnits 
        : (rootUnit ? [rootUnit.id] : [])

      await Promise.all(parentUnits.map(async (parentId, index) => {
        await createUnitHierarchy({
          id: crypto.randomUUID(),
          parent_id: parentId,
          child_id: createdUnit.id,
          is_primary: index === 0,
          updated_at: new Date().toISOString(),
          is_active: true,
          deleted_at: null
        })
      }))

      setNewUnitName("")
      setSelectedParentUnits([])
      setSelectedNode("")
      toast.success("Unidade organizacional criada com sucesso")
      loadData()
    } catch (error) {
      console.error("Erro ao criar unidade:", error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Erro ao criar unidade")
      }
    }
  }, [id, newUnitName, selectedNode, selectedParentUnits, rootUnit, loadData])

  const handleCreateContainer = useCallback(async (data: { container: any, unitIds: string[] }) => {
    console.log('handleCreateContainer called with data:', data);

    try {
      const uniqueContainerKey = crypto.randomUUID();
      console.log('Generated unique container_key:', uniqueContainerKey);

      const containerData = {
        ...data.container,
        container_key: uniqueContainerKey,
      };

      await createUnitContainer(containerData, data.unitIds);

      console.log('Container created successfully');
      toast.success("Container criado com sucesso");
      loadData();
    } catch (error) {
      console.error("Erro ao criar container:", error);
      toast.error("Erro ao criar container");
    }

    console.log('handleCreateContainer finished')
  }, [loadData]);

  const getUnitParents = useCallback((unitId: string) => {
    return hierarchies
      .filter(h => h.child_id === unitId)
      .map(h => units.find(u => u.id === h.parent_id))
      .filter((parent): parent is OrganizationalUnit => parent !== undefined)
  }, [hierarchies, units])

  const getUnitChildren = useCallback((unitId: string) => {
    return hierarchies
      .filter(h => h.parent_id === unitId)
      .map(h => units.find(u => u.id === h.child_id))
      .filter((child): child is OrganizationalUnit => child !== undefined)
  }, [hierarchies, units])

  const handleReorderNodes = useCallback(async (newNodes: NodeName[]) => {
    try {
      await updateNodeOrder(newNodes)
      setNodes(newNodes)
    } catch (error) {
      console.error("Erro ao reordenar nodes:", error)
      toast.error("Erro ao reordenar nodes")
    }
  }, [])

  const handleEditNode = useCallback(async (node: NodeName) => {
    const newName = prompt("Novo nome do node:", node.name)
    if (!newName || newName === node.name) return

    try {
      await updateNodeName(node.id, { name: newName })
      toast.success("Node atualizado com sucesso")
      loadData()
    } catch (error) {
      console.error("Erro ao editar node:", error)
      toast.error("Erro ao editar node")
    }
  }, [loadData])

  const handleDeleteNode = useCallback(async (node: NodeName) => {
    if (!confirm(`Tem certeza que deseja excluir o node "${node.name}"?`)) return

    try {
      await deleteNodeName(node.id)
      toast.success("Node excluído com sucesso")
      loadData()
    } catch (error) {
      console.error("Erro ao excluir node:", error)
      toast.error("Erro ao excluir node")
    }
  }, [loadData])

  const handleImportExcel = useCallback(async (data: {
    nodes: Partial<NodeName>[]
    units: Partial<OrganizationalUnit>[]
    hierarchies: Partial<UnitHierarchy>[]
  }) => {
    try {
      // Criar nodes
      await Promise.all(data.nodes.map(async (node) => {
        if (!node.name) return
        await createNodeName({
          client_id: id,
          name: node.name,
          description: node.description,
          validationType: node.validationType,
          is_required: node.is_required,
        })
      }))

      // Criar unidades
      const createdUnits = await Promise.all(data.units.map(async (unit) => {
        if (!unit.name || !unit.node_name_id) return null
        return await createOrganizationalUnit({
          id: crypto.randomUUID(),
          client_id: id,
          name: unit.name,
          node_name_id: unit.node_name_id,
          type: unit.type || "OPTION",
          is_active: unit.is_active ?? true,
          updated_at: new Date().toISOString(),
          deleted_at: null
        })
      }))

      // Criar hierarquias
      await Promise.all(data.hierarchies.map(async (hierarchy) => {
        if (!hierarchy.parent_id || !hierarchy.child_id) return
        await createUnitHierarchy({
          id: crypto.randomUUID(),
          parent_id: hierarchy.parent_id,
          child_id: hierarchy.child_id,
          is_primary: hierarchy.is_primary ?? false,
          is_active: hierarchy.is_active ?? true,
          updated_at: new Date().toISOString(),
          deleted_at: null
        })
      }))

      loadData()
    } catch (error) {
      console.error("Erro ao importar dados:", error)
      throw error
    }
  }, [id, loadData])

  if (loading) {
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
          onImport={handleImportExcel}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="nodes" className="flex-1">Nodes</TabsTrigger>
          <TabsTrigger value="units" className="flex-1">Unidades</TabsTrigger>
          <TabsTrigger value="containers" className="flex-1">Containers</TabsTrigger>
        </TabsList>

        <TabsContent value="nodes" className="space-y-4">
          <form onSubmit={form.handleSubmit(handleNodeSubmit)} className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="node-name">Nome do Node</Label>
              <Input
                id="node-name"
                {...form.register("name")}
                placeholder="Ex: Empreendimento"
              />
            </div>
            <div>
              <Label htmlFor="unit-selection-mode">Modo de Seleção</Label>
              <Select 
                onValueChange={(value: "single" | "multiple") => form.setValue("unit_selection_mode", value)}
                defaultValue={form.getValues("unit_selection_mode")}
              >
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
              <Plus className="w-4 h-4 mr-2" />
              Criar Node
            </Button>
          </form>

          <NodeList
            nodes={nodes}
            onReorder={handleReorderNodes}
            onEdit={handleEditNode}
            onDelete={handleDeleteNode}
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
              <Plus className="w-4 h-4 mr-2" />
              Criar Unidade
            </Button>
          </form>

          <div className="space-y-2">
            {units.map((unit) => {
              const parents = getUnitParents(unit.id)
              const children = getUnitChildren(unit.id)
              const node = nodes.find((n) => n.id === unit.node_name_id)
              const primaryParent = parents.find(p => 
                hierarchies.find(h => 
                  h.parent_id === p.id && 
                  h.child_id === unit.id && 
                  h.is_primary
                )
              )

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
                              {p.id === primaryParent?.id && (
                                <span className="text-xs bg-primary/10 text-primary px-1 rounded ml-1">
                                  Principal
                                </span>
                              )}
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
            onCreateContainer={handleCreateContainer}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 