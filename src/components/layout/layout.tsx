"use client"

import React from "react"
import { useScrollLockEffect } from "@/hooks/use-scroll-lock"
import { ScrollArea } from "@mijn-ui/react-scroll-area"
import Navbar from "./navbar/navbar"
import Sidebar, { SidebarSkeleton } from "./sidebar/sidebar"
import { useLayout } from "./use-layout"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isSidebarActive, setIsSidebarActive, isDesktop, mainContainerStyles } = useLayout()

  // Lock scroll when sidebar is active on non-desktop screens
  useScrollLockEffect(!isDesktop && isSidebarActive)

  return (
    <>
      {/* Backdrop for mobile sidebar */}
      {isSidebarActive && !isDesktop && <div className="fixed inset-0 z-50 bg-overlay/75"></div>}

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarActive} setIsOpen={setIsSidebarActive} />

      <Navbar setIsSidebarActive={setIsSidebarActive} style={mainContainerStyles} />

      {/* Main Content Area */}
      <main style={{ ...mainContainerStyles }}>
        <ScrollArea className="h-[calc(100dvh-var(--navbar-height))] w-full px-2 py-5 md:px-5 [&_[data-radix-scroll-area-viewport]:first-of-type]:!overflow-scroll">
          {children}
        </ScrollArea>
      </main>
    </>
  )
}

export default Layout

export const LayoutSkeleton = () => (
  <>
    <SidebarSkeleton />
  </>
)
