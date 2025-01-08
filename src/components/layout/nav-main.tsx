"use client"

import * as React from "react"
import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  getMenuExpandedState,
  setMenuExpandedState,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
  label = "Libraries",
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
  label?: string
}) {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <SidebarGroup role="navigation" aria-label={label}>
        <SidebarGroupLabel id={`${label}-heading`}>{label}</SidebarGroupLabel>
        <SidebarMenu aria-labelledby={`${label}-heading`}>
          {/* Renderização inicial vazia para evitar hidratação incorreta */}
        </SidebarMenu>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup role="navigation" aria-label={label}>
      <SidebarGroupLabel id={`${label}-heading`}>{label}</SidebarGroupLabel>
      <SidebarMenu aria-labelledby={`${label}-heading`}>
        {items.map((item) => {
          const isActive = pathname === item.url
          
          if (!item.items?.length) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link 
                    href={item.url}
                    className="flex items-center gap-2"
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.icon && <item.icon className="h-4 w-4" aria-hidden="true" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          const isExpanded = getMenuExpandedState(item.title)

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isExpanded}
              onOpenChange={(open) => setMenuExpandedState(item.title, open)}
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title}
                    aria-expanded={isExpanded}
                    aria-controls={`${item.title}-submenu`}
                  >
                    {item.icon && <item.icon className="h-4 w-4" aria-hidden="true" />}
                    <span>{item.title}</span>
                    <ChevronRight 
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" 
                      aria-hidden="true"
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent id={`${item.title}-submenu`}>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      const isSubActive = pathname === subItem.url
                      
                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link 
                              href={subItem.url}
                              aria-current={isSubActive ? "page" : undefined}
                            >
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}