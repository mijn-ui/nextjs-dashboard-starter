import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useIsMobile } from "@/hooks/use-screen-sizes"
import { LuChevronDown } from "react-icons/lu"
import { PiDotOutlineFill } from "react-icons/pi"
import { buttonStyles, cn } from "@mijn-ui/react-theme"
import { Button } from "@mijn-ui/react-button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@mijn-ui/react-collapsible"
import { SidebarListsType } from "../_data/sidebar-data"

/* -------------------------------------------------------------------------- */

type SidebarMenuListProps = {
  lists: SidebarListsType[]
  activeIndex: string
  setActiveIndex: (id: string) => void
  onClick: (isOpen: boolean) => void
}

const SidebarMenuList = ({ lists, activeIndex, setActiveIndex, onClick }: SidebarMenuListProps) => {
  const isMobile = useIsMobile()
  const currentPath = usePathname()

  const handleToggle = (id: string) => {
    setActiveIndex(id === activeIndex ? "" : id)
  }

  const handleClick = () => {
    if (isMobile) onClick(false)
  }

  return (
    <div className="flex w-full flex-col items-center">
      {lists.map((listItem) => (
        <ListItem
          key={listItem.id}
          listItem={listItem}
          activeIndex={activeIndex}
          currentPath={currentPath}
          handleToggle={handleToggle}
          handleClick={handleClick}
        />
      ))}
    </div>
  )
}

/* -------------------------------------------------------------------------- */

const defaultButtonStyles = buttonStyles({
  variant: "ghost",
  size: "sm",
}).base({ className: "text-muted-foreground" })

const activeButtonStyles = buttonStyles({
  variant: "subtle",
  color: "primary",
  size: "sm",
}).base()

type ListItemProps = {
  listItem: SidebarListsType
  activeIndex: string
  currentPath: string
  handleToggle: (id: string) => void
  handleClick: () => void
}

const ListItem = ({ listItem, activeIndex, currentPath, handleToggle, handleClick }: ListItemProps) => {
  const { icon: Icon, title, list, link } = listItem
  const isSidebarMenuList = Array.isArray(list) && !link

  if (isSidebarMenuList) {
    return (
      <Collapsible className="w-full" open={activeIndex === listItem.id} onOpenChange={() => handleToggle(listItem.id)}>
        <CollapsibleTrigger className="flex w-full items-center gap-2 truncate px-3 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground data-[state=open]:text-primary">
          {Icon && (
            <CollapsibleIcon className="[&>svg]:size-3.5">
              <Icon />
            </CollapsibleIcon>
          )}
          <div className="w-full flex-1 text-left">{title}</div>
          <LuChevronDown
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform duration-300 ease-in-out",
              activeIndex === listItem.id && "rotate-180",
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent
          className="overflow-hidden text-sm transition-[height] duration-300 data-[state=closed]:animate-collapsible-close data-[state=open]:animate-collapsible-open"
          asChild
        >
          <ul className="flex flex-col gap-1 overflow-hidden">
            {list?.map((subItem) => (
              <SubListItem key={subItem.id} subItem={subItem} currentPath={currentPath} handleClick={handleClick} />
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  if (!link) {
    return (
      <Button
        variant={"ghost"}
        size="sm"
        key={listItem.id}
        onClick={handleClick}
        className="w-full justify-start gap-2 truncate px-3 text-muted-foreground"
      >
        {Icon && (
          <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-3.5">
            <Icon />
          </span>
        )}
        {title}
      </Button>
    )
  }

  return (
    <Link
      href={link}
      key={listItem.id}
      onClick={handleClick}
      className={cn(
        link === currentPath ? activeButtonStyles : defaultButtonStyles,
        "w-full justify-start gap-2 truncate",
      )}
    >
      {Icon && (
        <CollapsibleIcon className="[&>svg]:size-3.5">
          <Icon />
        </CollapsibleIcon>
      )}
      {title}
    </Link>
  )
}

type SubListItemProps = {
  subItem: { id: string; name: string; link: string }
  currentPath: string
  handleClick: () => void
}

const SubListItem = ({ subItem, currentPath, handleClick }: SubListItemProps) => {
  const { name, link } = subItem

  return (
    <li onClick={handleClick} className="block w-full sm:pl-5">
      <Link
        href={link}
        className={cn(
          link === currentPath ? activeButtonStyles : defaultButtonStyles,
          "w-full justify-start gap-2 truncate",
        )}
      >
        <CollapsibleIcon>
          <PiDotOutlineFill />
        </CollapsibleIcon>
        {name}
      </Link>
    </li>
  )
}

const CollapsibleIcon = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span className={cn("flex size-5 shrink-0 items-center justify-center [&>svg]:size-4", className)} {...props} />
  )
}

export default SidebarMenuList
