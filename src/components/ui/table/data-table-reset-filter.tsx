"use client"

import { Button } from "@mijn-ui/react-button"

type DataTableResetFilterProps = {
  isFilterActive: boolean
  onReset: () => void
}

export function DataTableResetFilter({ isFilterActive, onReset }: DataTableResetFilterProps) {
  return (
    <>
      {isFilterActive ? (
        <Button variant="outlined" onClick={onReset}>
          Reset Filters
        </Button>
      ) : null}
    </>
  )
}
