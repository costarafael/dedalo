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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createProvider } from "@/lib/api/providers"
import { getClients } from "@/lib/api/clients"
import { getProvidersByClient } from "@/lib/api/providers"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { useEffect, useState } from "react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Provider, Client } from "@/lib/core/interfaces/repository.interfaces"

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  client_id: z.string().min(1, "Cliente é obrigatório"),
  parent_provider_id: z.string().optional(),
})

type Props = {
  onProviderCreated?: () => void
}

export function NewProviderDialog({ onProviderCreated }: Props) {
  const [open, setOpen] = useState(false)
  const [clients, setClients] = useState<Client[]>([])
  const [providers, setProviders] = useState<Provider[]>([])
  const [selectedClient, setSelectedClient] = useState<string>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      client_id: "",
      parent_provider_id: "",
    },
  })

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getClients()
        setClients(data || [])
      } catch (error) {
        console.error("Erro ao carregar clientes:", error)
        toast.error("Erro ao carregar clientes")
      }
    }
    loadClients()
  }, [])

  useEffect(() => {
    async function loadProviders() {
      if (!selectedClient) {
        setProviders([])
        return
      }
      try {
        const data = await getProvidersByClient(selectedClient)
        setProviders(data || [])
      } catch (error) {
        console.error("Erro ao carregar providers:", error)
        toast.error("Erro ao carregar providers")
      }
    }
    loadProviders()
  }, [selectedClient])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createProvider(values)
      toast.success("Provider criado com sucesso!")
      setOpen(false)
      form.reset()
      onProviderCreated?.()
    } catch (error) {
      console.error("Erro ao criar provider:", error)
      toast.error("Erro ao criar provider")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Provider
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar novo provider</DialogTitle>
          <DialogDescription>
            Preencha as informações para criar um novo provider
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do provider" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value)
                      setSelectedClient(value)
                      // Limpa o provider pai ao trocar de cliente
                      form.setValue("parent_provider_id", "")
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
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedClient && providers.length > 0 && (
              <FormField
                control={form.control}
                name="parent_provider_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provider Pai (Opcional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um provider pai" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit">Criar Provider</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 