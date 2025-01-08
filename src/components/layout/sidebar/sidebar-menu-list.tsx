import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuChevronDown } from "react-icons/lu"
import { PiDotOutlineFill } from "react-icons/pi"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@mijn-ui/react-button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@mijn-ui/react-collapsible"
import { useMediaQuery } from "@mijn-ui/react-hooks"
import { buttonStyles, cn } from "@mijn-ui/react-theme"
import { SidebarListsType } from "./sidebar-data"

/* -------------------------------------------------------------------------- */

type SidebarMenuListProps = {
  lists: SidebarListsType[]
  activeIndex: number
  setActiveIndex: (index: number) => void
  onClick: (isOpen: boolean) => void
}

const SidebarMenuList = ({
  lists,
  activeIndex,
  setActiveIndex,
  onClick,
}: SidebarMenuListProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const currentPath = usePathname()

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index)
  }

  const handleClick = () => {
    if (isMobile) onClick(false)
  }

  return (
    <div className="flex w-full flex-col items-center">
      {lists?.map((listItem, index) => (
        <ListItem
          key={uuidv4()}
          listItem={listItem}
          index={index}
          activeIndex={activeIndex}
          currentPath={currentPath}
          handleToggle={handleToggle}
          handleClick={handleClick}
        />
      ))}
    </div>
  )
}

type ListItemProps = {
  listItem: SidebarListsType
  index: number
  activeIndex: number
  currentPath: string
  handleToggle: (index: number) => void
  handleClick: () => void
}

const ListItem = ({
  listItem,
  index,
  activeIndex,
  currentPath,
  handleToggle,
  handleClick,
}: ListItemProps) => {
  const { icon, title, list, link } = listItem
  const isSidebarMenuList = Array.isArray(list) && !link

  if (isSidebarMenuList) {
    return (
      <Collapsible
        key={uuidv4()}
        open={activeIndex === index}
        className="w-full"
        onOpenChange={() => handleToggle(index)}
      >
        <CollapsibleTrigger className="group flex w-full items-center gap-2 truncate px-4 py-2 text-sm text-muted-foreground hover:text-primary data-[state=open]:text-primary">
          {icon && (
            <CollapsibleIcon className="[&>svg]:size-3.5">
              {icon}
            </CollapsibleIcon>
          )}
          <div className="w-full flex-1 text-left">{title}</div>
          <LuChevronDown
            className={cn(
              "duration-400 size-4 shrink-0 text-muted-foreground ease-in-out",
              activeIndex === index && "rotate-180",
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent
          asChild
          className="data-[state=closed]:animate-collapsible-collapse data-[state=open]:animate-collapsible-expand overflow-hidden text-sm transition-[height]"
        >
          <ul>
            {list?.map((subItem) => (
              <SubListItem
                key={uuidv4()}
                subItem={subItem}
                currentPath={currentPath}
                handleClick={handleClick}
              />
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
        key={uuidv4()}
        onClick={handleClick}
        className="w-full justify-start gap-2 truncate px-3 text-muted-foreground hover:bg-transparent hover:text-primary"
      >
        {icon && (
          <span className="flex size-5 shrink-0 items-center justify-center [&>svg]:size-3.5">
            {icon}
          </span>
        )}
        {title}
      </Button>
    )
  }

  return (
    <Link
      href={link}
      key={uuidv4()}
      onClick={handleClick}
      className={cn(
        buttonStyles({ variant: "ghost" }),
        "w-full justify-start gap-2 truncate px-3 text-muted-foreground hover:bg-transparent hover:text-primary",
        link === currentPath && "text-primary",
      )}
    >
      {icon && (
        <CollapsibleIcon className="[&>svg]:size-3.5">{icon}</CollapsibleIcon>
      )}
      {title}
    </Link>
  )
}

type SubListItemProps = {
  subItem: { name: string; link: string }
  currentPath: string
  handleClick: () => void
}

const SubListItem = ({
  subItem,
  currentPath,
  handleClick,
}: SubListItemProps) => {
  const { name, link } = subItem

  return (
    <li
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary sm:pl-7"
    >
      <Link
        href={link}
        className={cn(
          "flex w-full items-center gap-1 truncate",
          link === currentPath && "text-primary",
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

const CollapsibleIcon = ({
  className,
  ...props
}: React.ComponentProps<"span">) => {
  return (
    <span
      className={cn(
        "flex size-5 shrink-0 items-center justify-center [&>svg]:size-4",
        className,
      )}
      {...props}
    />
  )
}

export default SidebarMenuList
