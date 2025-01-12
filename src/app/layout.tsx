import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"

import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dedalo",
  description: "Construtor de sistema agnóstico/whitelabel",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers defaultTheme="system">
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
