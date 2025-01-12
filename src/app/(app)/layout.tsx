"use client"

import React from "react"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"
import { LayoutSkeleton } from "@/components/layout/layout"
import { isExistingUrl } from "@/components/layout/utils"
import NotFound from "../not-found"

// we have to use dynamic import here to avoid hydration error
// because we inject the layout styles in to body tag dynamically
const Layout = dynamic(() => import("@/components/layout/layout"), {
  loading: () => <LayoutSkeleton />,
  ssr: false,
})

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  if (!isExistingUrl(pathname)) {
    return NotFound()
  }

  return <Layout>{children}</Layout>
}
