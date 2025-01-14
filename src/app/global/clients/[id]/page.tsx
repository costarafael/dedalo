"use client"

import { Suspense } from "react"
import { ClientPageContent } from "./client-page-content"
import { ClientLoading } from "./components/client-loading"

interface Props {
  params: {
    id: string
  }
}

export default function ClientPage({ params }: Props) {
  return (
    <Suspense fallback={<ClientLoading />}>
      <ClientPageContent id={params.id} />
    </Suspense>
  )
} 