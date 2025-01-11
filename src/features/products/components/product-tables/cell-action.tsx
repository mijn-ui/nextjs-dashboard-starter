"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Product } from "@/constants/data"
import { LuEllipsis, LuSquarePen, LuTrash } from "react-icons/lu"
import { Button } from "@mijn-ui/react-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@mijn-ui/react-dropdown-menu"
import { AlertModal } from "@/components/modal/alert-modal"

interface CellActionProps {
  data: Product
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const onConfirm = async () => {}

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onConfirm} loading={loading} />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger unstyled asChild>
          <Button variant="ghost" iconOnly size="xs">
            <span className="sr-only">Open menu</span>
            <LuEllipsis className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => router.push(`/dashboard/product/${data.id}`)}>
            <LuSquarePen className="mr-2 size-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <LuTrash className="mr-2 size-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
