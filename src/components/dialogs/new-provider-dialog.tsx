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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useClients } from "@/lib/http/hooks/use-clients"
import { useCreateProvider, useProvidersByClient } from "@/lib/http/hooks/use-providers"
import { toast } from "sonner"
import { useState } from "react"
import { Client, Provider } from "@/lib/core/interfaces/repository.interfaces"

export function NewProviderDialog() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [clientId, setClientId] = useState<string>()
  const [parentProviderId, setParentProviderId] = useState<string>()

  const { data: clients = [], isLoading: isLoadingClients } = useClients()
  const { data: providers = [] } = useProvidersByClient(clientId || "")
  const { mutate: createProvider, isLoading: isCreating } = useCreateProvider()

  const handleSubmit = () => {
    if (!name) {
      toast.error("Nome é obrigatório")
      return
    }

    if (!clientId && !parentProviderId) {
      toast.error("Selecione um cliente ou um provider pai")
      return
    }

    createProvider(
      { name, client_id: clientId, parent_provider_id: parentProviderId },
      {
        onSuccess: () => {
          setOpen(false)
          setName("")
          setClientId(undefined)
          setParentProviderId(undefined)
          toast.success("Provider criado com sucesso")
        },
        onError: (error) => {
          toast.error("Erro ao criar provider")
          console.error(error)
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Novo Provider</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo Provider</DialogTitle>
          <DialogDescription>
            Crie um novo provider e vincule a um cliente ou a outro provider.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Nome
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="client" className="text-right">
              Cliente
            </label>
            <Select
              value={clientId}
              onValueChange={(value) => {
                setClientId(value)
                setParentProviderId(undefined)
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client: Client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {clientId && (
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="parent" className="text-right">
                Provider Pai
              </label>
              <Select value={parentProviderId} onValueChange={setParentProviderId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um provider pai" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider: Provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isCreating || !name || (!clientId && !parentProviderId)}
          >
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 