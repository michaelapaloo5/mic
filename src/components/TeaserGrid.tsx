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
    <section
      className={`block-section scroll-mt-medium l:scroll-mt-large block-section--white block-section--banner-right block-section--no-illustration bg-white ${className}`}
    >
      <div className="!py-8 m:!py-14 block-section__container tw-grid mx-auto px-6 m:px-[30px] max-w-[1350px] grid grid-cols-12">
        <h2 className="block-section__headline col-span-12 text-[32px] font-[600] leading-[1.31] mb-4 l:text-[48px] l:leading-[1.25] l:mb-6">
          {headline}
        </h2>
        <div className="block-section__left-col col-span-12">
          <div className="block-section__sub-headline text-[17px] l:text-[20px]">
            <div />
          </div>
          <div className="block-section__content mt-6 l:mt-8">
            <div className="teaser-list tw-grid !p-0 [&>.teaser]:col-span-12 teaser-list__three-items m:[&>.teaser]:col-[span_4] grid grid-cols-12">
              {children}
            </div>
          </div>
          {cta && (
            <div className="mt-8">
              <Button variant="secondary" theme="blue" size="m" href={cta.href}>
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
