"use client"

import { Button } from "@/components/ui/button"
import {
  FacetedFilter,
  FacetedFilterContent,
  FacetedFilterTrigger,
  FacetedFilterList,
  FacetedFilterItem,
} from "@/components/ui/faceted-filter"
import { Settings } from "lucide-react"
import { useFeatureFlags } from "@/components/providers"
import { Badge } from "@/components/ui/badge"
import { dataTableConfig } from "@/config/data-table"
import type { DataTableConfig } from "@/config/data-table"
import { CommandItem } from "@/components/ui/command"

type FeatureFlagValue = DataTableConfig["featureFlags"][number]["value"]

export function TableFeatureSelector() {
  const { featureFlags, setFeatureFlags } = useFeatureFlags()

  const handleFeatureToggle = (feature: FeatureFlagValue) => {
    if (featureFlags.includes(feature)) {
      setFeatureFlags(featureFlags.filter(f => f !== feature))
    } else {
      setFeatureFlags([...featureFlags, feature])
    }
  }

  const selectedCount = dataTableConfig.featureFlags.filter(feature => 
    featureFlags.includes(feature.value)
  ).length

  return (
    <div className="flex items-center gap-2">
      <FacetedFilter>
        <FacetedFilterTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="h-8 border-dashed"
          >
            <Settings className="mr-2 h-4 w-4" />
            Recursos da Tabela
            {selectedCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedCount}
              </Badge>
            )}
          </Button>
        </FacetedFilterTrigger>
        <FacetedFilterContent align="start" className="w-[240px]">
          <FacetedFilterList>
            {dataTableConfig.featureFlags.map((feature) => {
              const isSelected = featureFlags.includes(feature.value)
              return (
                <CommandItem
                  key={feature.value}
                  onSelect={() => handleFeatureToggle(feature.value)}
                  className="flex items-center px-2 py-2 cursor-pointer hover:bg-accent"
                >
                  <div className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border ${
                    isSelected ? "bg-primary border-primary" : "border-primary"
                  }`}>
                    {isSelected && (
                      <svg
                        className="h-3 w-3 text-primary-foreground"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <feature.icon className="mr-2 h-4 w-4" />
                  <span className="flex-1">{feature.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {feature.tooltipDescription}
                  </span>
                </CommandItem>
              )
            })}
          </FacetedFilterList>
        </FacetedFilterContent>
      </FacetedFilter>
    </div>
  )
} 