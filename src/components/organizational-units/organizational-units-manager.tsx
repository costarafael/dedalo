"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, ChevronRight, ChevronDown, Trash2, Edit, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { getNodeService } from '@/lib/services/node'
import { getUnitService } from '@/lib/services/unit'
import { getNodeHierarchyService } from '@/lib/services/node-hierarchy'
import { getUnitHierarchyService } from '@/lib/services/unit-hierarchy'
import { getUnitContainerService } from '@/lib/services/unit-container'
import type { NodeName } from '@/lib/core/interfaces'
import type { OrganizationalUnit, NewOrganizationalUnit } from '@/lib/core/interfaces'
import type { UnitHierarchy } from '@/types/unit-hierarchy'
import type { UnitContainer } from '@/types/unit-container'
import { UnitSelectionMode, NodeType, HierarchyValidationType } from '@/lib/core/interfaces'
import { UnitContainerManager } from "./unit-container-manager"
import { OrganizationalUnitsLoading } from "./loading"
import { NodeList } from "./node-list"
import { ExcelImportExport } from "./excel-import-export"

interface Props {
  id: string
}

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  unit_selection_mode: z.nativeEnum(UnitSelectionMode),
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
  const [nodeHierarchyRules, setNodeHierarchyRules] = useState<any[]>([])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      unit_selection_mode: UnitSelectionMode.SINGLE,
    },
  })

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const nodeService = getNodeService()
      const unitService = getUnitService()
      
      const [nodesData, unitsData, rootUnitData, hierarchiesData, containersData] = await Promise.all([
        nodeService.getClientNodes(id),
        unitService.getClientUnits(id),
        unitService.getRootUnit(id),
        getUnitHierarchyService().getClientHierarchies(id),
        getUnitContainerService().getClientContainersWithItems(id)
      ])
      
      setNodes(nodesData)
      setUnits(unitsData)
      setRootUnit(rootUnitData)
      setHierarchies(hierarchiesData)
      setContainers(containersData)

      console.log('Loaded data:', { 
        nodes: nodesData, 
        units: unitsData, 
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
      const nodeService = getNodeService()
      await nodeService.create({
        client_id: id,
        name: data.name,
        unit_selection_mode: data.unit_selection_mode,
        order: nodes.length,
        is_root: nodes.length === 0,
        is_required: false,
        validationType: HierarchyValidationType.FLEXIBLE,
        description: '',
        metadata: {},
        unit_count: 0
      })
      
      form.reset()
      toast.success("Node criado com sucesso")
      loadData()
    } catch (error) {
      console.error("Erro ao criar node:", error)
      toast.error("Erro ao criar node")
    }
  }, [id, form, loadData, nodes.length])

  const handleCreateUnit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted:', { newUnitName, selectedNode, selectedParentUnits, rootUnit })
    
    if (!newUnitName || !selectedNode) {
      toast.error("Nome da unidade e node são obrigatórios")
      return
    }

    try {
      const unitService = getUnitService()

      // Encontra o node selecionado
      const selectedNodeData = nodes.find(node => node.id === selectedNode)
      if (!selectedNodeData) {
        toast.error("Node selecionado não encontrado")
        return
      }

      const newUnit: NewOrganizationalUnit = {
        client_id: id,
        name: newUnitName,
        node_name_id: selectedNode,
        type: NodeType.OPTION,
        depth: 0,
        order_index: 0,
        full_path: null,
        is_active: true,
        metadata: null
      }

      // Se não houver unidades pai selecionadas e existir uma unidade root, usar root como pai
      const parentUnits = selectedParentUnits.length > 0 
        ? selectedParentUnits 
        : (rootUnit ? [rootUnit.id] : [])

      console.log('Creating unit with:', { newUnit, parentUnits })
      const createdUnit = await unitService.createWithHierarchy(newUnit, parentUnits)
      console.log('Created unit:', createdUnit)

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
  }, [id, newUnitName, selectedNode, selectedParentUnits, rootUnit, loadData, nodes])

  const handleCreateContainer = useCallback(async (data: { container: any, unitIds: string[] }) => {
    console.log('handleCreateContainer called with data:', data);

    try {
      const uniqueContainerKey = crypto.randomUUID();
      console.log('Generated unique container_key:', uniqueContainerKey);

      const containerData = {
        ...data.container,
        container_key: uniqueContainerKey,
      };

      const unitContainerService = getUnitContainerService()
      await unitContainerService.createWithItems(containerData, data.unitIds)

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
      const nodeService = getNodeService()
      await nodeService.updateNodesOrder(newNodes.map(node => ({
        id: node.id,
        client_id: id,
        name: node.name,
        order: node.order,
        is_root: node.is_root
      })))
      setNodes(newNodes)
    } catch (error) {
      console.error("Erro ao reordenar nodes:", error)
      toast.error("Erro ao reordenar nodes")
    }
  }, [id])

  const handleEditNode = useCallback(async (node: NodeName) => {
    const newName = prompt("Novo nome do node:", node.name)
    if (!newName || newName === node.name) return

    try {
      const nodeService = getNodeService()
      await nodeService.update(node.id, { 
        name: newName,
        validationType: node.validationType
      })
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
      const nodeService = getNodeService()
      await nodeService.delete(node.id)
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
      const nodeService = getNodeService()
      const unitService = getUnitService()
      const unitHierarchyService = getUnitHierarchyService()

      // Criar nodes
      for (const node of data.nodes) {
        await nodeService.create({
          client_id: id,
          name: node.name || '',
          unit_selection_mode: node.unit_selection_mode || UnitSelectionMode.SINGLE,
          order: node.order || 0,
          is_root: node.is_root || false,
          is_required: node.is_required || false,
          validationType: node.validationType || HierarchyValidationType.FLEXIBLE,
          description: node.description || '',
          metadata: node.metadata || {}
        })
      }

      // Criar unidades
      for (const unit of data.units) {
        await unitService.create({
          client_id: id,
          name: unit.name || '',
          node_name_id: unit.node_name_id || '',
          type: unit.type || NodeType.OPTION,
          depth: unit.depth || 0,
          order_index: unit.order_index || 0,
          full_path: unit.full_path || null,
          is_active: unit.is_active || true,
          metadata: unit.metadata || null
        })
      }

      // Criar hierarquias
      for (const hierarchy of data.hierarchies) {
        if (hierarchy.parent_id && hierarchy.child_id) {
          await unitHierarchyService.create({
            parent_id: hierarchy.parent_id,
            child_id: hierarchy.child_id,
            is_primary: hierarchy.is_primary || false,
            is_active: hierarchy.is_active || true
          })
        }
      }

      toast.success("Dados importados com sucesso")
      loadData()
    } catch (error) {
      console.error("Erro ao importar dados:", error)
      toast.error("Erro ao importar dados")
    }
  }, [id, loadData])

  if (loading) {
    return <OrganizationalUnitsLoading />
  }

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="nodes">Nodes</TabsTrigger>
          <TabsTrigger value="units">Unidades</TabsTrigger>
          <TabsTrigger value="containers">Containers</TabsTrigger>
          <TabsTrigger value="import">Importar/Exportar</TabsTrigger>
        </TabsList>

        <TabsContent value="nodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Criar novo node</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(handleNodeSubmit)} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input 
                    id="name"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="unit_selection_mode">Modo de seleção</Label>
                  <Select 
                    onValueChange={(value) => form.setValue("unit_selection_mode", value as UnitSelectionMode)}
                    defaultValue={form.getValues("unit_selection_mode")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o modo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UnitSelectionMode.SINGLE}>Única</SelectItem>
                      <SelectItem value={UnitSelectionMode.MULTIPLE}>Múltipla</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.unit_selection_mode && (
                    <p className="text-sm text-destructive">{form.formState.errors.unit_selection_mode.message}</p>
                  )}
                </div>

                <Button type="submit">Criar node</Button>
              </form>
            </CardContent>
          </Card>

          <NodeList 
            nodes={nodes} 
            onReorder={handleReorderNodes}
            onEdit={handleEditNode}
            onDelete={handleDeleteNode}
          />
        </TabsContent>

        <TabsContent value="units" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Criar nova unidade</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateUnit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="node">Node *</Label>
                  <Select 
                    onValueChange={setSelectedNode} 
                    value={selectedNode}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o node" />
                    </SelectTrigger>
                    <SelectContent>
                      {nodes
                        .filter(node => !node.is_root) // Não permite selecionar o node root
                        .map((node) => (
                          <SelectItem key={node.id} value={node.id}>
                            {node.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="name">Nome da unidade *</Label>
                  <Input
                    id="name"
                    value={newUnitName}
                    onChange={(e) => setNewUnitName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="parent">Unidades pai (opcional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div
                        role="combobox"
                        tabIndex={0}
                        className={cn(
                          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                          selectedParentUnits.length > 0 ? "h-full" : "h-10"
                        )}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === "Space") {
                            e.preventDefault()
                            e.currentTarget.click()
                          }
                        }}
                      >
                        <div className="flex flex-wrap gap-1">
                          {selectedParentUnits.length > 0 ? (
                            selectedParentUnits.map(parentId => {
                              const unit = units.find(u => u.id === parentId)
                              return unit && (
                                <Badge 
                                  key={parentId}
                                  variant="secondary"
                                  className="mr-1 mb-1"
                                >
                                  {unit.name}
                                  <span
                                    role="button"
                                    tabIndex={0}
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter" || e.key === "Space") {
                                        e.preventDefault()
                                        setSelectedParentUnits(selectedParentUnits.filter(id => id !== parentId))
                                      }
                                    }}
                                    onMouseDown={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      setSelectedParentUnits(selectedParentUnits.filter(id => id !== parentId))
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                    <span className="sr-only">Remover {unit.name}</span>
                                  </span>
                                </Badge>
                              )
                            })
                          ) : (
                            "Selecione as unidades pai..."
                          )}
                        </div>
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Procurar unidade..." className="h-9" />
                        <CommandEmpty>Nenhuma unidade encontrada.</CommandEmpty>
                        <CommandGroup>
                          {units
                            .filter(unit => unit.id !== selectedNode) // Evita selecionar a própria unidade como pai
                            .map((unit) => (
                              <CommandItem
                                key={unit.id}
                                onSelect={() => {
                                  if (selectedParentUnits.includes(unit.id)) {
                                    setSelectedParentUnits(selectedParentUnits.filter(id => id !== unit.id))
                                  } else {
                                    setSelectedParentUnits([...selectedParentUnits, unit.id])
                                  }
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    checked={selectedParentUnits.includes(unit.id)}
                                    onChange={() => {}}
                                    onClick={(e) => e.stopPropagation()}
                                    className="h-4 w-4"
                                  />
                                  {unit.name}
                                </div>
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <Button 
                  type="submit" 
                  disabled={!selectedNode || !newUnitName}
                >
                  Criar unidade
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Unidades organizacionais</CardTitle>
            </CardHeader>
            <CardContent>
              {units.length === 0 ? (
                <p className="text-muted-foreground">Nenhuma unidade encontrada</p>
              ) : (
                <div className="space-y-2">
                  {units.map((unit) => {
                    const parents = getUnitParents(unit.id)
                    const children = getUnitChildren(unit.id)
                    const isExpanded = true

                    return (
                      <div key={unit.id} className="space-y-2">
                        <div className="flex items-center gap-2">
                          {children.length > 0 && (
                            <Button variant="ghost" size="icon" className="size-6">
                              {isExpanded ? (
                                <ChevronDown className="size-4" />
                              ) : (
                                <ChevronRight className="size-4" />
                              )}
                            </Button>
                          )}
                          <span className="font-medium">{unit.name}</span>
                          {parents.length > 0 && (
                            <span className="text-sm text-muted-foreground">
                              (Pai: {parents.map(p => p.name).join(", ")})
                            </span>
                          )}
                        </div>

                        {isExpanded && children.length > 0 && (
                          <div className="ml-6 space-y-2 border-l pl-4">
                            {children.map((child) => (
                              <div key={child.id} className="flex items-center gap-2">
                                <span>{child.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="containers" className="space-y-4">
          <UnitContainerManager
            clientId={id}
            nodes={nodes}
            units={units}
            onCreateContainer={handleCreateContainer}
          />
        </TabsContent>

        <TabsContent value="import" className="space-y-4">
          <ExcelImportExport
            clientId={id}
            clientName={rootUnit?.name || "cliente"}
            nodes={nodes}
            units={units}
            hierarchies={hierarchies}
            onImport={handleImportExcel}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
} 