interface TeaserCardProps {
  image: string
  alt: string
  overline: string
  headline: string
  description: string
  href: string
}

export default function TeaserCard({
  image,
  alt,
  overline,
  headline,
  description,
  href,
}: TeaserCardProps) {
  return (
    <a
      href={href}
      className="teaser group block"
    >
      <div className="relative overflow-hidden rounded-xl bg-dkb-grey">
        <div className="aspect-3/2 overflow-hidden">
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-dkb-text opacity-55">
          {overline}
        </p>
        <h3 className="mt-1 text-headline-xs m:text-headline-s font-bold leading-snug group-hover:underline decoration-1 underline-offset-4 transition-all">
          {headline}
        </h3>
        <p className="mt-2 text-s m:text-m text-dkb-text opacity-80 leading-relaxed">
          {description}
        </p>
      </div>
    </a>
  )
}
