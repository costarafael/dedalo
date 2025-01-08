import { ProviderHeader } from "@/components/layout/provider-header"

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ProviderHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
} 