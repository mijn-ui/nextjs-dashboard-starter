"use client"

import React from "react"
import dynamic from "next/dynamic"
import { LayoutSkeleton } from "@/components/layout/layout"

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
  return <Layout>{children}</Layout>
}
