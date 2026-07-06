interface DKBLogoProps {
  className?: string
}

export default function DKBLogo({ className = "" }: DKBLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 32"
      fill="#148DEA"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DKB Startseite"
      role="img"
    >
      <text x="0" y="24" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="22" letterSpacing="0.5">
        DKB
      </text>
    </svg>
  )
}
