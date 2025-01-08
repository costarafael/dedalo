"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Store, 
  FileText, 
  Target, 
  Building, 
  Settings,
  Users,
  UserCog,
  ShieldCheck,
  LayoutDashboard,
  Bell,
  CreditCard,
  LogOut,
  Sparkles,
  BadgeCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ProviderTeamSwitcher } from "@/components/layout/provider-team-switcher"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const navigation = [
  {
    title: "Documentos",
    href: "/provider/documents",
    icon: FileText,
  },
  {
    title: "Serviços",
    href: "/provider/services",
    icon: Target,
  },
  {
    title: "Subproviders",
    href: "/provider/subproviders",
    icon: Building,
  },
]

const settingsNavigation = [
  {
    title: "Usuários",
    href: "/provider/settings/users",
    icon: Users,
  },
  {
    title: "Dados da conta",
    href: "/provider/settings/account",
    icon: UserCog,
  },
  {
    title: "Permissões",
    href: "/provider/settings/permissions",
    icon: ShieldCheck,
  },
  {
    title: "Configurações",
    href: "/provider/settings/config",
    icon: Settings,
  },
]

const modules = [
  {
    id: "contracts",
    name: "Contratos",
    icon: FileText,
    items: [
      { title: "Lista de Contratos", href: "/provider/contracts/list" },
      { title: "Documentos Contratuais", href: "/provider/contracts/documents" },
    ]
  },
  {
    id: "crm",
    name: "CRM",
    icon: Users,
    items: [
      { title: "Clientes", href: "/provider/crm/clients" },
      { title: "Funil de Vendas", href: "/provider/crm/funnel" },
      { title: "Relatórios", href: "/provider/crm/reports" },
    ]
  },
]

export function ProviderHeader() {
  const pathname = usePathname()
  const [activeModule, setActiveModule] = React.useState(modules[0])

  return (
    <header 
      className="sticky top-0 z-50 w-full bg-background"
      role="banner"
    >
      <nav 
        className="container flex h-14 items-center gap-2"
        aria-label="Main navigation"
      >
        <ProviderTeamSwitcher />
        
        <Separator orientation="vertical" className="h-4" aria-hidden="true" />
        
        <Link 
          href="/provider"
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-md",
            "text-muted-foreground hover:text-primary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          aria-label="Go to dashboard"
          tabIndex={0}
        >
          <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
        </Link>

        <Separator orientation="vertical" className="h-4" aria-hidden="true" />

        <div className="flex items-center gap-2">
          <Select
            value={activeModule.id}
            onValueChange={(value) => {
              setActiveModule(modules.find(m => m.id === value) || modules[0])
            }}
          >
            <SelectTrigger 
              className="h-8 w-[180px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Current module: ${activeModule.name}`}
              tabIndex={0}
            >
              <div className="flex items-center gap-1">
                {activeModule.icon && (
                  <activeModule.icon className="h-4 w-4" aria-hidden="true" />
                )}
                <SelectValue>{activeModule.name}</SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent>
              {modules.map((module) => (
                <SelectItem 
                  key={module.id} 
                  value={module.id}
                  className="flex items-center gap-1"
                >
                  {module.icon && (
                    <module.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>{module.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <nav 
            className="flex items-center"
            aria-label={`${activeModule.name} navigation`}
          >
            <ScrollArea className="max-w-[600px] lg:max-w-none">
              <ul className="flex items-center gap-2" role="menubar">
                {activeModule.items.map((item, index) => (
                  <li key={item.href} role="none">
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex h-8 items-center justify-center rounded-full px-4",
                        "text-sm font-medium text-muted-foreground",
                        "hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        "data-[active=true]:bg-muted data-[active=true]:text-primary",
                        pathname === item.href && "data-[active=true]"
                      )}
                      role="menuitem"
                      tabIndex={0}
                      data-active={pathname === item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </nav>
        </div>

        <div 
          className="ml-auto flex items-center gap-2"
          aria-label="User navigation"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-9 w-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Settings menu"
                tabIndex={0}
              >
                <Settings className="h-5 w-5" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Configurações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {settingsNavigation.map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link 
                    href={item.href}
                    className="flex items-center"
                    tabIndex={0}
                  >
                    <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>{item.title}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-9 gap-2 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="User menu"
                tabIndex={0}
              >
                <span className="text-sm font-medium">Provider User</span>
                <Avatar className="h-7 w-7">
                  <AvatarImage src="/avatars/default.jpg" alt="" aria-hidden="true" />
                  <AvatarFallback>PU</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Provider User</p>
                  <p className="text-xs text-muted-foreground">provider@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem tabIndex={0}>
                  <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Upgrade to Pro</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem tabIndex={0}>
                  <BadgeCheck className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem tabIndex={0}>
                  <CreditCard className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem tabIndex={0}>
                  <Bell className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Notifications</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem tabIndex={0}>
                <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <Separator aria-hidden="true" />
    </header>
  )
} 