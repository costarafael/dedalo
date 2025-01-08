"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Module = {
  id: string
  name: string
  items: {
    title: string
    href: string
  }[]
}

const modules: Module[] = [
  {
    id: "contracts",
    name: "Contratos",
    items: [
      { title: "Lista de Contratos", href: "/provider/contracts/list" },
      { title: "Documentos Contratuais", href: "/provider/contracts/documents" },
    ]
  },
  {
    id: "crm",
    name: "CRM",
    items: [
      { title: "Clientes", href: "/provider/crm/clients" },
      { title: "Funil de Vendas", href: "/provider/crm/funnel" },
      { title: "Relatórios", href: "/provider/crm/reports" },
    ]
  },
]

export function ProviderModuleNav() {
  const pathname = usePathname()
  const [activeModule, setActiveModule] = React.useState(modules[0])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Select
          value={activeModule.id}
          onValueChange={(value) => {
            setActiveModule(modules.find(m => m.id === value) || modules[0])
          }}
        >
          <SelectTrigger className="h-9 w-[200px]">
            <SelectValue>{activeModule.name}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {modules.map((module) => (
              <SelectItem key={module.id} value={module.id}>
                {module.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border-b">
        <div className="container">
          <ScrollArea className="w-full" type="hover">
            <div className="flex items-center gap-2 pb-4">
              {activeModule.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "text-muted-foreground hover:text-primary",
                    "data-[active=true]:bg-muted data-[active=true]:text-primary",
                    pathname === item.href && "data-[active=true]"
                  )}
                  data-active={pathname === item.href}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
} 