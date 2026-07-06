import { type ReactNode } from "react"

type ButtonVariant = "primary" | "secondary" | "tertiary" | "subtle"
type ButtonTheme = "blue" | "light"
type ButtonSize = "s" | "m" | "l"

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  theme?: ButtonTheme
  size?: ButtonSize
  href?: string
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
}

const variantStyles: Record<ButtonVariant, Record<ButtonTheme, string>> = {
  primary: {
    blue: "bg-[rgb(9,118,214)] text-white shadow-[inset_0px_-4px_0px_#2ad1c9] hover:bg-[rgb(19,78,138)] active:brightness-90",
    light: "bg-white text-[#006ac7] hover:bg-gray-50 active:bg-gray-100",
  },
  secondary: {
    blue: "border border-[rgb(9,118,214)] text-[rgb(9,118,214)] hover:bg-[rgb(19,78,138)] hover:text-white active:brightness-90",
    light: "border border-white text-white hover:bg-white hover:text-[rgb(9,118,214)] active:bg-gray-100",
  },
  tertiary: {
    blue: "text-[#006ac7] hover:bg-[rgba(0,144,255,0.09)] active:bg-[rgba(0,144,255,0.18)]",
    light: "text-white hover:bg-white/10 active:bg-white/20",
  },
  subtle: {
    blue: "text-[rgba(15,47,71,0.66)] hover:text-[rgb(19,78,138)]",
    light: "text-white/80 hover:text-white",
  },
}

const sizeStyles: Record<ButtonSize, string> = {
  s: "px-4 py-2 text-[13px]",
  m: "px-[18px] py-[13px] text-[17px]",
  l: "px-5 py-4 text-[20px]",
}

export default function Button({
  children,
  variant = "primary",
  theme = "blue",
  size = "m",
  href,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-[6px] font-[500] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(9,118,214,0.76)] cursor-pointer no-underline border border-transparent min-h-[2.5rem]"

  const classes = `${baseStyles} ${variantStyles[variant][theme]} ${sizeStyles[size]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
