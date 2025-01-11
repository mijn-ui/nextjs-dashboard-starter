"use client"

import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { parseAsInteger, useQueryState } from "nuqs"
import { LuChevronLeft, LuChevronRight, LuChevronsLeft, LuChevronsRight } from "react-icons/lu"
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx"
import { Button } from "@mijn-ui/react-button"
import {
  Pagination,
  PaginationContent,
  PaginationList,
  PaginationNextButton,
  PaginationNextEllipsis,
  PaginationPreviousButton,
  PaginationPreviousEllipsis,
} from "@mijn-ui/react-pagination"
import { ScrollArea, ScrollBar } from "@mijn-ui/react-scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@mijn-ui/react-select"
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "@mijn-ui/react-table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  totalItems: number
  pageSizeOptions?: number[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalItems,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withOptions({ shallow: false }).withDefault(1),
  )
  const [pageSize, setPageSize] = useQueryState(
    "limit",
    parseAsInteger.withOptions({ shallow: false, history: "push" }).withDefault(10),
  )

  const paginationState = {
    pageIndex: currentPage - 1, // zero-based index for React Table
    pageSize: pageSize,
  }

  const pageCount = Math.ceil(totalItems / pageSize)

  const handlePaginationChange = (updaterOrValue: PaginationState | ((old: PaginationState) => PaginationState)) => {
    const pagination = typeof updaterOrValue === "function" ? updaterOrValue(paginationState) : updaterOrValue

    setCurrentPage(pagination.pageIndex + 1) // converting zero-based index to one-based
    setPageSize(pagination.pageSize)
  }

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
    state: {
      pagination: paginationState,
    },
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualFiltering: true,
  })

  return (
    <div className="space-y-4">
      <ScrollArea className="grid h-[calc(80vh-240px)] rounded-md border md:h-[calc(90dvh-260px)]">
        <Table className="relative w-full">
          <TableHeader className="bg-accent">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeaderCell key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHeaderCell>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-card">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-2 sm:flex-row">
        <div className="flex w-full items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            {totalItems > 0 ? (
              <>
                Showing {paginationState.pageIndex * paginationState.pageSize + 1} to{" "}
                {Math.min((paginationState.pageIndex + 1) * paginationState.pageSize, totalItems)} of {totalItems}{" "}
                entries
              </>
            ) : (
              "No entries found"
            )}
          </div>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex items-center space-x-2">
              <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
              <Select
                value={`${paginationState.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={paginationState.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
          <div className="flex w-[150px] items-center justify-center text-sm font-medium">
            {totalItems > 0 ? (
              <>
                Page {paginationState.pageIndex + 1} of {table.getPageCount()}
              </>
            ) : (
              "No pages"
            )}
          </div>
          <Pagination
            totalPages={totalItems}
            currentPage={currentPage}
            itemsPerPage={pageSize}
            onChangePage={setCurrentPage}
          >
            <PaginationContent className="gap-0">
              <Button
                aria-label="Go to the first page."
                size="xs"
                variant="ghost"
                iconOnly
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <LuChevronsLeft className="size-4" />
              </Button>
              <Button asChild size="xs" variant="ghost">
                <PaginationPreviousButton
                  unstyled
                  aria-label="Go to the previous page."
                  disabled={!table.getCanPreviousPage()}
                >
                  <LuChevronLeft className="size-4" />
                </PaginationPreviousButton>
              </Button>
              <PaginationList className="[&>li>button]:size-9 sm:[&>li>button]:size-10" />
              <Button asChild size="xs" variant="ghost">
                <PaginationNextButton unstyled aria-label="Go to the next page." disabled={!table.getCanNextPage()}>
                  <LuChevronRight className="size-4" />
                </PaginationNextButton>
              </Button>
              <Button
                aria-label="Go to the last page."
                size="xs"
                variant="ghost"
                iconOnly
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <LuChevronsRight className="size-4" />
              </Button>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
