import Button from "./Button"

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
  const sectionClass =
    background === "grey"
      ? "block-section scroll-mt-medium l:scroll-mt-large block-section--white block-section--illustration"
      : "block-section scroll-mt-medium l:scroll-mt-large block-section--white block-section--illustration"

  const variantClass = illustration
    ? illustration.position === "right"
      ? "block-section--illustration-right"
      : "block-section--illustration-left"
    : noIllustration
      ? "block-section--no-illustration block-section--banner-right"
      : ""

  return (
    <section className={`${sectionClass} ${variantClass} ${background === "grey" ? "bg-[rgb(243,249,254)]" : "bg-white"} ${className}`}>
      <div className="!py-8 m:!py-14 block-section__container tw-grid mx-auto px-6 m:px-[30px] max-w-[1350px] grid grid-cols-12">
        <h2 className="block-section__headline col-span-12 text-[32px] font-[600] leading-[1.31] mb-4 l:text-[48px] l:leading-[1.25] l:mb-6">
          {headline}
        </h2>

        {noIllustration ? (
          <div className="block-section__left-col col-span-12">
            {subHeadline?.paragraphs?.map((p, i) => (
              <p key={i} className="block-section__sub-headline text-[17px] l:text-[20px] mb-4">
                {p}
              </p>
            ))}
            {subHeadline?.bullets && (
              <div className="block-section__sub-headline text-[17px] l:text-[20px] [&_ul]:pl-[25px] [&_ul_li+li]:mt-[1em] [&_ul]:list-image-checkmarks-teal">
                <ul>
                  {subHeadline.bullets.map((b, i) => (
                    <li key={i}>
                      <p>{b}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="block-section__content mt-6 l:mt-8" />
            {cta && (
              <div className="mt-6 mx-0 mb-8 l:mt-8 l:mb-14 block-section__cta">
                <div className="action-bar mt-8 flex flex-col m:flex-row flex-wrap items-start m:items-center gap-6 m:gap-2">
                  <Button
                    variant="secondary"
                    theme="blue"
                    size="m"
                    href={cta.href}
                    className="w-full shrink-0 m:w-auto"
                  >
                    {cta.label}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="m:col-span-8 block-section__left-col col-span-12">
              <div className="block-section__sub-headline text-[17px] l:text-[20px] [&_ul]:pl-[25px] [&_ul_li+li]:mt-[1em] [&_ul]:list-image-checkmarks-teal">
                {subHeadline?.paragraphs?.map((p, i) => (
                  <p key={i} className="mb-4">{p}</p>
                ))}
                {subHeadline?.bullets && (
                  <ul>
                    {subHeadline.bullets.map((b, i) => (
                      <li key={i}>
                        <p>{b}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="block-section__content mt-6 l:mt-8" />
              {cta && (
                <div className="mt-6 mx-0 mb-8 l:mt-8 l:mb-14 block-section__cta">
                  <div className="action-bar mt-8 flex flex-col m:flex-row flex-wrap items-start m:items-center gap-6 m:gap-2">
                    <Button
                      variant="secondary"
                      theme="blue"
                      size="m"
                      href={cta.href}
                      className="w-full shrink-0 m:w-auto"
                    >
                      {cta.label}
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {illustration && (
              <a
                href={cta?.href || "#"}
                className="link block-section__right-col col-span-12 flex justify-center mt-6 m:mt-0 m:col-span-4 !border-0 hover:bg-transparent"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={illustration.src}
                  alt={illustration.alt}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </a>
            )}
          </>
        )}
      </div>
    </section>
  )
}
