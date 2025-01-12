"use client"

import * as React from "react"
import { UniqueIdentifier } from "@dnd-kit/core"
import { LuEllipsisVertical } from "react-icons/lu"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@mijn-ui/react-alert-dialog"
import { Button } from "@mijn-ui/react-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@mijn-ui/react-dropdown-menu"
import { Input } from "@mijn-ui/react-input"
import { useTaskStore } from "../utils/store"

export function ColumnActions({ title, id }: { title: string; id: UniqueIdentifier }) {
  const [open, setIsOpen] = React.useState(false)
  const [name, setName] = React.useState(title)
  const updateCol = useTaskStore((state) => state.updateCol)
  const removeCol = useTaskStore((state) => state.removeCol)
  const [editDisable, setIsEditDisable] = React.useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setIsEditDisable(!editDisable)
          updateCol(id, name)
          toast(`${title} updated to ${name}`)
        }}
      >
        <Input
          value={name}
          classNames={{
            input:
              "bg-transparent border-none text-large font-medium disabled:cursor-pointer disabled:border-none disabled:opacity-100 px-0",
          }}
          onChange={(e) => setName(e.target.value)}
          className="-mt-1.5 mr-auto"
          disabled={editDisable}
          ref={inputRef}
        />
      </form>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger unstyled asChild>
          <Button radius="full" size="xs" variant="ghost" iconOnly className="ml-1">
            <span className="sr-only">Actions</span>
            <LuEllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onSelect={() => {
              setIsEditDisable(!editDisable)
              setTimeout(() => {
                inputRef.current && inputRef.current?.focus()
              }, 500)
            }}
          >
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)} className="text-red-600">
            Delete Section
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure want to delete column?</AlertDialogTitle>
            <AlertDialogDescription>
              NOTE: All tasks related to this category will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              color="danger"
              onClick={() => {
                // yes, you have to set a timeout
                setTimeout(() => (document.body.style.pointerEvents = ""), 100)

                setShowDeleteDialog(false)
                removeCol(id)
                toast("This column has been deleted.")
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
