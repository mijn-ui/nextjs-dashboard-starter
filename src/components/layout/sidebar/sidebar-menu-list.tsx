import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useIsMobile } from "@/hooks/use-screen-sizes"
import { LuChevronDown } from "react-icons/lu"
import { PiDotOutlineFill } from "react-icons/pi"
import { v4 as uuidv4 } from "uuid"
import { buttonStyles, cn } from "@mijn-ui/react-theme"
import { Button } from "@mijn-ui/react-button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@mijn-ui/react-collapsible"
import { SidebarListsType } from "../_data/sidebar-data"

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
  const isMobile = useIsMobile()
  const currentPath = usePathname()

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index)
  }

  const handleClick = () => {
    if (isMobile) onClick(false)
  }

  return (
    <div className="flex w-full flex-col items-center">
      {lists.map((listItem, index) => (
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
  const { icon: Icon, title, list, link } = listItem
  const isSidebarMenuList = Array.isArray(list) && !link

  if (isSidebarMenuList) {
    return (
      <Collapsible
        key={`list-${uuidv4()}`}
        className="w-full"
        open={activeIndex === index}
        onOpenChange={() => handleToggle(index)}
      >
        <CollapsibleTrigger className="group flex w-full items-center gap-2 truncate px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground data-[state=open]:text-primary">
          {Icon && (
            <CollapsibleIcon className="[&>svg]:size-3.5">
              <Icon />
            </CollapsibleIcon>
          )}
          <div className="w-full flex-1 text-left">{title}</div>
          <LuChevronDown
            className={cn(
              "size-4 shrink-0 rotate-0 text-muted-foreground transition-transform duration-300 ease-in-out",
              activeIndex === index && "rotate-180",
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent asChild>
          <ul className="flex flex-col gap-1 overflow-hidden">
            {list?.map((subItem) => (
              <SubListItem
                key={`list-item-${uuidv4()}`}
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
        size="sm"
        key={`list-${uuidv4()}`}
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
      key={`list-${uuidv4()}`}
      onClick={handleClick}
      className={cn(
        buttonStyles({ variant: "ghost", size: "sm" }).base(),
        "w-full justify-start gap-2 truncate px-3 text-muted-foreground",
        link === currentPath &&
          "bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary",
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
    <li onClick={handleClick} className="block w-full sm:pl-3">
      <Link
        href={link}
        className={cn(
          buttonStyles({ variant: "ghost", size: "sm" }).base(),
          "w-full justify-start gap-1 truncate text-muted-foreground",
          link === currentPath &&
            "bg-primary/20 text-primary hover:bg-primary/20 hover:text-primary",
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
