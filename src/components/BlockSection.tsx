import Button from "./Button"
import Icon from "./Icon"

interface BlockSectionProps {
  headline: string
  subHeadline?: {
    paragraphs?: string[]
    bullets?: string[]
  }
  illustration?: {
    src: string
    alt: string
    position: "left" | "right"
  }
  cta?: {
    label: string
    href: string
  }
  background?: "white" | "grey"
  noIllustration?: boolean
  className?: string
}

export default function BlockSection({
  headline,
  subHeadline,
  illustration,
  cta,
  background = "white",
  noIllustration = false,
  className = "",
}: BlockSectionProps) {
  const bgClass = background === "grey" ? "bg-[rgb(243,249,254)]" : "bg-white"

  return (
    <section className={`${bgClass} ${className}`}>
      <div className="!py-8 m:!py-14 max-w-[1440px] mx-auto px-6 xl:px-16">
        <div className="grid grid-cols-12 gap-0">
          {/* Headline - full width */}
          <div className="col-span-12">
            <h2 className="text-headline-s m:text-headline-m font-bold mb-4 m:mb-6 leading-tight">
              {headline}
            </h2>
          </div>

          {/* Content row */}
          {noIllustration ? (
            <div className="col-span-12">
              {subHeadline?.paragraphs?.map((p, i) => (
                <p key={i} className="text-m m:text-l mb-4">{p}</p>
              ))}
              {subHeadline?.bullets && (
                <ul className="[&_li]:list-image-checkmarks-teal [&_li+li]:mt-4 pl-4 text-m m:text-l mb-8 m:mb-14">
                  {subHeadline.bullets.map((b, i) => (
                    <li key={i}><p>{b}</p></li>
                  ))}
                </ul>
              )}
              {cta && (
                <div className="mt-6">
                  <Button variant="primary" theme="blue" size="l" href={cta.href}>
                    {cta.label}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className={`col-span-12 m:col-span-8 ${illustration?.position === "right" ? "m:order-1" : ""}`}>
                {subHeadline?.paragraphs?.map((p, i) => (
                  <p key={i} className="text-m m:text-l mb-4">{p}</p>
                ))}
                {subHeadline?.bullets && (
                  <ul className="[&_li]:list-image-checkmarks-teal [&_li+li]:mt-4 pl-4 text-m m:text-l mb-8 m:mb-14">
                    {subHeadline.bullets.map((b, i) => (
                      <li key={i}><p>{b}</p></li>
                    ))}
                  </ul>
                )}
                {cta && (
                  <div className="mt-6 mx-0 mb-8 l:mt-8 l:mb-14">
                    <Button variant="primary" theme="blue" size="l" href={cta.href}>
                      {cta.label}
                    </Button>
                  </div>
                )}
              </div>
              {illustration && (
                <div className={`col-span-12 m:col-span-4 mt-6 m:mt-0 ${illustration.position === "left" ? "m:order-2" : ""}`}>
                  <a href="#" tabIndex={-1} aria-hidden="true">
                    <img
                      src={illustration.src}
                      alt={illustration.alt}
                      className="w-full h-fit aspect-[3/2] object-cover"
                      loading="lazy"
                    />
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
