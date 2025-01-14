import { Boxes, Network, Settings, Users } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClientInfoForm } from "./client-info-form"
import { OrganizationalUnitsManager } from "@/components/organizational-units/organizational-units-manager"

interface ClientTabsProps {
  client: {
    id: string
    name: string
  }
}

export function ClientTabs({ client }: ClientTabsProps) {
  return (
    <Tabs defaultValue="info" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="info" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Informações
        </TabsTrigger>
        <TabsTrigger value="providers" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Providers
        </TabsTrigger>
        <TabsTrigger value="modules" className="flex items-center gap-2">
          <Boxes className="h-4 w-4" />
          Módulos
        </TabsTrigger>
        <TabsTrigger value="units" className="flex items-center gap-2">
          <Network className="h-4 w-4" />
          Unidades
        </TabsTrigger>
      </TabsList>

      <TabsContent value="info" className="space-y-6 pt-4">
        <ClientInfoForm client={client} />
      </TabsContent>

      <TabsContent value="providers" className="min-h-[200px]">
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground space-y-4">
          <Users className="h-12 w-12" />
          <p className="text-lg">Em breve: Gerenciamento de Providers</p>
        </div>
      </TabsContent>

      <TabsContent value="modules" className="min-h-[200px]">
        <div className="flex flex-col items-center justify-center py-8 text-muted-foreground space-y-4">
          <Boxes className="h-12 w-12" />
          <p className="text-lg">Em breve: Gerenciamento de Módulos</p>
        </div>
      </TabsContent>

      <TabsContent value="units">
        <OrganizationalUnitsManager id={client.id} />
      </TabsContent>
    </Tabs>
  )
} 