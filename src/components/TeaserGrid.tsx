import { type ReactNode } from "react"

interface TeaserGridProps {
  headline?: string
  subline?: string
  children: ReactNode
  className?: string
}

export default function TeaserGrid({
  headline,
  subline,
  children,
  className = "",
}: TeaserGridProps) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="max-w-[1440px] mx-auto px-6 xl:px-16 py-12 m:py-16 xl:py-20">
        {headline && (
          <h2 className="text-headline-s m:text-headline-m font-bold leading-tight">{headline}</h2>
        )}
        {subline && (
          <p className="mt-3 text-m m:text-l text-dkb-text max-w-2xl">{subline}</p>
        )}
        <div className="mt-8 grid grid-cols-1 m:grid-cols-2 l:grid-cols-3 gap-6 xl:gap-8">
          {children}
        </div>
      </div>
    </section>
  )
}
