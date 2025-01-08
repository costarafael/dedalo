"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { createBrowserClient } from "@/lib/supabase-server"

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export function AddModuleDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) return

    const supabase = createBrowserClient()

    const now = new Date().toISOString()
    const moduleData = {
      name,
      slug: slugify(name),
      version: 1,
      is_active: true,
      updated_at: now,
      created_at: now
    }

    const { error } = await supabase
      .from("modules")
      .insert([moduleData])

    if (error) {
      console.error("Error creating module:", error)
      return
    }

    setOpen(false)
    setName("")
    router.refresh()
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
              Crie um novo módulo no sistema.
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
            <Button type="submit">Adicionar Módulo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 