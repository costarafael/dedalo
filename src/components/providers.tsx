"use client"

import { ThemeProvider } from "next-themes"
import { useQueryState } from "nuqs"
import * as React from "react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { dataTableConfig, type DataTableConfig } from "@/config/data-table"
import { cn } from "@/lib/utils"

type FeatureFlagValue = DataTableConfig["featureFlags"][number]["value"]

interface FeatureFlagsContextProps {
  featureFlags: FeatureFlagValue[]
  setFeatureFlags: (value: FeatureFlagValue[]) => void
}

const FeatureFlagsContext = React.createContext<FeatureFlagsContextProps>({
  featureFlags: [],
  setFeatureFlags: () => {},
})

export function useFeatureFlags() {
  const context = React.useContext(FeatureFlagsContext)
  if (!context) {
    throw new Error(
      "useFeatureFlags deve ser usado dentro de um FeatureFlagsProvider"
    )
  }
  return context
}

function FeatureFlagsProvider({ children }: { children: React.ReactNode }) {
  const [featureFlags, setFeatureFlags] = useQueryState<FeatureFlagValue[]>(
    "flags",
    {
      defaultValue: [],
      parse: (value) => value.split(",") as FeatureFlagValue[],
      serialize: (value) => value.join(","),
      eq: (a, b) =>
        a.length === b.length && a.every((value, index) => value === b[index]),
      clearOnDefault: true,
      shallow: false,
    }
  )

  return (
    <FeatureFlagsContext.Provider
      value={{
        featureFlags,
        setFeatureFlags: (value) => void setFeatureFlags(value),
      }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  )
}

export function Providers({ 
  children,
  defaultTheme = "system" 
}: { 
  children: React.ReactNode
  defaultTheme?: string 
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <FeatureFlagsProvider>
          {children}
        </FeatureFlagsProvider>
      </NuqsAdapter>
    </ThemeProvider>
  )
}
