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
    blue: "bg-dkb-blue-dark text-white hover:brightness-110 active:brightness-90",
    light: "bg-white text-dkb-blue-dark hover:bg-gray-50 active:bg-gray-100",
  },
  secondary: {
    blue: "border-2 border-dkb-blue-dark text-dkb-blue-dark hover:bg-dkb-blue-dark hover:text-white active:bg-dkb-blue-dark",
    light: "border-2 border-white text-white hover:bg-white hover:text-dkb-blue-dark active:bg-gray-100",
  },
  tertiary: {
    blue: "text-dkb-blue-dark hover:bg-blue-50 active:bg-blue-100",
    light: "text-white hover:bg-white/10 active:bg-white/20",
  },
  subtle: {
    blue: "text-dkb-text hover:text-dkb-blue-dark",
    light: "text-white/80 hover:text-white",
  },
}

const sizeStyles: Record<ButtonSize, string> = {
  s: "px-4 py-2 text-sm",
  m: "px-6 py-3 text-base",
  l: "px-8 py-4 text-lg",
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
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dkb-blue-dark cursor-pointer no-underline"

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
