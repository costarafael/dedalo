"use client"

import { useEffect, useState } from "react"
import { 
  FileText,
  Activity,
  GitBranch,
  Lock, 
  Settings2, 
  Upload, 
  Power, 
  Copy,
  Plus,
  Blocks
} from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ModuleSwitcher } from "@/components/layout/module-switcher"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getBrowserClient } from '@/lib/database/supabase'
import { useToast } from "@/components/ui/use-toast"
import { usePathname } from "next/navigation"

type Module = {
  id: string
  name: string
  slug: string
  description: string | null
  version: number
  is_active: boolean
  created_at: string
  updated_at: string
}

const moduleOptions = [
  { name: "Templates record", icon: FileText, url: "templates" },
  { name: "States", icon: Activity, url: "states" },
  { name: "Workflow", icon: GitBranch, url: "workflow" },
  { name: "Permissions", icon: Lock, url: "permissions" },
  { name: "Edit info", icon: Settings2, url: "edit" },
]

const moduleActions = [
  { name: "Publish / Update", icon: Upload, url: "publish" },
  { name: "Unpublish", icon: Power, url: "unpublish" },
  { name: "Duplicate", icon: Copy, url: "duplicate" },
]

export function NavModules() {
  const { isCollapsed } = useSidebar()
  const [modules, setModules] = useState<Module[]>([])
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const pathname = usePathname()

  useEffect(() => {
    async function fetchModules() {
      setLoading(true)
      try {
        const supabase = getBrowserClient()
        const { data, error } = await supabase
          .from("modules")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) throw error
        setModules(data || [])
      } catch (error) {
        console.error("Error fetching modules:", error)
        toast({
          title: "Erro ao carregar módulos",
          description: "Não foi possível carregar a lista de módulos. Tente novamente mais tarde.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchModules()
  }, [toast])

  // Determina o ambiente atual baseado na URL
  const getModuleUrl = (moduleSlug: string, optionUrl: string) => {
    const pathSegments = pathname?.split('/') || []
    const entityType = pathSegments[1] // 'sponsor', 'provider' ou 'global'
    const entityId = pathSegments[2]

    if (entityType === 'global') {
      return `/global/${moduleSlug}/${optionUrl}`
    }

    if (entityId) {
      return `/${entityType}/${entityId}/${moduleSlug}/${optionUrl}`
    }

    return '#'
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Módulos</SidebarGroupLabel>
      <SidebarMenu>
        {loading ? (
          <SidebarMenuItem>
            <SidebarMenuButton disabled>
              <div className="h-4 w-4 animate-pulse rounded bg-sidebar-primary" />
              {!isCollapsed && (
                <div className="h-4 w-24 animate-pulse rounded bg-sidebar-primary" />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ) : (
          <>
            <SidebarMenuItem>
              <ModuleSwitcher 
                modules={modules} 
                selectedModule={selectedModule}
                onModuleSelect={setSelectedModule}
              />
            </SidebarMenuItem>

            {selectedModule && (
              <>
                {moduleOptions.map((option) => (
                  <SidebarMenuItem key={option.name}>
                    <SidebarMenuButton asChild>
                      <a href={getModuleUrl(selectedModule.slug, option.url)}>
                        <option.icon className="h-4 w-4" />
                        {!isCollapsed && <span>{option.name}</span>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                <SidebarGroupLabel className="mt-4">Ações</SidebarGroupLabel>
                
                {moduleActions.map((action) => (
                  <SidebarMenuItem key={action.name}>
                    <SidebarMenuButton asChild>
                      <a href={getModuleUrl(selectedModule.slug, action.url)}>
                        <action.icon className="h-4 w-4" />
                        {!isCollapsed && <span>{action.name}</span>}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </>
            )}

            <SidebarMenuItem>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  isCollapsed && "justify-center"
                )}
                asChild
              >
                <a href="/global/modules">
                  <Plus className="mr-2 h-4 w-4" />
                  {!isCollapsed && "Adicionar módulo"}
                </a>
              </Button>
            </SidebarMenuItem>
          </>
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
} 