interface DKBLogoProps {
  className?: string
}

export default function DKBLogo({ className = "" }: DKBLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 434 246"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DKB Startseite"
      role="img"
    >
      <title>DKB: Das kann Bank</title>
      <g fill="currentColor">
        <path d="M70.5 96h30.8v10.4H83.6v12.6h15.4v10.4H83.6v14.2h18.8v10.4H70.5V96z" />
        <path d="M103.2 96h12.4l14.8 29.6 14.8-29.6h12.4v58h-11.2v-36.6l-13.4 26.8h-5.2l-13.4-26.8v36.6h-11.2V96z" />
        <path d="M145.4 96h11.2v47.6h-11.2V96z" />
        <path d="M169.2 96h21.8c14.6 0 23.8 8.2 23.8 23.8 0 15.6-9.2 23.8-23.8 23.8h-21.8V96zm11.2 10.4v26.8h9.8c9 0 13.4-5 13.4-13.4 0-8.4-4.4-13.4-13.4-13.4h-9.8z" />
        <path d="M228.2 96h12.2l19.4 29V96h11.2v58h-11.2l-19.4-29v29h-12.2V96z" />
        <path d="M286.4 96h11.2v47.6h-11.2V96z" />
        <path d="M299.4 96h20.8c14.8 0 24.2 7.8 24.2 22.6 0 10.2-5.2 17.4-13.6 20.6l17.2 14.4h-14.4l-14.8-12.6h-8.2v12.6h-11.2V96zm11.2 10.4v16.4h9c5.8 0 12.8-2.2 12.8-8.4 0-6-5-8-11.6-8h-10.2z" />
      </g>
      <g fill="currentColor" opacity="0.6" fontSize="20" fontFamily="sans-serif" fontWeight="400">
        <text x="0" y="226" letterSpacing="2">Das kann Bank</text>
      </g>
    </svg>
  )
}
