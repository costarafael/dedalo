"use client"

import { NewProviderDialog } from "@/components/dialogs/new-provider-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Store } from "lucide-react"
import Link from "next/link"
import { useProviders } from "@/lib/http/hooks/use-providers"
import { Provider } from "@/lib/core/interfaces/repository.interfaces"

export default function ProvidersPage() {
  const { providers = [], isLoading } = useProviders()

  function getClientName(provider: Provider) {
    const hierarchy = provider.provider_hierarchies?.[0]
    if (!hierarchy) return "Sem cliente"
    return hierarchy.client?.name || "Cliente não encontrado"
  }

  function getParentProviderName(provider: Provider) {
    const hierarchy = provider.provider_hierarchies?.[0]
    if (!hierarchy?.parent_provider_id) return null
    return providers.find((p: Provider) => p.id === hierarchy.parent_provider_id)?.name || "Provider não encontrado"
  }

  if (isLoading) {
    return (
      <div className="container space-y-8 p-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[180px] w-full" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container space-y-8 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Providers</h1>
        <NewProviderDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider: Provider) => (
          <Link key={provider.id} href={`/global/providers/${provider.id}`}>
            <Card className="hover:bg-accent/50 transition-colors cursor-pointer border-muted">
              <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Store className="h-4 w-4 text-muted-foreground" />
                  <CardTitle className="text-lg">{provider.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>ID: {provider.id}</p>
                  <p>Cliente: {getClientName(provider)}</p>
                  {getParentProviderName(provider) && (
                    <p>Provider Pai: {getParentProviderName(provider)}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {providers.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground space-y-4">
            <Store className="h-12 w-12" />
            <p className="text-lg">Nenhum provider encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
} 