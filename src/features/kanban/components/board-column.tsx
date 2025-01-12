import { useMemo } from "react"
import { type UniqueIdentifier, useDndContext } from "@dnd-kit/core"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import ClickAwayListener from "react-click-away-listener"
import { LuGripVertical } from "react-icons/lu"
import { cn, tv } from "@mijn-ui/react-theme"
import { Button } from "@mijn-ui/react-button"
import { Card, CardContent, CardHeader } from "@mijn-ui/react-card"
import { ScrollArea, ScrollBar } from "@mijn-ui/react-scroll-area"
import { Task } from "../utils/store"
import { ColumnActions } from "./column-action"
import { TaskCard } from "./task-card"

export interface Column {
  id: UniqueIdentifier
  title: string
}

export type ColumnType = "Column"

export interface ColumnDragData {
  type: ColumnType
  column: Column
}

interface BoardColumnProps {
  column: Column
  tasks: Task[]
  isOverlay?: boolean
  isRearranging?: boolean
  setIsRearranging?: (isRearranging: boolean) => void
}

export function BoardColumn({ column, tasks, isOverlay, isRearranging, setIsRearranging }: BoardColumnProps) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    } satisfies ColumnDragData,
    attributes: {
      roleDescription: `Column: ${column.title}`,
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  const variants = tv({
    base: "flex h-[75vh] max-h-[75vh] w-[350px] max-w-full flex-shrink-0 snap-center flex-col rounded-large bg-muted p-2",
    variants: {
      isRearranging: {
        true: "border border-ring",
        false: "",
      },
      dragging: {
        default: "border-2 border-transparent",
        over: "opacity-30 ring-2 ring-ring/30",
        overlay: "ring-2 ring-ring",
      },
    },
  })

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        className: "group/container relative",
        isRearranging: isRearranging,
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="flex flex-row items-center justify-between border-b-2 px-4 py-2 text-left font-semibold">
        <ClickAwayListener
          onClickAway={(event) => {
            const clickedElement = event.target as HTMLElement
            if (clickedElement.closest("[data-role='rearrange-button']")) return
            setIsRearranging?.(false)
          }}
        >
          <Button
            {...attributes}
            {...listeners}
            size="xs"
            iconOnly
            data-role="rearrange-button"
            className={cn("absolute -right-2 -top-2 cursor-grab border border-ring", !isRearranging && "hidden")}
          >
            <span className="sr-only">{`Move column: ${column.title}`}</span>
            <LuGripVertical />
          </Button>
        </ClickAwayListener>

        {/* <span className="mr-auto !mt-0"> {column.title}</span> */}
        {/* <Input
          defaultValue={column.title}
          className="text-base !mt-0 mr-auto"
        /> */}
        <ColumnActions id={column.id} title={column.title} />
      </CardHeader>
      <CardContent className="flex grow flex-col gap-4 overflow-x-hidden p-2">
        <ScrollArea className="h-full">
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </SortableContext>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export function BoardContainer({ children }: { children: React.ReactNode }) {
  const dndContext = useDndContext()

  const variations = tv({
    base: "flex px-2 pb-4 md:px-0 lg:justify-start",
    variants: {
      dragging: {
        default: "",
        active: "snap-none",
      },
    },
  })

  return (
    <ScrollArea className="whitespace-nowrap rounded-md">
      <div
        className={variations({
          dragging: dndContext.active ? "active" : "default",
        })}
      >
        <div className="flex flex-row items-start justify-center gap-4 pt-4">{children}</div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
