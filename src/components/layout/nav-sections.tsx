"use client"

import { Building, Blocks, Library, Settings2 } from "lucide-react"
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

interface NavSectionsProps {
  sections?: string[]
  onSectionChange: (section: string) => void
}

const sectionIcons = {
  entities: Building,
  applications: Building,
  modules: Blocks,
  libraries: Library,
  settings: Settings2,
}

const sectionLabels = {
  entities: "Entidades",
  applications: "Aplicações",
  modules: "Módulos",
  libraries: "Libraries",
  settings: "Configurações",
}

export function NavSections({ sections = ["entities", "modules", "libraries"], onSectionChange }: NavSectionsProps) {
  const [activeSection, setActiveSection] = useState(sections[0])
  const { isCollapsed } = useSidebar()

  const handleValueChange = (value: string) => {
    if (value) {
      setActiveSection(value)
      onSectionChange(value)
    }
  }

  return (
    <div className="px-2">
      <TooltipProvider>
        <ToggleGroup
          type="single"
          value={activeSection}
          onValueChange={handleValueChange}
          className={cn(
            "flex justify-center gap-1",
            isCollapsed ? "flex-col" : "items-center"
          )}
        >
          {sections.map((section) => {
            const Icon = sectionIcons[section as keyof typeof sectionIcons]
            const label = sectionLabels[section as keyof typeof sectionLabels]
            
            return (
              <div key={section} className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value={section}
                      aria-label={`${label} Section`}
                      className="h-8 w-8 p-0"
                    >
                      <Icon className="h-4 w-4" />
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
                {activeSection === section && (
                  <div className={cn(
                    "absolute bg-primary rounded-full opacity-80",
                    isCollapsed 
                      ? "h-[24px] w-[2px] -right-1 top-1/2 -translate-y-1/2" 
                      : "w-[24px] h-[2px] left-1/2 top-[-2px] -translate-x-1/2"
                  )} />
                )}
              </div>
            )
          })}
        </ToggleGroup>
      </TooltipProvider>
    </div>
  )
} 