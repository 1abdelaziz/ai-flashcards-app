import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-purple-500/30 selection:text-purple-900 dark:selection:text-purple-100 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 flex h-12 w-full min-w-0 rounded-xl px-4 py-3 text-base shadow-lg transition-all duration-300 outline-none file:inline-flex file:h-9 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus:border-purple-400 dark:focus:border-purple-600 focus:ring-4 focus:ring-purple-500/20 focus:shadow-xl focus:scale-[1.02]",
        "hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl",
        "aria-invalid:border-red-400 dark:aria-invalid:border-red-600 aria-invalid:ring-red-500/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }