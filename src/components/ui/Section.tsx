import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <div
      className={cn("py-8", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export default Section;