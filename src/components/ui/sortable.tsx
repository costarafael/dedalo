"use client"

import * as React from "react"
import { type UniqueIdentifier } from "@dnd-kit/core"
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { cn } from "@/lib/utils"

interface SortableProps<T extends { id: UniqueIdentifier }> {
  items: T[]
  onItemsChange: (items: T[]) => void
  onDragEnd?: () => void
  handle?: boolean
  children: React.ReactNode
}

export function Sortable<T extends { id: UniqueIdentifier }>({
  items,
  onItemsChange,
  onDragEnd,
  handle = false,
  children,
}: SortableProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)

      onItemsChange(arrayMove(items, oldIndex, newIndex))
    }

    onDragEnd?.()
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((item) => item.id)}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

interface SortableItemProps {
  id: UniqueIdentifier
  children: React.ReactNode
}

export function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("relative", isDragging && "z-50")}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  )
}

interface SortableDragHandleProps {
  children: React.ReactNode
}

export function SortableDragHandle({ children }: SortableDragHandleProps) {
  return (
    <div className="cursor-grab active:cursor-grabbing" role="button" tabIndex={0}>
      {children}
    </div>
  )
}
