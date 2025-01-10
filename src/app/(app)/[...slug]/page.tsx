import { isExistingUrl } from "@/components/layout/utils"
import NotFound from "@/app/not-found"

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params
  const pathname = `/${slug.join("/")}`

  if (!isExistingUrl(pathname)) {
    return (
      <div className="mt-40">
        <NotFound />
      </div>
    )
  }

  return (
    <div className="mt-40 flex w-full items-center justify-center">
      {pathname}
    </div>
  )
}
