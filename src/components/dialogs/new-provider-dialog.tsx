"use client"

import { useState } from "react"
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { getProviderService } from "@/lib/services/provider"
import { getClientService } from "@/lib/services/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Building2, Loader2, Plus, Store, Users } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  client_id: z.string().min(1, "Cliente é obrigatório"),
  parent_provider_id: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export function NewProviderDialog() {
  const [open, setOpen] = useState(false)
  const [clients, setClients] = useState<any[]>([])
  const [providers, setProviders] = useState<any[]>([])
  const [selectedClient, setSelectedClient] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      client_id: "",
      parent_provider_id: undefined,
    },
  })

  async function loadData() {
    try {
      const clientService = getClientService()
      const clientsData = await clientService.findAll()
      setClients(clientsData)
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
      toast.error("Erro ao carregar dados")
    }
  }

  async function loadProviders(clientId: string) {
    try {
      const providerService = getProviderService()
      const providersData = await providerService.getByClient(clientId)
      setProviders(providersData)
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error)
      toast.error("Erro ao carregar fornecedores")
    }
  }

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true)
      const providerService = getProviderService()
      await providerService.create({
        name: data.name,
        client_id: data.client_id,
        parent_provider_id: data.parent_provider_id,
      })

      toast.success("Fornecedor criado com sucesso")
      setOpen(false)
      form.reset()
      router.refresh()
    } catch (error) {
      console.error("Erro ao criar fornecedor:", error)
      toast.error("Erro ao criar fornecedor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (isOpen) {
        loadData()
      } else {
        form.reset()
        setProviders([])
        setSelectedClient("")
      }
    }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo fornecedor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Criar novo fornecedor
          </DialogTitle>
          <DialogDescription>
            Preencha os dados do fornecedor. Você pode criar um fornecedor independente ou vinculá-lo a outro fornecedor existente.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Cliente
                  </FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedClient(value)
                      loadProviders(value)
                      // Limpa o provider pai quando troca de cliente
                      form.setValue('parent_provider_id', undefined)
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Selecione o cliente ao qual este fornecedor pertencerá
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    Nome
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do fornecedor" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nome que identificará o fornecedor no sistema
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parent_provider_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Fornecedor pai
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedClient}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedClient ? "Selecione um fornecedor pai" : "Primeiro selecione um cliente"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Opcional. Selecione se este fornecedor fará parte da hierarquia de outro fornecedor
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Criar fornecedor
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 