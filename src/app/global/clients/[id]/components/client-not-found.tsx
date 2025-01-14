import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function ClientNotFound() {
  const router = useRouter()

  return (
    <div className="container flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Cliente não encontrado</CardTitle>
          <CardDescription>
            O cliente solicitado não existe ou foi removido
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => router.push("/global/clients")}>
            Voltar para lista
          </Button>
        </CardContent>
      </Card>
    </div>
  )
} 