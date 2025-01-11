"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useIsDesktop } from "@/hooks/use-screen-sizes"
import ClickAwayListener from "react-click-away-listener"
import { LuArrowRight } from "react-icons/lu"
import { cn } from "@mijn-ui/react-theme"
import { Button } from "@mijn-ui/react-button"
import Logo from "@/components/common/logo"
import { SidebarData } from "../_data/sidebar-data"
import { getSidebarActiveInfo } from "../utils"
import SidebarMenuList from "./sidebar-menu-list"

/* -------------------------------------------------------------------------- */

type SidebarProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const path = usePathname()

  // Get active menu and collapsible indices
  const activeSidebarInfo = getSidebarActiveInfo(path)

  // State for current menu index
  const [currentMenuId, setCurrentMenuId] = useState<string>(activeSidebarInfo?.id || "")

  // State for active of collapsible lists
  const [activeCollapsibleId, setActiveCollapsibleId] = useState<Record<string, string>>({
    [currentMenuId]: activeSidebarInfo?.collapsibleId || "",
  })

  const isDesktop = useIsDesktop()

  const handleSetActiveIndex = (id: string) => {
    setActiveCollapsibleId((prev) => ({
      ...prev,
      [currentMenuId]: id,
    }))
  }

  const handleSidebarIconClick = (id: string) => {
    setCurrentMenuId(id)
    setIsOpen(true)
  }

  const currentSidebarData = SidebarData.find((data) => data.id === currentMenuId)
  const currentActiveIndex = activeCollapsibleId[currentMenuId] ?? ""

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <aside
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "group fixed inset-y-0 left-0 z-50 flex bg-sidebar shadow-md transition-[left] duration-300 ease-in-out",
          !isDesktop && "data-[state=closed]:-left-[var(--sidebar-content-width)]",
        )}
      >
        <div className="flex w-[var(--sidebar-width)] flex-col items-center gap-8 pt-8">
          <Link href={"/"}>
            <Logo className="size-6" />
          </Link>

          <div className="flex flex-col gap-2 pt-5">
            {SidebarData.map(({ id, title, icon: Icon }) => (
              <Button
                key={id}
                variant={id === currentMenuId ? "subtle" : "ghost"}
                color={id === currentMenuId ? "primary" : "default"}
                iconOnly
                onClick={() => handleSidebarIconClick(id)}
                title={title}
              >
                {Icon && <Icon />}
              </Button>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "group-data-[state=open]:opacity-1 relative flex h-full flex-col gap-4 overflow-y-auto border-l border-l-border py-8 transition-[width_300ms,opacity_700ms] duration-300 ease-out group-data-[state=closed]:w-0 group-data-[state=open]:w-[var(--sidebar-content-width)] group-data-[state=closed]:overflow-hidden group-data-[state=closed]:opacity-0",
          )}
        >
          <h3 className="truncate px-6 text-xs font-semibold uppercase text-muted-foreground">
            {currentSidebarData?.category}
          </h3>

          <div className="px-3 md:px-6">
            {currentSidebarData?.lists && (
              <SidebarMenuList
                key={currentMenuId}
                lists={currentSidebarData?.lists}
                activeIndex={currentActiveIndex}
                setActiveIndex={handleSetActiveIndex}
                onClick={setIsOpen}
              />
            )}
          </div>
        </div>

        <SidebarToggler isOpen={isOpen} setIsOpen={setIsOpen} />
      </aside>
    </ClickAwayListener>
  )
}

/* -------------------------------------------------------------------------- */

type SidebarTogglerProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const SidebarToggler = ({ isOpen, setIsOpen }: SidebarTogglerProps) => (
  <Button
    iconOnly
    className="absolute bottom-20 right-0 hidden size-7 translate-x-3.5 rounded-medium p-0 md:flex"
    onClick={() => setIsOpen(!isOpen)}
  >
    <LuArrowRight className={`transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
  </Button>
)

export default Sidebar

/* -------------------------------------------------------------------------- */

export const SidebarSkeleton = (props: React.ComponentProps<"aside">) => {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-50 flex w-[var(--sidebar-width)] animate-pulse bg-sidebar shadow-md transition-[left] duration-1000 ease-in-out"
      {...props}
    />
  )
}
