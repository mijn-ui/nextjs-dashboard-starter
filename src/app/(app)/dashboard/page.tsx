import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function Dashboard() {
  const session = await auth()

  if (!session?.user) {
    return redirect("/")
  } else {
    redirect("/dashboard/overview")
  }
}
