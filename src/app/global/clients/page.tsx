"use client"

import { NewClientDialog } from "@/components/dialogs/new-client-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getClients } from "@/lib/api/clients"
import { Skeleton } from "@/components/ui/skeleton"
import { Building2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadClients() {
    try {
      const data = await getClients()
      setClients(data || [])
    } catch (error) {
      console.error("Erro ao carregar clientes:", error)
      toast.error("Erro ao carregar clientes")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClients()
  }, [])

  if (loading) {
    return (
      <div className="container space-y-8 p-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[140px] w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container space-y-8 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <NewClientDialog onClientCreated={loadClients} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Link key={client.id} href={`/global/clients/${client.id}`}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer border-muted">
              <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>ID: {client.id}</p>
                  {client.description && (
                    <p className="line-clamp-2">{client.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {clients.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground space-y-4">
            <Building2 className="h-12 w-12" />
            <p className="text-lg">Nenhum cliente encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}