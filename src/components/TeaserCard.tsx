interface TeaserCardProps {
  image: string
  alt: string
  overline: string
  headline: string
  description: string
  href: string
  id?: string
}

export default function TeaserCard({
  image,
  alt,
  overline,
  headline,
  description,
  href,
  id,
}: TeaserCardProps) {
  const teaserId = id || `teaser-${headline.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <div className="teaser group block mb-6 border-0 border-none no-underline hover:border-b-0 hover:bg-transparent hover:no-underline active:border-0 active:border-none active:bg-transparent active:no-underline focus:border-0 focus:border-none focus:bg-transparent focus:no-underline m:mb-0">
      <a
        href={href}
        className="link link--light teaser__link block no-underline border-0"
        tabIndex={0}
        aria-labelledby={teaserId}
      >
        <div className="teaser__image-container relative block w-full overflow-hidden after:absolute after:top-full after:block after:h-[10%] after:w-[110%] after:origin-left-top after:bg-white after:content-[''] after:transition-transform after:duration-200 after:ease-out group-hover:after:rotate-[-2.39deg]">
          <img
            className="teaser__image block origin-center w-full h-full object-center aspect-[3/2] transition-transform duration-200 ease-out scale-[1.03] group-hover:scale-110 object-cover"
            src={image}
            alt={alt}
            loading="lazy"
          />
        </div>
        <span className="teaser__overline block text-[rgba(13,14,15,0.95)] text-[13px] font-bold l:text-[17px] l:font-bold opacity-55 mb-1 l:mb-2 mt-4 l:mt-6">
          {overline}
        </span>
        <h3
          id={teaserId}
          className="teaser__headline inline-block text-[22px] l:text-[28px] underline underline-offset-8 decoration-1 mb-3 l:mb-4 hover:bg-[rgb(243,249,254)] hover:text-[rgb(19,78,138)] active:bg-[rgba(33,51,65,0.2)] transition-colors"
        >
          {headline}
        </h3>
      </a>
      <div className="text-[rgba(9,17,24,0.84)] text-[17px] l:text-[20px] mb-4 l:mb-6">
        <p>{description}</p>
      </div>
    </div>
  )
}
