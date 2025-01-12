import { Suspense } from "react"
import { NewProviderDialog } from "@/components/dialogs/new-provider-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProviderService } from "@/lib/services/provider"
import { getClientService } from "@/lib/services/client"
import { Skeleton } from "@/components/ui/skeleton"
import { Building2, Store, Users } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function ProvidersPage() {
  const providerService = getProviderService()
  const clientService = getClientService()

  const [providers, clients] = await Promise.all([
    providerService.getAll(),
    clientService.findAll()
  ])

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Fornecedores</h1>
          <p className="text-muted-foreground">
            Gerencie os fornecedores e suas hierarquias
          </p>
        </div>
        <NewProviderDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<ProviderCardSkeleton count={6} />}>
          {providers.map((provider) => {
            const client = clients.find((c) => c.id === provider.client_id)
            return (
              <Link key={provider.id} href={`/global/providers/${provider.id}`}>
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Store className="h-5 w-5" />
                        <span>{provider.name}</span>
                      </div>
                      <Badge variant="outline">
                        {provider.deleted_at ? "Inativo" : "Ativo"}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>Cliente: {client?.name || "Sem cliente"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>Hierarquia: {provider.parent_provider_id ? "Filho" : "Raiz"}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </Suspense>
      </div>
    </div>
  )
}

function ProviderCardSkeleton({ count = 1 }: { count?: number }) {
  return Array(count).fill(0).map((_, i) => (
    <Card key={i}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[60px]" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[120px]" />
      </CardContent>
    </Card>
  ))
} 