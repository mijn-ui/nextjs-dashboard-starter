"use client"

import React from "react"
import { Options } from "nuqs"
import { LuCheck } from "react-icons/lu"
import { RxPlusCircled } from "react-icons/rx"
import { cn } from "@mijn-ui/react-theme"
import { Badge } from "@mijn-ui/react-badge"
import { Button } from "@mijn-ui/react-button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@mijn-ui/react-command"
import { Popover, PopoverContent, PopoverTrigger } from "@mijn-ui/react-popover"
import { Separator } from "@mijn-ui/react-separator"

interface FilterOption {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FilterBoxProps {
  filterKey: string
  title: string
  options: FilterOption[]
  setFilterValue: (
    value: string | ((old: string) => string | null) | null,
    options?: Options | undefined,
  ) => Promise<URLSearchParams>
  filterValue: string
}

export function DataTableFilterBox({ filterKey, title, options, setFilterValue, filterValue }: FilterBoxProps) {
  const selectedValuesSet = React.useMemo(() => {
    if (!filterValue) return new Set<string>()
    const values = filterValue.split(".")
    return new Set(values.filter((value) => value !== ""))
  }, [filterValue])

  const handleSelect = (value: string) => {
    const newSet = new Set(selectedValuesSet)
    if (newSet.has(value)) {
      newSet.delete(value)
    } else {
      newSet.add(value)
    }
    setFilterValue(Array.from(newSet).join(".") || null)
  }

  const resetFilter = () => setFilterValue(null)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outlined" className="border-dashed">
          <RxPlusCircled className="mr-2 size-4" />
          {title}
          {selectedValuesSet.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge color="secondary" size="xs" className="font-normal lg:hidden">
                {selectedValuesSet.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValuesSet.size > 2 ? (
                  <Badge color="secondary" size="sm" className="font-normal">
                    {selectedValuesSet.size} selected
                  </Badge>
                ) : (
                  Array.from(selectedValuesSet).map((value) => (
                    <Badge color="secondary" size="xs" key={value} className="px-1 font-normal">
                      {options.find((option) => option.value === value)?.label || value}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
                  <div
                    className={cn(
                      "mr-2 flex size-4 items-center justify-center rounded-small border border-primary",
                      selectedValuesSet.has(option.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <LuCheck className="size-4" aria-hidden="true" />
                  </div>
                  {option.icon && <option.icon className="mr-2 size-4 text-muted-foreground" aria-hidden="true" />}
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {selectedValuesSet.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={resetFilter} className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
