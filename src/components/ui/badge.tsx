import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border-0 px-3 py-1.5 text-xs font-bold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:ring-2 focus-visible:ring-purple-500/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 to-blue-600 text-white [a&]:hover:from-purple-700 [a&]:hover:to-blue-700",
        secondary:
          "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-gray-100 [a&]:hover:from-gray-200 [a&]:hover:to-gray-300 dark:[a&]:hover:from-gray-600 dark:[a&]:hover:to-gray-700",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white [a&]:hover:from-red-600 [a&]:hover:to-red-700",
        outline:
          "text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 bg-transparent [a&]:hover:bg-gray-50 dark:[a&]:hover:bg-gray-800 [a&]:hover:border-purple-300 dark:[a&]:hover:border-purple-600 backdrop-blur-sm",
        success:
          "bg-gradient-to-r from-green-500 to-emerald-600 text-white [a&]:hover:from-green-600 [a&]:hover:to-emerald-700",
        warning:
          "bg-gradient-to-r from-orange-500 to-yellow-600 text-white [a&]:hover:from-orange-600 [a&]:hover:to-yellow-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }