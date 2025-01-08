"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSidebar } from "@/components/ui/sidebar"
import { Blocks } from "lucide-react"

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

interface ModuleSwitcherProps {
  modules: Module[]
  selectedModule: Module | null
  onModuleSelect: (module: Module | null) => void
}

export function ModuleSwitcher({ modules, selectedModule, onModuleSelect }: ModuleSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const sidebar = useSidebar()

  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          aria-label="Selecione um módulo"
          className={cn(
            "w-full justify-between bg-zinc-900 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-50",
            sidebar.isCollapsed 
              ? "h-8 w-8 p-0 flex items-center justify-center -mx-1.0"
              : "px-2",
          )}
        >
          <Blocks className={cn(
            "h-4 w-4 text-zinc-100",
            !sidebar.isCollapsed && "mr-2"
          )} />
          {!sidebar.isCollapsed && (
            <>
              <span className="truncate text-zinc-100">
                {selectedModule?.name || "Selecione um módulo"}
              </span>
              <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0 bg-zinc-900 border-zinc-800"
        side="left"
        align="start"
        sideOffset={10}
      >
        <Command className="bg-transparent">
          <CommandInput 
            placeholder="Buscar módulo..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-9 bg-zinc-900 text-zinc-100 border-zinc-800 placeholder:text-zinc-400"
          />
          <CommandList className="text-zinc-100">
            <CommandEmpty className="text-zinc-400">Nenhum módulo encontrado.</CommandEmpty>
            <CommandGroup>
              {filteredModules.map((module) => (
                <CommandItem
                  key={module.id}
                  onSelect={() => {
                    onModuleSelect(module)
                    setOpen(false)
                  }}
                  className="text-zinc-100 hover:bg-zinc-800 hover:text-zinc-50 aria-selected:bg-zinc-800"
                >
                  <Blocks className="mr-2 h-4 w-4" />
                  <span>{module.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 