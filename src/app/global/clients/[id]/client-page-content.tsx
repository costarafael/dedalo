"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getClientService } from "@/lib/services/client"
import { createClientSchema } from "@/lib/validations/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { OrganizationalUnitsManager } from "@/components/organizational-units/organizational-units-manager"
import { Skeleton } from "@/components/ui/skeleton"
import { Building2, Loader2, Settings, Users, Boxes, Network } from "lucide-react"
import { Entity } from "@/lib/core/interfaces"

type FormData = z.infer<typeof createClientSchema>

interface Props {
  id: string
}

export function ClientPageContent({ id }: Props) {
  const router = useRouter()
  const [client, setClient] = useState<Entity | null>(null)
  const [loading, setLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(createClientSchema),
  })

  useEffect(() => {
    async function loadClient() {
      try {
        const clientService = getClientService()
        const data = await clientService.getById(id)
        if (!data) throw new Error("Cliente não encontrado")
        setClient(data)
        form.reset({ name: data.name })
      } catch (error) {
        console.error("Erro ao carregar cliente:", error)
        toast.error(error instanceof Error ? error.message : "Erro ao carregar cliente")
      } finally {
        setLoading(false)
      }
    }

    loadClient()
  }, [id, form])

  async function onSubmit(data: FormData) {
    try {
      setIsSaving(true)
      const clientService = getClientService()
      await clientService.update(id, data)
      toast.success("Cliente atualizado com sucesso!")
      router.refresh()
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error)
      toast.error(error instanceof Error ? error.message : "Erro ao atualizar cliente")
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja remover este cliente?")) return

    try {
      setIsDeleting(true)
      const clientService = getClientService()
      await clientService.delete(id)
      toast.success("Cliente removido com sucesso!")
      router.push("/global/clients")
    } catch (error) {
      console.error("Erro ao remover cliente:", error)
      toast.error(error instanceof Error ? error.message : "Erro ao remover cliente")
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="container space-y-8 p-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-[200px] w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!client) {
    return (
      <div className="container flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Cliente não encontrado</CardTitle>
            <CardDescription>
              O cliente solicitado não existe ou foi removido
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => router.push("/global/clients")}>
              Voltar para lista
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container space-y-8 p-8">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Administração do Cliente</CardTitle>
          </div>
          <CardDescription>Gerencie as configurações do cliente {client.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Informações
              </TabsTrigger>
              <TabsTrigger value="providers" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Providers
              </TabsTrigger>
              <TabsTrigger value="modules" className="flex items-center gap-2">
                <Boxes className="h-4 w-4" />
                Módulos
              </TabsTrigger>
              <TabsTrigger value="units" className="flex items-center gap-2">
                <Network className="h-4 w-4" />
                Unidades
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6 pt-4">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label>ID</Label>
                  <Input value={client.id} disabled className="bg-muted" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                  />
                </div>

                <div className="flex justify-between pt-4">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isSaving ? "Salvando..." : "Salvar"}
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isDeleting ? "Removendo..." : "Remover Cliente"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="providers" className="min-h-[200px]">
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground space-y-4">
                <Users className="h-12 w-12" />
                <p className="text-lg">Em breve: Gerenciamento de Providers</p>
              </div>
            </TabsContent>

            <TabsContent value="modules" className="min-h-[200px]">
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground space-y-4">
                <Boxes className="h-12 w-12" />
                <p className="text-lg">Em breve: Gerenciamento de Módulos</p>
              </div>
            </TabsContent>

            <TabsContent value="units">
              <OrganizationalUnitsManager id={id} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 