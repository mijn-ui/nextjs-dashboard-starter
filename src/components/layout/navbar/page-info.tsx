"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { generatePaths } from "@/utils/generate"
import { cn } from "@mijn-ui/react-theme"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getSidebarActiveInfo, isExistingUrl } from "../utils"

/* -------------------------------------------------------------------------- */

type PageInfoProps = {
  fallbackTitle?: string
  className?: string
}

const PageInfo = ({ fallbackTitle, className }: PageInfoProps) => {
  const pathname = usePathname()
  const paths = generatePaths(pathname)
  const activeSidebarInfo = getSidebarActiveInfo(pathname)

  useEffect(() => {
    document.title =
      activeSidebarInfo?.title || fallbackTitle || "MijnUI Demo Business"
  }, [activeSidebarInfo?.title, fallbackTitle])

  return (
    <div className={cn("h-[var(--page-info-height)]", className)}>
      <h3 className="font-semibold text-foreground md:text-lg">
        {activeSidebarInfo?.title || fallbackTitle || "MijnUI Demo Business"}
      </h3>
      {isExistingUrl(pathname) && <DynamicBreadcrumb paths={paths} />}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

type DynamicBreadcrumbProps = {
  paths: { name: string; link: string }[]
}

const DynamicBreadcrumb = ({ paths }: DynamicBreadcrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="sm:gap-1">
        {paths.map((path, index) => {
          const isLastItem = index === paths.length - 1
          const isPathExist = isExistingUrl(path.link)

          return (
            <React.Fragment key={path.name}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  className={cn(
                    "text-xs capitalize",
                    !isPathExist &&
                      "hover:text-muted-foreground/80 hover:no-underline",
                    isPathExist && isLastItem && "text-main-foreground",
                  )}
                >
                  {isPathExist ? (
                    <Link href={path.link}>{path.name}</Link>
                  ) : (
                    <p>{path.name}</p>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default PageInfo
