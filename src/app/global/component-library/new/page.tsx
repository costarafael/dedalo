"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

const COMPONENT_TYPES: { value: ComponentType; label: string }[] = [
  { value: 'FIELD', label: 'Campo' },
  { value: 'FILE', label: 'Arquivo' },
  { value: 'SIGNATURE', label: 'Assinatura' },
  { value: 'TOKEN_INPUT', label: 'Token' },
  { value: 'CODE_EDITOR', label: 'Editor de código' },
  { value: 'CAMERA', label: 'Câmera' },
  { value: 'DATE_RANGE', label: 'Período' },
  { value: 'CUSTOM', label: 'Personalizado' }
]

const COMPONENT_CATEGORIES: { value: ComponentCategory; label: string }[] = [
  { value: 'DATA', label: 'Dados' },
  { value: 'FORM', label: 'Formulário' },
  { value: 'LAYOUT', label: 'Layout' },
  { value: 'NAVIGATION', label: 'Navegação' },
  { value: 'UTILITY', label: 'Utilitário' },
  { value: 'SECURITY', label: 'Segurança' },
  { value: 'CUSTOM', label: 'Personalizado' }
]

export default function NewComponentPage() {
  const router = useRouter()
  const { create } = useComponentLibrary()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      
      const data = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        type: formData.get('type') as ComponentType,
        category: formData.get('category') as ComponentCategory,
        version: '1.0.0',
        is_active: true,
        is_latest_version: true,
        config: {},
        metadata: null
      }

      console.log('Creating component with data:', data)
      await create(data)
      toast.success('Componente criado com sucesso!')
      router.push('/global/component-library')
    } catch (error) {
      console.error('Error creating component:', error)
      toast.error('Erro ao criar componente')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/global/component-library">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Novo Componente</h1>
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
              <Label htmlFor="type">Tipo</Label>
              <Select name="type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um tipo" />
                </SelectTrigger>
                <SelectContent>
                  {COMPONENT_TYPES.map(type => (
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
                  {COMPONENT_CATEGORIES.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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