import { Inter } from "next/font/google"
import { Providers } from "@/components/providers"
import { Toaster } from "@/components/ui/toaster"
import { cookies } from "next/headers"

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
  // Pega o tema do cookie no servidor
  const cookieStore = cookies()
  const theme = cookieStore.get("theme")
  const initialTheme = theme?.value || "system"

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers defaultTheme={initialTheme}>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
