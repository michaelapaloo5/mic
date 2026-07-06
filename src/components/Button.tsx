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
  disabled?: boolean
}

const sizeStyles: Record<ButtonSize, string> = {
  s: "text-[13px] leading-[1.125rem] px-4 py-2 font-[500]",
  m: "text-[17px] leading-[1.4] px-[18px] py-[13px] font-[500]",
  l: "text-[20px] leading-[1.2] px-5 py-4 font-[500]",
}

const variantStyles: Record<ButtonVariant, Record<ButtonTheme, string>> = {
  primary: {
    blue:
      "bg-[rgb(9,118,214)] text-white hover:bg-[rgb(19,78,138)] disabled:bg-[rgba(33,51,65,0.2)] disabled:text-white",
    light: "bg-white text-[rgb(0,106,199)] hover:bg-gray-50",
  },
  secondary: {
    blue:
      "bg-[rgba(0,144,255,0.09)] text-[rgb(0,106,199)] hover:bg-[rgba(0,144,255,0.18)] hover:text-[rgb(19,78,138)]",
    light:
      "bg-white/10 text-white hover:bg-white/20",
  },
  tertiary: {
    blue: "text-[rgb(0,106,199)] hover:bg-[rgba(0,144,255,0.09)]",
    light: "text-white hover:bg-white/10",
  },
  subtle: {
    blue: "text-[rgba(15,47,71,0.66)] hover:text-[rgb(19,78,138)]",
    light: "text-white/80 hover:text-white",
  },
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
  disabled = false,
}: ButtonProps) {
  const shadowClass =
    variant === "primary" ? "mb-0.5 [box-shadow:inset_0_-4px_0_#2ad1c9]" : ""

  const borderClass = "border border-transparent"

  const classes = `inline-flex items-center justify-center gap-2 rounded-[6px] cursor-pointer no-underline min-h-[2.5rem] transition-colors duration-300 ${borderClass} ${sizeStyles[size]} ${variantStyles[variant][theme]} ${shadowClass} ${className}`

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
