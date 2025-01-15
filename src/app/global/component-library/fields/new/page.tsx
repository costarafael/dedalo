"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useComponentLibrary } from "@/lib/hooks/use-component-library"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { ComponentType, ComponentCategory } from "@/lib/core/interfaces/component-library.interfaces"

const FIELD_TYPES: { value: ComponentType; label: string }[] = [
  { value: 'TEXT', label: 'Texto' },
  { value: 'TEXTAREA', label: 'Área de texto' },
  { value: 'PASSWORD', label: 'Senha' },
  { value: 'EMAIL', label: 'E-mail' },
  { value: 'URL', label: 'URL' },
  { value: 'NUMBER', label: 'Número' },
  { value: 'RATING', label: 'Avaliação' },
  { value: 'SELECT', label: 'Seleção' },
  { value: 'MULTISELECT', label: 'Seleção múltipla' },
  { value: 'RADIO', label: 'Radio' },
  { value: 'CHECKBOX', label: 'Checkbox' },
  { value: 'DATE', label: 'Data' },
  { value: 'TIME', label: 'Hora' },
  { value: 'DATETIME', label: 'Data e hora' },
  { value: 'DATE_RANGE', label: 'Período' },
  { value: 'PHONE', label: 'Telefone' },
  { value: 'TEL', label: 'Telefone (tel)' },
  { value: 'FILE', label: 'Arquivo' },
  { value: 'MULTIFILE', label: 'Múltiplos arquivos' },
  { value: 'COLOR', label: 'Cor' },
  { value: 'CPF', label: 'CPF' },
  { value: 'CNPJ', label: 'CNPJ' },
  { value: 'SWITCH', label: 'Switch' }
]

const FIELD_CATEGORIES: { value: ComponentCategory; label: string }[] = [
  { value: 'DATA', label: 'Dados' },
  { value: 'FORM', label: 'Formulário' },
  { value: 'LAYOUT', label: 'Layout' },
  { value: 'NAVIGATION', label: 'Navegação' },
  { value: 'UTILITY', label: 'Utilitário' },
  { value: 'SECURITY', label: 'Segurança' },
  { value: 'CUSTOM', label: 'Personalizado' }
]

export default function NewFieldPage() {
  const router = useRouter()
  const { create } = useComponentLibrary()
  const [isLoading, setIsLoading] = useState(false)
  const [isRequired, setIsRequired] = useState(false)
  const [isUnique, setIsUnique] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      
      const data = {
        name: formData.get('name') as string,
        description: (formData.get('description') as string) || undefined,
        type: formData.get('type') as ComponentType,
        category: formData.get('category') as ComponentCategory,
        default_label: (formData.get('default_label') as string) || undefined,
        is_required_by_default: isRequired,
        is_unique_by_default: isUnique,
        version: '1.0.0',
        is_active: true,
        is_latest_version: true,
        config: {},
        metadata: null,
        validation: null
      }

      console.log('Creating field with data:', data)
      await create(data)
      toast.success('Field criado com sucesso!')
      router.push('/global/component-library/fields')
    } catch (error) {
      console.error('Error creating field:', error)
      toast.error('Erro ao criar field')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/global/component-library/fields">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Novo Field</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações básicas</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" name="name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" name="description" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="default_label">Label padrão</Label>
              <Input id="default_label" name="default_label" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  {FIELD_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select name="category" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {FIELD_CATEGORIES.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_required"
                checked={isRequired}
                onCheckedChange={setIsRequired}
              />
              <Label htmlFor="is_required">Obrigatório por padrão</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_unique"
                checked={isUnique}
                onCheckedChange={setIsUnique}
              />
              <Label htmlFor="is_unique">Único por padrão</Label>
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Criando...' : 'Criar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 