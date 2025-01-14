"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { Building2, Store, GalleryVerticalEnd } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { clientApi } from "@/lib/http/services/client.api"
import { providerApi } from "@/lib/http/services/provider.api"
import { type Entity } from "@/lib/core/interfaces/repository.interfaces"
import { useToast } from "@/components/ui/use-toast"

export default function TeamSwitcher() {
  const { isMobile } = useSidebar()
  const [clients, setClients] = React.useState<Entity[]>([])
  const [providers, setProviders] = React.useState<Entity[]>([])
  const [loading, setLoading] = React.useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Busca as entities quando o componente é montado
  React.useEffect(() => {
    async function fetchEntities() {
      setLoading(true)
      try {
        const { data: clientsData } = await clientApi.getAll()
        const { data: providersData } = await providerApi.getAll()
        setClients(clientsData || [])
        setProviders(providersData || [])
      } catch (error) {
        console.error("Error fetching entities:", error)
        toast({
          title: "Erro ao carregar ambientes",
          description: "Não foi possível carregar a lista de ambientes. Tente novamente mais tarde.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchEntities()
  }, [toast])

  // Determina o ambiente ativo com base na URL
  const getActiveTeam = () => {
    const pathSegments = pathname?.split('/') || []
    const entityType = pathSegments[1] // 'sponsor', 'provider' ou 'global'
    const entityId = pathSegments[2]

    if (entityType === 'global') {
      return {
        name: "Gerenciamento Global",
        logo: GalleryVerticalEnd,
        plan: "Admin",
        id: "global"
      }
    }

    if (entityType === 'sponsor' && entityId) {
      const client = clients.find(c => c.id === entityId)
      if (client) {
        return {
          name: client.name,
          logo: Building2,
          plan: "Cliente",
          id: client.id
        }
      }
    }

    if (entityType === 'provider' && entityId) {
      const provider = providers.find(p => p.id === entityId)
      if (provider) {
        return {
          name: provider.name,
          logo: Store,
          plan: "Provider",
          id: provider.id
        }
      }
    }

    return {
      name: "Gerenciamento Global",
      logo: GalleryVerticalEnd,
      plan: "Admin",
      id: "global"
    }
  }

  const [activeTeam, setActiveTeam] = React.useState(getActiveTeam())

  React.useEffect(() => {
    setActiveTeam(getActiveTeam())
  }, [pathname, clients, providers])

  // Converte as entities para o formato esperado pelo componente
  const teams = [
    {
      name: "Gerenciamento Global",
      logo: GalleryVerticalEnd,
      plan: "Admin",
      id: "global"
    },
    ...clients.map(client => ({
      name: client.name,
      logo: Building2,
      plan: "Cliente",
      id: client.id
    })),
    ...providers.map(provider => ({
      name: provider.name,
      logo: Store,
      plan: "Provider",
      id: provider.id
    }))
  ]

  const handleTeamSelect = (team: typeof teams[0]) => {
    setActiveTeam(team)
    if (team.id === "global") {
      router.push("/global")
    } else {
      const type = team.plan === "Cliente" ? "sponsor" : "provider"
      router.push(`/${type}/${team.id}`)
    }
  }

  if (loading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" disabled>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground animate-pulse">
              <div className="size-4" />
            </div>
            <div className="grid flex-1 gap-1">
              <div className="h-4 w-3/4 rounded bg-sidebar-primary animate-pulse" />
              <div className="h-3 w-1/2 rounded bg-sidebar-primary animate-pulse" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Ambientes
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => handleTeamSelect(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Adicionar ambiente</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}