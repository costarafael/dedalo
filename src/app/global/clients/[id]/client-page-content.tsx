"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useClient } from "@/lib/http/clients"
import { ClientHeader } from "./components/client-header"
import { ClientTabs } from "./components/client-tabs"
import { ClientLoading } from "./components/client-loading"
import { ClientNotFound } from "./components/client-not-found"

interface Props {
  id: string
}

export function ClientPageContent({ id }: Props) {
  const { data: client, isLoading } = useClient(id)

  if (isLoading) {
    return <ClientLoading />
  }

  if (!client) {
    return <ClientNotFound />
  }

  return (
    <div className="container space-y-8 p-8">
      <Card>
        <ClientHeader clientName={client.name} />
        <CardContent>
          <ClientTabs client={client} />
        </CardContent>
      </Card>
    </div>
  )
} 