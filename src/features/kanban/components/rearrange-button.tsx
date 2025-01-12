"use client"

import { Button } from "@mijn-ui/react-button"
import { useTaskStore } from "../utils/store"

export default function RearrangeButton() {
  const isRearranging = useTaskStore((state) => state.isRearranging)
  const setRearranging = useTaskStore((state) => state.setIsRearranging)

  return (
    <Button onClick={() => setRearranging(!isRearranging)}>
      {isRearranging ? "Done Rearranging" : "Rearrange Column"}
    </Button>
  )
}
