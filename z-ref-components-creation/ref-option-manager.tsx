'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { OptionableFieldType } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, X, GripVertical } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface SortableItemProps {
  id: string
  option: string
  onRemove: () => void
}

function SortableItem({ id, option, onRemove }: SortableItemProps) {
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
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center space-x-2"
    >
      <button
        type="button"
        className="cursor-grab p-1 hover:bg-muted rounded"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </button>
      <div className="flex-1 text-sm p-2 bg-muted rounded-md">
        {option}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}

interface OptionManagerProps {
  options: string[]
  onChange: (options: string[]) => void
  fieldType: OptionableFieldType
}

export function OptionManager({ options, onChange, fieldType }: OptionManagerProps) {
  const [newOption, setNewOption] = useState('')
  const [showBulkDialog, setShowBulkDialog] = useState(false)
  const [bulkText, setBulkText] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = options.indexOf(active.id as string)
      const newIndex = options.indexOf(over.id as string)
      
      onChange(arrayMove(options, oldIndex, newIndex))
    }
  }

  const handleAddOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      onChange([...options, newOption.trim()])
      setNewOption('')
    }
  }

  const handleRemoveOption = (indexToRemove: number) => {
    onChange(options.filter((_, index) => index !== indexToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddOption()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    const lines = pastedText.split(/[\n,]/).map(line => line.trim()).filter(Boolean)

    if (lines.length > 1) {
      setBulkText(pastedText)
      setShowBulkDialog(true)
    } else {
      setNewOption(pastedText)
    }
  }

  const handleBulkAdd = () => {
    const uniqueOptions = Array.from(
      new Set(
        bulkText
          .split(/[\n,]/)
          .map(line => line.trim())
          .filter(Boolean)
      )
    )

    const newOptions = uniqueOptions.filter(option => !options.includes(option))

    onChange([...options, ...newOptions])
    setShowBulkDialog(false)
    setBulkText('')
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>
          Opções para {fieldType === 'SELECT' ? 'Seleção' : fieldType === 'RADIO' ? 'Radio Button' : 'Checkbox'}
        </Label>
        
        <div className="flex space-x-2">
          <Input
            value={newOption}
            onChange={e => setNewOption(e.target.value)}
            onKeyPress={handleKeyPress}
            onPaste={handlePaste}
            placeholder="Digite uma opção e pressione Enter"
            className="flex-1"
          />
          <Button 
            type="button" 
            onClick={handleAddOption}
            disabled={!newOption.trim()}
            size="icon"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Dica: Você pode colar (Ctrl+V) uma lista de opções diretamente aqui
        </p>
      </div>

      {/* Lista de opções ordenável */}
      <div className="space-y-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={options}
            strategy={verticalListSortingStrategy}
          >
            {options.map((option) => (
              <SortableItem
                key={option}
                id={option}
                option={option}
                onRemove={() => handleRemoveOption(options.indexOf(option))}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Dialog para adicionar múltiplas opções */}
      <Dialog open={showBulkDialog} onOpenChange={setShowBulkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Múltiplas Opções</DialogTitle>
            <DialogDescription>
              Cole sua lista de opções abaixo. Cada linha ou item separado por vírgula será uma nova opção.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Cole sua lista de opções</Label>
              <Textarea
                value={bulkText}
                onChange={e => setBulkText(e.target.value)}
                placeholder="Uma opção por linha ou separadas por vírgula"
                rows={10}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowBulkDialog(false)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={handleBulkAdd}
                disabled={!bulkText.trim()}
              >
                Adicionar Opções
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}