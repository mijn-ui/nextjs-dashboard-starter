"use client"

import { useState } from "react"
import { Button } from "@mijn-ui/react-button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@mijn-ui/react-dialog"
import { Input } from "@mijn-ui/react-input"
import { Textarea } from "@mijn-ui/react-textarea"
import { useTaskStore } from "../utils/store"

export default function NewTaskDialog() {
  const addTask = useTaskStore((state) => state.addTask)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const { title, description } = Object.fromEntries(formData)

    if (typeof title !== "string" || typeof description !== "string") return
    addTask(title, description)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger unstyled asChild>
        <Button color="primary" size="sm">
          ＋ Add New Todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription>What do you want to get done today?</DialogDescription>
        </DialogHeader>
        <form id="todo-form" className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="title"
              name="title"
              label="Todo title"
              className="col-span-4"
              classNames={{
                input: "bg-card",
                label: "bg-card peer-focus:bg-card",
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Textarea id="description" name="description" placeholder="Description..." className="col-span-4 bg-card" />
          </div>
        </form>
        <DialogFooter>
          <Button color="primary" type="submit" size="sm" form="todo-form">
            Add Todo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
