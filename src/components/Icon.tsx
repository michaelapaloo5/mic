import type { ReactElement } from "react"

type IconName =
  | "chevron-down"
  | "chevron-up"
  | "menu"
  | "x"
  | "checkmark"
  | "arrow-right"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "lock"
  | "star"
  | "phone"
  | "chart"
  | "house"
  | "card"
  | "shield"
  | "percent"
  | "xing"

interface IconProps {
  name: IconName
  className?: string
  size?: number
}

const paths: Record<IconName, ReactElement> = {
  "chevron-down": (
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "chevron-up": (
    <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "menu": (
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "x": (
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "checkmark": (
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "arrow-right": (
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "linkedin": (
    <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" /></>
  ),
  "instagram": (
    <><path d="M12 16a4 4 0 100-8 4 4 0 000 8z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M3 16V8a5 5 0 015-5h8a5 5 0 015 5v8a5 5 0 01-5 5H8a5 5 0 01-5-5z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M17.5 6.5h.01" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></>
  ),
  "youtube": (
    <><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z" fill="currentColor" /><path d="M9.75 15.02V8.98l5.5 3.02-5.5 3.02z" fill="#fff" /></>
  ),
  "tiktok": (
    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 11-5-5v2a3 3 0 103 3V0z" fill="currentColor" />
  ),
  "lock": (
    <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M7 11V7a5 5 0 0110 0v4" fill="none" stroke="currentColor" strokeWidth="2" /></>
  ),
  "star": (
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2" />
  ),
  "phone": (
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" fill="none" stroke="currentColor" strokeWidth="2" />
  ),
  "chart": (
    <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "house": (
    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "card": (
    <><rect x="1" y="4" width="22" height="16" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="2" /><line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2" /></>
  ),
  "shield": (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="currentColor" strokeWidth="2" />
  ),
  "percent": (
    <><line x1="19" y1="5" x2="5" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><circle cx="6.5" cy="6.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="17.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" /></>
  ),
  "xing": (
    <path d="M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.64l4.92 9.04c.19.342.512.66 1.034.66h3.457c.22 0 .342-.128.342-.347 0-.116-.058-.245-.185-.396l-4.854-8.854a.456.456 0 010-.058L20.89 1.06c.12-.165.185-.268.185-.35 0-.189-.126-.35-.425-.35l-3.458-.34zM6.08 4.495c-.18 0-.31.13-.31.317 0 .108.08.238.166.36l2.064 3.628a.149.149 0 010 .058L4.96 13.96c-.113.163-.166.3-.166.404 0 .19.137.317.383.317h3.477c.504 0 .746-.33.963-.66l3.575-6.42-2.086-3.708c-.194-.38-.456-.66-.984-.66H6.08z" fill="currentColor" />
  ),
}

export default function Icon({ name, className = "", size = 24 }: IconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
