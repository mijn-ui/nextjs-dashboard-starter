"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useIsDesktop } from "@/hooks/use-screen-sizes"
import ClickAwayListener from "react-click-away-listener"
import { BsGrid3X3GapFill } from "react-icons/bs"
import { LuArrowRight } from "react-icons/lu"
import { buttonStyles, cn } from "@mijn-ui/react-theme"
import { Button } from "@mijn-ui/react-button"
import Logo from "@/components/common/logo"
import { SidebarData } from "../_data/sidebar-data"
import { ADMIN_URL } from "../_data/url-data"
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
  const [currentMenuIndex, setCurrentMenuIndex] = useState<number>(
    activeSidebarInfo?.index || 0,
  )

  // State for active indices of collapsible lists
  const [activeIndices, setActiveIndices] = useState<{ [key: number]: number }>(
    {
      [currentMenuIndex]: activeSidebarInfo?.collapsibleIndex || -1,
    },
  )

  const isDesktop = useIsDesktop()

  const handleSetActiveIndex = (index: number) => {
    setActiveIndices((prev) => ({
      ...prev,
      [currentMenuIndex]: index,
    }))
  }

  const handleSidebarIconClick = (index: number) => {
    setCurrentMenuIndex(index)
    setIsOpen(true)
  }

  const currentSidebarData = SidebarData[currentMenuIndex]
  const currentActiveIndex = activeIndices[currentMenuIndex] ?? -1

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <aside
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "group fixed inset-y-0 left-0 z-50 flex bg-sidebar shadow-md transition-[left] duration-300 ease-in-out",
          !isDesktop &&
            "data-[state=closed]:-left-[var(--sidebar-content-width)]",
        )}
      >
        <div className="flex w-[var(--sidebar-width)] flex-col items-center gap-8 pt-8">
          <Link href={"/"}>
            <Logo className="size-6" />
          </Link>

          <div className="flex flex-col gap-2">
            <Link
              href={ADMIN_URL}
              className={cn(
                buttonStyles({
                  variant: "outlined",
                  iconOnly: true,
                }).base(),
                "border-primary bg-accent/80 text-primary hover:text-primary",
              )}
              title={"App"}
            >
              <BsGrid3X3GapFill size={20} />
            </Link>

            {SidebarData.map(({ title, icon: Icon }, index) => (
              <Button
                key={title}
                variant="ghost"
                color="default"
                iconOnly
                onClick={() => handleSidebarIconClick(index)}
                className={cn(
                  "text-foreground",
                  index === currentMenuIndex
                    ? "bg-accent/80 text-primary hover:text-primary"
                    : "text-muted-foreground",
                )}
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
            <SidebarMenuList
              key={currentMenuIndex}
              lists={currentSidebarData?.lists}
              activeIndex={currentActiveIndex ?? -1}
              setActiveIndex={handleSetActiveIndex}
              onClick={setIsOpen}
            />
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
    <LuArrowRight
      className={`transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
    />
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
