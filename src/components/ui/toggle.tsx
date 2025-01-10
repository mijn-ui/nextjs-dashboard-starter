"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { createTVUnstyledSlots } from "@mijn-ui/react-core"
import {
  UnstyledComponentWithSlots,
  VariantProps,
  tv,
} from "@mijn-ui/react-theme"

/** 
  This is a temporary implementation of the Toggle component.
  MijnUI does not currently have a Toggle component, so we are creating one here.
  Once the Toggle component is available in MijnUI, we can replace this temporary implementation.
  This component is needed in our project's components.
*/

const toggleStyles = tv({
  slots: {
    base: "inline-flex items-center justify-center gap-2 rounded-medium text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  },
  variants: {
    variant: {
      default: "bg-transparent",
      outline:
        "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    },
    size: {
      default: "h-10 min-w-10 px-3",
      sm: "h-9 min-w-9 px-2.5",
      lg: "h-11 min-w-11 px-5",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export type ToggleVariants = VariantProps<typeof toggleStyles>
export type ToggleSlots = keyof ReturnType<typeof toggleStyles>

/* -------------------------------------------------------------------------- */

export type ToggleBaseProps = UnstyledComponentWithSlots<ToggleSlots> &
  React.ComponentPropsWithRef<typeof TogglePrimitive.Root>

type ToggleProps = ToggleBaseProps & ToggleVariants

const Toggle = ({
  className,
  unstyled,
  variant,
  size,
  ...props
}: ToggleProps) => {
  const styles = toggleStyles({ variant, size })
  const { base } = createTVUnstyledSlots(styles, unstyled)

  return <TogglePrimitive.Root className={base({ className })} {...props} />
}

export { Toggle, toggleStyles as toggleVariants }
