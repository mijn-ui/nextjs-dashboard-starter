import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { cn } from "@mijn-ui/react-theme"
import { ThemeProvider } from "@/components/theme/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MijnUI Admin Starter",
  description:
    "A straightforward starter template built with MijnUI components.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
