import { type ReactNode } from "react"
import Button from "./Button"
import Icon from "./Icon"

interface CTA {
  label: string
  href: string
  variant?: "primary" | "secondary" | "tertiary"
  theme?: "blue" | "light"
}

interface BlockSectionProps {
  headline: string
  subline?: string
  bullets?: string[]
  ctas?: CTA[]
  illustration?: {
    src: string
    alt: string
    position: "left" | "right"
  }
  children?: ReactNode
  background?: "white" | "grey"
  className?: string
}

export default function BlockSection({
  headline,
  subline,
  bullets,
  ctas,
  illustration,
  children,
  background = "white",
  className = "",
}: BlockSectionProps) {
  const bgClass = background === "grey" ? "bg-dkb-grey" : "bg-white"

  return (
    <section className={`${bgClass} ${className}`}>
      <div className="max-w-[1440px] mx-auto px-6 xl:px-16 py-12 m:py-16 xl:py-20">
        <div className={`grid grid-cols-1 m:grid-cols-12 gap-8 m:gap-12 xl:gap-16 items-center ${illustration?.position === "right" ? "" : ""}`}>
          {/* Text content */}
          <div className={`m:col-span-7 xl:col-span-8 ${illustration?.position === "right" ? "m:order-1" : ""}`}>
            <h2 className="text-headline-s m:text-headline-m font-bold leading-tight">{headline}</h2>
            {subline && (
              <p className="mt-4 text-m m:text-l text-dkb-text">{subline}</p>
            )}
            {bullets && (
              <ul className="mt-6 space-y-3">
                {bullets.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-m m:text-l">
                    <span className="mt-0.5 shrink-0 text-dkb-teal">
                      <Icon name="checkmark" size={20} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {children}
            {ctas && ctas.length > 0 && (
              <div className="mt-8 flex flex-col m:flex-row items-start gap-4">
                {ctas.map((cta, i) => (
                  <Button
                    key={i}
                    variant={cta.variant || (i === 0 ? "primary" : "tertiary")}
                    theme={cta.theme || "blue"}
                    size="m"
                    href={cta.href}
                  >
                    {cta.label}
                    {i > 0 && <Icon name="arrow-right" size={16} />}
                  </Button>
                ))}
              </div>
            )}
          </div>
          {/* Illustration */}
          {illustration && (
            <div className={`m:col-span-5 xl:col-span-4 ${illustration.position === "left" ? "m:order-2" : ""}`}>
              <img
                src={illustration.src}
                alt={illustration.alt}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
