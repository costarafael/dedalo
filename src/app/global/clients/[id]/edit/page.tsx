"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { clientService } from "@/lib/core/services/client.service"
import { clientSchema } from "@/lib/core/validations/client.validation"
import type { Client } from "@/lib/core/interfaces/repository.interfaces"

const formSchema = clientSchema.extend({
  email: z.string().email("Email inválido").min(1, "Email é obrigatório"),
})

export default function EditClientPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [client, setClient] = useState<Client | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  useEffect(() => {
    async function loadClient() {
      try {
        const client = await clientService.getClient(params.id as string)
        setClient(client)
        form.reset({
          name: client.name,
          email: client.metadata?.email || "",
        })
      } catch (error) {
        console.error('Erro ao carregar cliente:', error)
        toast({
          title: "Erro ao carregar cliente",
          description: "O cliente solicitado não foi encontrado.",
          variant: "destructive",
        })
        router.push("/global/clients")
      } finally {
        setIsLoading(false)
      }
    }

    loadClient()
  }, [params.id, router, toast, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!client) return

    try {
      await clientService.updateClient(client.id, {
        name: values.name,
        metadata: {
          ...client.metadata,
          email: values.email,
        },
        updated_at: new Date().toISOString(),
      })
      
      toast({
        title: "Cliente atualizado",
        description: `O cliente ${values.name} foi atualizado.`,
      })
      
      router.push(`/global/clients/${client.id}`)
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error)
      toast({
        title: "Erro ao atualizar cliente",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao atualizar o cliente. Tente novamente.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!client) return null

  return (
    <div className="flex-1 space-y-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Editar Cliente</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Digite o email do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button variant="outline" type="button" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
} 