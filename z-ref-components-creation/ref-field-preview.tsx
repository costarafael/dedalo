'use client'
import { useState, forwardRef, useEffect } from 'react'
import { ComponentType, FieldType } from '@/lib/types'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { IMaskInput } from 'react-imask'
import type { InputProps } from "@/components/ui/input"
import { MaskedInput as BaseMaskedInput } from '@/components/ui/masked-input'
import { cn } from '@/lib/utils'

// Definindo o tipo para as props do IMaskInput
type MaskedInputProps = {
  mask: string
  value?: string
  onAccept?: (value: string, mask: any) => void
  placeholder?: string
  className?: string
}

// Renomeando o componente local para CustomMaskedInput
const CustomMaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>((props, ref) => {
  const { mask, value, onAccept, placeholder, className } = props

  return (
    <IMaskInput
      mask={mask}
      value={value}
      onAccept={onAccept}
      placeholder={placeholder}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
    />
  )
})

CustomMaskedInput.displayName = 'CustomMaskedInput'

interface FieldPreviewProps {
  config: {
    label: string
    placeholder?: string
    fieldType: FieldType
    options?: string[]
    helperText?: string
    validation?: {
      required?: boolean
      pattern?: string
      min?: number
      max?: number
      minLength?: number
      maxLength?: number
    }
  }
  type: ComponentType
}

export function FieldPreview({ config, type }: FieldPreviewProps) {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    setValue('')
    setError('')
  }, [config.fieldType])

  const validateField = (value: string, type: FieldType) => {
    if (!value && config.validation?.required) {
      setError('Este campo é obrigatório')
      return
    }

    switch (type) {
      case FieldType.EMAIL:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          setError('Email inválido')
          return
        }
        break

      case FieldType.NUMBER:
        const num = Number(value)
        if (config.validation?.min !== undefined && num < config.validation.min) {
          setError(`Valor mínimo: ${config.validation.min}`)
          return
        }
        if (config.validation?.max !== undefined && num > config.validation.max) {
          setError(`Valor máximo: ${config.validation.max}`)
          return
        }
        break

      case FieldType.TEXT:
      case FieldType.TEXTAREA:
        if (config.validation?.minLength && value.length < config.validation.minLength) {
          setError(`Mínimo de ${config.validation.minLength} caracteres`)
          return
        }
        if (config.validation?.maxLength && value.length > config.validation.maxLength) {
          setError(`Máximo de ${config.validation.maxLength} caracteres`)
          return
        }
        break

      case FieldType.URL:
        try {
          new URL(value)
        } catch {
          setError('URL inválida')
          return
        }
        break

      case FieldType.TIME:
        if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
          setError('Formato inválido. Use HH:mm')
          return
        }
        break

      case FieldType.DATETIME:
        const date = new Date(value)
        if (isNaN(date.getTime())) {
          setError('Data/hora inválida')
          return
        }
        break
    }

    setError('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    setValue(newValue)
    validateField(newValue, config.fieldType)
  }

  const getDefaultPlaceholder = (fieldType: FieldType): string => {
    const now = new Date()
    const placeholders: Record<string, string> = {
      TEXT: "Digite aqui...",
      EMAIL: "seu@email.com",
      NUMBER: "0",
      PHONE: "(00) 00000-0000",
      DATE: format(new Date(), 'P', { locale: ptBR }),
      SELECT: "Selecione uma opção",
      CHECKBOX: "Marque esta opção",
      TEXTAREA: "Digite seu texto aqui...",
      PASSWORD: "••••••••",
      URL: "https://exemplo.com",
      TEL: "(00) 0000-0000",
      TIME: format(now, 'HH:mm'),
      DATETIME: format(now, 'dd/MM/yyyy HH:mm', { locale: ptBR }),
      SWITCH: "Ativar/Desativar",
      RADIO: "Selecione uma opção",
      FILE: "Selecione um arquivo",
      COLOR: "#000000"
    }

    return placeholders[fieldType] || "Digite aqui..."
  }

  const renderField = () => {
    const commonInputProps = {
      placeholder: config.placeholder || getDefaultPlaceholder(config.fieldType),
      className: `bg-background/50 hover:bg-background/80 transition-colors ${error ? 'border-red-500' : ''}`,
      value,
      onChange: handleChange,
      onBlur: () => validateField(value, config.fieldType)
    }

    switch (config.fieldType) {
      case FieldType.TEXT:
        return <Input type="text" {...commonInputProps} />
      
      case FieldType.EMAIL:
        return <Input type="email" {...commonInputProps} placeholder={config.placeholder || "email@exemplo.com"} />
      
      case FieldType.NUMBER:
        return <Input type="number" {...commonInputProps} placeholder={config.placeholder || "0"} />
      
      case FieldType.PHONE:
        return (
          <Input
            type="tel"
            {...commonInputProps}
            value={value}
            onChange={(e) => {
              const val = e.target.value
              // Mantém 9 dígitos para celular
              const formatted = val
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d)/g, '($1) $2')
                .replace(/(\d{5})(\d)/, '$1-$2')
                .substring(0, 15)
              setValue(formatted)
              validateField(formatted, config.fieldType)
            }}
          />
        )
      
      case FieldType.DATE:
        return <Input type="date" {...commonInputProps} />
      
      case FieldType.TIME:
        return (
          <Input 
            type="time" 
            {...commonInputProps}
            onChange={(e) => {
              const val = e.target.value
              // Armazena internamente no formato HH:mm (padrão ISO)
              setValue(val)
              validateField(val, config.fieldType)
            }}
          />
        )
      
      case FieldType.DATETIME:
        return (
          <Input 
            type="datetime-local" 
            {...commonInputProps}
            onChange={(e) => {
              const val = e.target.value
              // O input datetime-local já retorna no formato ISO
              setValue(val)
              validateField(val, config.fieldType)
            }}
          />
        )
      
      case FieldType.SELECT:
        return (
          <Select>
            <SelectTrigger className={commonInputProps.className}>
              <SelectValue placeholder={config.placeholder || "Selecione uma opção"} />
            </SelectTrigger>
            <SelectContent>
              {config.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case FieldType.RADIO:
        return (
          <RadioGroup className="flex flex-col space-y-1">
            {config.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} />
                <span className="text-sm">{option}</span>
              </div>
            ))}
          </RadioGroup>
        )
      
      case FieldType.CHECKBOX:
        return (
          <div className="space-y-2">
            {config.options && config.options.length > 0 ? (
              // Renderiza múltiplos checkboxes quando há opções
              config.options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox id={`checkbox-${option}`} />
                  <Label 
                    htmlFor={`checkbox-${option}`}
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))
            ) : (
              // Fallback para um único checkbox quando não há opções
              <div className="flex items-center space-x-2">
                <Checkbox id="preview-checkbox" />
                <Label 
                  htmlFor="preview-checkbox" 
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  {config.placeholder || 'Marque esta opção'}
                </Label>
              </div>
            )}
          </div>
        )

      case FieldType.SWITCH:
        return (
          <div className="flex items-center space-x-2">
            <Switch id="preview-switch" />
            <Label 
              htmlFor="preview-switch" 
              className="text-sm text-muted-foreground cursor-pointer"
            >
              {config.placeholder || 'Ativar/Desativar'}
            </Label>
          </div>
        )
      
      case FieldType.TEXTAREA:
        return (
          <Textarea
            {...commonInputProps}
            placeholder={config.placeholder || "Digite seu texto aqui..."}
            rows={3}
          />
        )
      
      case FieldType.PASSWORD:
        return <Input type="password" {...commonInputProps} placeholder="••••••••" />

      case FieldType.URL:
        return <Input type="url" {...commonInputProps} placeholder={config.placeholder || "https://exemplo.com"} />

      case FieldType.FILE:
        return (
          <Input 
            type="file" 
            className={`cursor-pointer ${commonInputProps.className}`}
          />
        )

      case FieldType.COLOR:
        return <Input type="color" className={`h-10 w-20 cursor-pointer ${commonInputProps.className}`} />

      case FieldType.TEL:
        return (
          <Input
            type="tel"
            {...commonInputProps}
            value={value}
            onChange={(e) => {
              const val = e.target.value
              // Formata o número com 8 dígitos
              const formatted = val
                .replace(/\D/g, '')
                .replace(/^(\d{2})(\d)/g, '($1) $2')
                .replace(/(\d{4})(\d)/, '$1-$2')
                .substring(0, 14) // Ajustado para 14 caracteres (incluindo formatação)
              setValue(formatted)
              validateField(formatted, config.fieldType)
            }}
          />
        )

      case FieldType.CPF:
        return (
          <BaseMaskedInput
            mask="999.999.999-99"
            placeholder="000.000.000-00"
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue(e.target.value)
              validateField(e.target.value, config.fieldType)
            }}
            className="w-full"
          />
        )

      case FieldType.CNPJ:
        return (
          <IMaskInput
            mask="00.000.000/0000-00"
            value={value}
            onAccept={(val) => {
              setValue(val)
              validateField(val, config.fieldType)
            }}
            placeholder="00.000.000/0000-00"
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            )}
          />
        )

      default:
        return <Input {...commonInputProps} />
    }
  }

  return (
    <Card className="bg-secondary/50 border-dashed hover:bg-secondary/60 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          Preview do Campo
          <span className="text-xs text-muted-foreground px-2 py-1 bg-background/50 rounded-md">
            {type === ComponentType.FILE ? 'Upload de Arquivo' : 'Modo Interativo'}
          </span>
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Tipo: {config.fieldType}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>{config.label || 'Label do Campo'}</Label>
          {renderField()}
          {error && (
            <p className="text-xs text-red-500 mt-1">
              {error}
            </p>
          )}
          {config.helperText && !error && (
            <p className="text-xs text-muted-foreground">
              {config.helperText}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}