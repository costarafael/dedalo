import { SidebarProvider } from "@/components/ui/sidebar"

export default function SponsorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative">
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </div>
  )
} 