"use client"

import { useState } from "react"
import { Button } from "@mijn-ui/react-button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mijn-ui/react-dialog"
import { Input } from "@mijn-ui/react-input"
import { useTaskStore } from "../utils/store"

export default function NewSectionDialog() {
  const addCol = useTaskStore((state) => state.addCol)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const { title } = Object.fromEntries(formData)

    if (typeof title !== "string") return

    addCol(title)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger unstyled asChild>
        <Button className="w-full">＋ Add New Section</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Section</DialogTitle>
          <DialogDescription>What section you want to add today?</DialogDescription>
        </DialogHeader>
        <form id="todo-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="title"
              name="title"
              label="Section title.."
              className="col-span-4"
              classNames={{
                input: "bg-card",
                label: "bg-card peer-focus:bg-card",
              }}
            />
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" color="primary" size="sm" form="todo-form">
            Add Section
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
