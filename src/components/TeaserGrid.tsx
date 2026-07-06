import { type ReactNode } from "react"
import Button from "./Button"

interface TeaserGridProps {
  headline: string
  children: ReactNode
  className?: string
  cta?: {
    label: string
    href: string
  }
}

export default function TeaserGrid({
  headline,
  children,
  className = "",
  cta,
}: TeaserGridProps) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="!py-8 m:!py-14 max-w-[1440px] mx-auto px-6 xl:px-16">
        <h2 className="text-headline-s m:text-headline-m font-bold mb-4 m:mb-6 leading-tight">
          {headline}
        </h2>
        <div className="teaser-list tw-grid !p-0 [&>.teaser]:col-span-12 teaser-list__three-items m:[&>.teaser]:col-[span_4]">
          {children}
        </div>
        {cta && (
          <div className="mt-8">
            <Button variant="primary" theme="blue" size="l" href={cta.href}>
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
