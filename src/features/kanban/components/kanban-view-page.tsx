import { Heading } from "@/components/ui/heading"
import { KanbanBoard } from "./kanban-board"
import NewTaskDialog from "./new-task-dialog"
import RearrangeButton from "./rearrange-button"

export default function KanbanViewPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading title={`Kanban`} description="Manage tasks by dnd" />
        <div className="flex items-center gap-2">
          <RearrangeButton />
          <NewTaskDialog />
        </div>
      </div>
      <KanbanBoard />
    </div>
  )
}
