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
  return (
    <div className="teaser group block mb-6 m:mb-0 border-0 border-none no-underline hover:border-b-0 hover:bg-transparent">
      <a href={href} className="link link--light teaser__link" aria-labelledby={id}>
        <div className="teaser__image-container relative block w-full overflow-hidden after:absolute after:top-full after:block after:h-[10%] after:w-[110%] after:origin-left-top after:bg-white after:content-[''] after:transition-transform after:duration-200 after:ease-out group-hover:after:rotate-[-2.39deg]">
          <img
            className="teaser__image block origin-center w-full h-full object-center aspect-[3/2] transition-transform duration-200 ease-out scale-[1.03] group-hover:scale-110 object-cover"
            src={image}
            alt={alt}
            loading="lazy"
          />
        </div>
        <span className="teaser__overline block text-[#0d0e0f] text-s font-bold l:text-m l:font-bold opacity-55 mb-1 l:mb-2 mt-4 l:mt-6">
          {overline}
        </span>
        <h3
          id={id}
          className="teaser__headline inline-block text-headline-xs l:text-headline-s underline underline-offset-8 decoration-1 mb-3 l:mb-4 hover:bg-[rgb(243,249,254)] hover:text-[rgb(9,118,214)] active:bg-[#b0b0b0] active:text-[#0d0e0f] transition-colors"
        >
          {headline}
        </h3>
      </a>
      <div className="text-[#0d0e0ff2] text-m l:text-l mb-4 l:mb-6">
        <p>{description}</p>
      </div>
    </div>
  )
}
