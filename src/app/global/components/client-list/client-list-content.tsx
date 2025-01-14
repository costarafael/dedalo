import { Client } from "@/lib/core/interfaces/repository.interfaces"
import { ClientCard } from "./client-card"

interface ClientListContentProps {
  clients: Client[]
}

export function ClientListContent({ clients }: ClientListContentProps) {
  if (clients.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Nenhum cliente encontrado.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {clients.map((client) => (
        <ClientCard key={client.id} client={client} />
      ))}
    </div>
  )
} 