"use client"

import { useRouter } from "next/navigation"
import { Button } from "@mijn-ui/react-button"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-muted-foreground/50 bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold">
        Something&apos;s missing
      </h2>
      <p>
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.back()} color="primary">
          Go back
        </Button>
        <Button onClick={() => router.push("/dashboard")} variant="ghost">
          Back to Home
        </Button>
      </div>
    </div>
  )
}