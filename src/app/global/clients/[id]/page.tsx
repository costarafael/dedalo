import { Suspense } from "react"
import { ClientPageContent } from "./client-page-content"
import { Skeleton } from "@/components/ui/skeleton"

interface Props {
  params: {
    id: string
  }
}

function LoadingFallback() {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    </div>
  )
}

export default async function ClientPage({ params }: Props) {
  const { id } = await params
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ClientPageContent id={id} />
    </Suspense>
  )
} 