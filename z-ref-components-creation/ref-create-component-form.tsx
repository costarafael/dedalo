'use client'

import { useState } from 'react'
import { ComponentType, FieldType, isOptionableField, OptionableFieldType, ComponentCategory } from '@/lib/types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FieldPreview } from './field-preview'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OptionManager } from './option-manager'

interface CreateComponentFormProps {
  onSubmit: (data: FormData) => Promise<void>
  isSubmitting: boolean
}

interface FormData {
  name: string
  description: string
  type: ComponentType
  category: ComponentCategory
  config: {
    label: string
    placeholder?: string
    fieldType: FieldType
    validation?: {
      required?: boolean
      pattern?: string
      min?: number
      max?: number
      minLength?: number
      maxLength?: number
    }
    options?: string[]
    helperText?: string
  }
}

export function CreateComponentForm({ onSubmit, isSubmitting }: CreateComponentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    type: ComponentType.FIELD,
    category: 'INPUT',
    config: {
      label: '',
      placeholder: '',
      fieldType: FieldType.TEXT,
      validation: {
        required: false,
        pattern: '',
        min: undefined,
        max: undefined,
        minLength: undefined,
        maxLength: undefined
      },
      options: []
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const needsOptions = isOptionableField(formData.config.fieldType)

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Componente</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Componente</Label>
            <Select
              value={formData.type}
              onValueChange={(value: ComponentType) => setFormData(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ComponentType.FIELD}>Campo</SelectItem>
                <SelectItem value={ComponentType.FILE}>Arquivo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value: ComponentCategory) => 
                setFormData(prev => ({ ...prev, category: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ComponentCategory).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.type === ComponentType.FIELD && (
            <>
              <div className="space-y-2">
                <Label htmlFor="fieldType">Tipo do Campo</Label>
                <Select
                  defaultValue={FieldType.TEXT}
                  value={formData.config.fieldType}
                  onValueChange={(value: FieldType) => 
                    setFormData(prev => ({
                      ...prev,
                      config: { ...prev.config, fieldType: value }
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo do campo" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(FieldType).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="label">Label do Campo</Label>
                <Input
                  id="label"
                  value={formData.config.label}
                  onChange={e => 
                    setFormData(prev => ({
                      ...prev,
                      config: { ...prev.config, label: e.target.value }
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="placeholder">Placeholder</Label>
                <Input
                  id="placeholder"
                  value={formData.config.placeholder}
                  onChange={e => 
                    setFormData(prev => ({
                      ...prev,
                      config: { ...prev.config, placeholder: e.target.value }
                    }))
                  }
                />
              </div>

              {needsOptions && (
                <OptionManager
                  options={formData.config.options || []}
                  onChange={(newOptions) => 
                    setFormData(prev => ({
                      ...prev,
                      config: { ...prev.config, options: newOptions }
                    }))
                  }
                  fieldType={formData.config.fieldType as OptionableFieldType}
                />
              )}
            </>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting || (needsOptions && (!formData.config.options || formData.config.options.length === 0))}
          >
            {isSubmitting ? 'Criando...' : 'Criar Componente'}
          </Button>
        </div>

        <div className="space-y-6">
          <div className="sticky top-6">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Visualização em Tempo Real
              </h3>
              <p className="text-sm text-muted-foreground">
                Este é o preview de como seu componente ficará quando utilizado
              </p>
            </div>
            
            <FieldPreview
              config={formData.config}
              type={formData.type}
            />

            <div className="mt-4 p-3 bg-muted rounded-md">
              <h4 className="text-sm font-medium mb-2">Dicas:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• O label ajuda a identificar o campo</li>
                <li>• Use placeholders para dar exemplos</li>
                <li>• Escolha o tipo adequado ao dado</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}