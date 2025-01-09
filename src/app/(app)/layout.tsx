"use client"

import React from "react"
import dynamic from "next/dynamic"
import { LayoutSkeleton } from "@/components/layout"

const Layout = dynamic(() => import("@/components/layout"), {
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
