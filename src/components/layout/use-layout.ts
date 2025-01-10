"use client"

import { useEffect, useState } from "react"
import { useIsDesktop } from "@/hooks/use-screen-sizes"

/**
 * Hook for managing layout-related state and properties.
 *
 * @returns An object containing layout state, styles, and helper methods.
 */
export const useLayout = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false)
  const isDesktop = useIsDesktop()

  const SIDEBAR_CONTENT_WIDTH = isDesktop ? 288 : 244
  const SIDEBAR_WIDTH = isDesktop ? 70 : 60
  const NAVBAR_HEIGHT = isDesktop ? 84 : 64
  const PAGE_INFO_HEIGHT = 45
  const SPACING_X = 20

  useEffect(() => {
    const bodyStyles = {
      "--navbar-height": `${NAVBAR_HEIGHT}px`,
      "--sidebar-width": `${SIDEBAR_WIDTH}px`,
      "--sidebar-content-width": `${SIDEBAR_CONTENT_WIDTH}px`,
      "--spacing-x": `${SPACING_X}px`,
      "--page-info-height": `${PAGE_INFO_HEIGHT}px`,
    }

    Object.entries(bodyStyles).forEach(([key, value]) => {
      document.body.style.setProperty(key, value)
    })

    return () => {
      Object.keys(bodyStyles).forEach((key) => {
        document.body.style.removeProperty(key)
      })
    }
  }, [
    NAVBAR_HEIGHT,
    SIDEBAR_WIDTH,
    SIDEBAR_CONTENT_WIDTH,
    SPACING_X,
    PAGE_INFO_HEIGHT,
  ])
  const mainContainerStyles = isDesktop
    ? {
        paddingLeft: isSidebarActive
          ? `${SIDEBAR_WIDTH + SIDEBAR_CONTENT_WIDTH + SPACING_X}px`
          : `${SIDEBAR_WIDTH + SPACING_X}px`,
        paddingRight: `${SPACING_X}px`,
        transition: "padding-left 0.25s ease-out",
      }
    : undefined

  return {
    isSidebarActive,
    setIsSidebarActive,
    isDesktop,
    mainContainerStyles,
  }
}
