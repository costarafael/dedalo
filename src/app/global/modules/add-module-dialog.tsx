"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useModules } from "@/lib/http/hooks/use-modules"
import { createModuleData } from "@/lib/core/validations/module.validation"

export function AddModuleDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { create, isCreating } = useModules()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      create(createModuleData(name), {
        onSuccess: () => {
          setOpen(false)
          setName("")
          toast({
            title: "Módulo criado",
            description: "O módulo foi criado com sucesso."
          })
        },
        onError: (error) => {
          toast({
            title: "Erro ao criar módulo",
            description: error.message,
            variant: "destructive"
          })
        }
      })
    } catch (error) {
      toast({
        title: "Erro de validação",
        description: error instanceof Error ? error.message : "Erro ao validar dados do módulo",
        variant: "destructive"
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Módulo
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Adicionar Módulo</DialogTitle>
            <DialogDescription>
              Crie um novo módulo na biblioteca do sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do módulo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite o nome do módulo"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Adicionando..." : "Adicionar Módulo"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 