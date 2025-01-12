export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const pathname = `/${slug.join("/")}`

  return <div className="mt-40 flex w-full items-center justify-center">{pathname}</div>
}
