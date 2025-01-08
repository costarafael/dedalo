"use client"

import { useMemo } from "react"
import { Edit, GripVertical, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import type { NodeName } from "@/lib/api/node-names"

interface NodeItemProps {
  node: NodeName
  onEdit?: (node: NodeName) => void
  onDelete?: (node: NodeName) => void
}

function NodeItem({ node, onEdit, onDelete }: NodeItemProps) {
  const isRoot = node.is_root
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id: node.id,
    disabled: isRoot
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center justify-between p-2 border rounded",
        isDragging && "opacity-50 border-dashed",
        isRoot && "bg-muted"
      )}
    >
      <div className="flex items-center gap-2">
        {!isRoot && (
          <Button
            variant="ghost"
            size="icon"
            className="cursor-grab"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4" />
          </Button>
        )}
        <span className="flex items-center gap-2">
          {node.name}
          {isRoot && (
            <span className="text-xs bg-primary/10 text-primary px-1 rounded">
              Root
            </span>
          )}
        </span>
      </div>
      {!isRoot && (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => onEdit?.(node)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => onDelete?.(node)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

interface NodeListProps {
  nodes: NodeName[]
  onReorder: (nodes: NodeName[]) => void
  onEdit?: (node: NodeName) => void
  onDelete?: (node: NodeName) => void
}

export function NodeList({ nodes, onReorder, onEdit, onDelete }: NodeListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const items = useMemo(() => {
    const rootNode = nodes.find(n => n.is_root)
    const otherNodes = nodes
      .filter(n => !n.is_root)
      .sort((a, b) => a.order - b.order)
    
    return rootNode ? [rootNode, ...otherNodes] : otherNodes
  }, [nodes])

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const activeNode = items.find(item => item.id === active.id)
      if (activeNode?.is_root) return

      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)

      if (newIndex === 0 && items[0]?.is_root) return

      const newOrder = arrayMove(items, oldIndex, newIndex).map((node, index) => ({
        ...node,
        order: node.is_root ? 0 : index
      }))

      onReorder(newOrder)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {items.map((node) => (
            <NodeItem
              key={node.id}
              node={node}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
} 