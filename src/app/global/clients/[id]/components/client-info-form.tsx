import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Client, EntityUpdate } from "@/lib/core/interfaces/repository.interfaces"
import { useUpdateClient, useDeleteClient } from "@/lib/http/clients"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { z } from "zod"

const clientFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
})

type FormData = z.infer<typeof clientFormSchema>

interface ClientInfoFormProps {
  client: Client
}

export function ClientInfoForm({ client }: ClientInfoFormProps) {
  const router = useRouter()
  const { mutate: updateClient, isPending: isUpdating } = useUpdateClient()
  const { mutate: deleteClient, isPending: isDeleting } = useDeleteClient()

  const form = useForm<FormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: client.name,
    },
  })

  function onSubmit(data: FormData) {
    const payload: Partial<EntityUpdate> = {
      name: data.name,
    }

    updateClient(
      { id: client.id, data: payload },
      {
        onSuccess: () => {
          toast.success("Cliente atualizado com sucesso!")
          router.refresh()
        },
        onError: () => toast.error("Erro ao atualizar cliente"),
      }
    )
  }

  function handleDelete() {
    if (!window.confirm("Tem certeza que deseja remover este cliente?")) return

    deleteClient(client.id, {
      onSuccess: () => {
        toast.success("Cliente removido com sucesso!")
        router.push("/global/clients")
      },
      onError: () => toast.error("Erro ao remover cliente"),
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>ID</Label>
        <Input value={client.id} disabled className="bg-muted" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input id="name" {...form.register("name")} />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="submit" disabled={isUpdating}>
          {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isUpdating ? "Salvando..." : "Salvar"}
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
  )
} 