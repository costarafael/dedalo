"use client"

import { LayoutDashboard, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface AppHeaderProps {
  breadcrumb?: {
    label: string
    href?: string
  }[]
}

export function AppHeader({ breadcrumb }: AppHeaderProps) {
  const pathname = usePathname()

  // Define o breadcrumb baseado no pathname se não for fornecido
  const defaultBreadcrumb = [
    { label: "Global", href: "/global" },
    ...(pathname.startsWith("/global/clients") ? [{ label: "Clientes" }] : [])
  ]

  const activeBreadcrumb = breadcrumb || defaultBreadcrumb

  return (
    <header className="flex h-16 shrink-0 items-center border-b w-full">
      <div className="flex items-center gap-2 px-4 w-full">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            asChild
          >
            <a href="/global">
              <LayoutDashboard className="h-4 w-4" />
              <span className="sr-only">Global</span>
            </a>
          </Button>
        </div>

        <Breadcrumb>
          <BreadcrumbList>
            {activeBreadcrumb.map((item, index) => (
              <BreadcrumbItem key={index}>
                {item.href ? (
                  <BreadcrumbLink href={item.href}>
                    {item.label}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
                {index < activeBreadcrumb.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )
} 