import { Suspense } from "react"
import Link from "next/link"
import ProductListingPage from "@/features/products/components/product-listing"
import ProductTableAction from "@/features/products/components/product-tables/product-table-action"
import { searchParamsCache, serialize } from "@/lib/searchparams"
import { SearchParams } from "nuqs/server"
import { LuPlus } from "react-icons/lu"
import { buttonStyles, cn } from "@mijn-ui/react-theme"
import { Separator } from "@mijn-ui/react-separator"
import { Heading } from "@/components/ui/heading"
import { DataTableSkeleton } from "@/components/ui/table/data-table-skeleton"

export const metadata = {
  title: "Dashboard: Products",
}

type pageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  const key = serialize({ ...searchParams })

  return (
    <div className="space-y-4 px-1">
      <div className="flex items-start justify-between">
        <Heading title="Products" description="Manage products (Server side table functionalities.)" />
        <Link
          href="/dashboard/product/new"
          className={cn(buttonStyles({ color: "primary" }).base(), "text-xs md:text-sm")}
        >
          <LuPlus className="mr-2 size-4" /> Add New
        </Link>
      </div>
      <Separator />
      <ProductTableAction />
      <Suspense key={key} fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}>
        <ProductListingPage />
      </Suspense>
    </div>
  )
}
