"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { 
  ChevronsUpDown, 
  Plus,
  Store,
  Building2,
  GalleryVerticalEnd 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Credential = {
  name: string
  logo: React.ElementType
  type: 'admin' | 'client' | 'provider'
  linkedTo?: string
}

const credentials: Credential[] = [
  {
    name: "Global Management",
    logo: GalleryVerticalEnd,
    type: "admin",
  },
  {
    name: "Empresa Client A",
    logo: Building2,
    type: "client",
  },
  {
    name: "Empresa Provider A",
    logo: Store,
    type: "provider",
    linkedTo: "Empresa Client A",
  },
]

export function ProviderTeamSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  
  const getInitialCredential = () => {
    if (pathname?.startsWith('/sponsor')) {
      return credentials.find(c => c.type === 'client') || credentials[0]
    }
    if (pathname?.startsWith('/provider')) {
      return credentials.find(c => c.type === 'provider') || credentials[0]
    }
    return credentials.find(c => c.type === 'admin') || credentials[0]
  }

  const [activeCredential, setActiveCredential] = React.useState(getInitialCredential)

  React.useEffect(() => {
    setActiveCredential(getInitialCredential())
  }, [pathname])

  const getCaption = (credential: Credential) => {
    switch (credential.type) {
      case 'admin':
        return 'Admin'
      case 'client':
        return 'Client'
      case 'provider':
        return credential.linkedTo
      default:
        return ''
    }
  }

  const handleTeamSelect = (team: Credential) => {
    setActiveCredential(team)
    switch (team.type) {
      case 'client':
        router.push('/sponsor')
        break
      case 'provider':
        router.push('/provider')
        break
      case 'admin':
        router.push('/global')
        break
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-[240px] justify-start px-3 text-left"
        >
          <div className="flex w-full items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-zinc-50 dark:bg-zinc-800">
              <activeCredential.logo className="h-4 w-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{activeCredential.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {getCaption(activeCredential)}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px]" align="start">
        <DropdownMenuLabel className="text-xs font-medium">
          Credentials
        </DropdownMenuLabel>
        {credentials.map((credential, index) => (
          <DropdownMenuItem
            key={credential.name}
            onClick={() => handleTeamSelect(credential)}
            className="flex items-center gap-3 p-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-zinc-50 dark:bg-zinc-800">
              <credential.logo className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none">
                {credential.name}
              </span>
              {credential.type === 'provider' && (
                <span className="text-xs text-muted-foreground/80">
                  Linked to: {credential.linkedTo}
                </span>
              )}
            </div>
            <DropdownMenuShortcut className="ml-auto">⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-3 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-dashed">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-sm">Add credential</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 