import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { LuGripVertical } from "react-icons/lu"
import { tv } from "@mijn-ui/react-theme"
import { Badge } from "@mijn-ui/react-badge"
import { Button } from "@mijn-ui/react-button"
import { Card, CardContent, CardHeader } from "@mijn-ui/react-card"
import { Task } from "../utils/store"

// export interface Task {
//   id: UniqueIdentifier;
//   columnId: ColumnId;
//   content: string;
// }

interface TaskCardProps {
  task: Task
  isOverlay?: boolean
}

export type TaskType = "Task"

export interface TaskDragData {
  type: TaskType
  task: Task
}

export function TaskCard({ task, isOverlay }: TaskCardProps) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  const variants = tv({
    base: "mb-2",
    variants: {
      dragging: {
        over: "opacity-30 ring-2",
        overlay: "ring-2 ring-ring",
      },
    },
  })

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        className: "group",
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className="relative flex flex-row justify-between border-b border-border p-3">
        <Badge size="xs" variant={"outlined"} className="mr-auto">
          Task
        </Badge>
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className="mr-2 h-auto cursor-grab p-1 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <span className="sr-only">Move task</span>
          <LuGripVertical />
        </Button>
      </CardHeader>
      <CardContent className="whitespace-pre-wrap px-3 pb-6 pt-3 text-left">{task.title}</CardContent>
    </Card>
  )
}
