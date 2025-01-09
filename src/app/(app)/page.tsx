import React from "react"
import { Button } from "@mijn-ui/react-button"
import ThemeToggle from "@/components/theme/theme-toggle"

const HomePage = () => {
  return (
    <div>
      <Button>Hello From the home page</Button>
      <ThemeToggle variant="ghost" color="primary" />
    </div>
  )
}

export default HomePage
