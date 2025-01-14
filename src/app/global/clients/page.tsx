import { ClientList } from "../components/client-list/client-list"
import { NewClientDialog } from "@/components/dialogs/new-client-dialog"

export default function ClientsPage() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <NewClientDialog />
      </div>
      <ClientList />
    </div>
  )
}