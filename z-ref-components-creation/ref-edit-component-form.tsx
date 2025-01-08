'use client'

import { useState } from 'react'
import { ComponentType, FieldType, ComponentConfig, ComponentData, isOptionableField, OptionableFieldType } from '@/lib/types'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { FieldPreview } from './field-preview'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { OptionManager } from './option-manager'

interface EditComponentFormProps {
  component: ComponentData
  onSubmit: (data: { config: ComponentConfig }) => Promise<void>
  isSubmitting: boolean
}

export function EditComponentForm({ component, onSubmit, isSubmitting }: EditComponentFormProps) {
  const [formData, setFormData] = useState({
    config: {
      label: component.config.label || '',
      placeholder: component.config.placeholder || '',
      fieldType: component.config.fieldType || FieldType.TEXT,
      validation: component.config.validation || {
        required: false,
        pattern: '',
        min: undefined,
        max: undefined,
        minLength: undefined,
        maxLength: undefined
      },
      options: component.config.options || []
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
            <Label>Tipo do Componente</Label>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">
                {component.type === ComponentType.FIELD ? 'Campo' : 'Arquivo'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                (não editável)
              </span>
            </div>
          </div>

          {component.type === ComponentType.FIELD && (
            <>
              <div className="space-y-2">
                <Label htmlFor="fieldType">Tipo do Campo</Label>
                <Select
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
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
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
              type={component.type}
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