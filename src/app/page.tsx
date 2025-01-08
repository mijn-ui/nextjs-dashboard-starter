"use client"

import React from "react"
import dynamic from "next/dynamic"
import { Button } from "@mijn-ui/react-button"
import ThemeToggle from "@/components/theme/theme-toggle"

const Layout = dynamic(() => import("@/components/layout"), { ssr: false })

const HomePage = () => {
  return (
    <Layout>
      <Button>Hello From the home page</Button>
      <ThemeToggle variant="ghost" color="primary" />
    </Layout>
  )
}

export default HomePage
