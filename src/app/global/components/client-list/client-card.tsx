import { Client } from "@/lib/core/interfaces/repository.interfaces"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface ClientCardProps {
  client: Client
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <Link href={`/sponsor/${client.id}`} className="block">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">{client.name}</h3>
          <p className="text-sm text-muted-foreground">
            {client.metadata?.document || 'Sem documento'}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
} 