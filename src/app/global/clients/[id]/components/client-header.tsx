import { Building2 } from "lucide-react"
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface ClientHeaderProps {
  clientName: string
}

export function ClientHeader({ clientName }: ClientHeaderProps) {
  return (
    <CardHeader className="space-y-1">
      <div className="flex items-center space-x-2">
        <Building2 className="h-5 w-5 text-muted-foreground" />
        <CardTitle>Administração do Cliente</CardTitle>
      </div>
      <CardDescription>
        Gerencie as configurações do cliente {clientName}
      </CardDescription>
    </CardHeader>
  )
} 