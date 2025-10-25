import * as React from "react"
import { cn } from "@/lib/utils"

interface WireBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function WireBox({ children, className, ...props }: WireBoxProps) {
  return (
    <div
      className={cn("animate-pulse bg-zinc-800 rounded", className)}
      {...props}
    >
      {children}
    </div>
  )
}
