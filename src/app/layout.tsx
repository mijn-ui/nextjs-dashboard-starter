import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { cn } from "@mijn-ui/react-theme"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], fallback: ["sans serif"] })

export const metadata: Metadata = {
  title: "MijnUI Admin Starter",
  description: "A straightforward starter template built with MijnUI components.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NuqsAdapter>
            <Toaster />
            {children}
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  )
}
