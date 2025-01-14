"use client"

import { useClients } from "./use-clients"
import { ClientListSkeleton } from "./client-list-skeleton"
import { ClientListContent } from "./client-list-content"

export function ClientList() {
  const { clients, isLoading, error } = useClients()

  if (isLoading) {
    return <ClientListSkeleton />
  }

  if (error) {
    return (
      <div className="text-center text-destructive">
        Erro ao carregar clientes. Tente novamente mais tarde.
      </div>
    )
  }

  return <ClientListContent clients={clients} />
} 