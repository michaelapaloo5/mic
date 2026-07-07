export interface DemoUser {
  email: string
  password: string
  name: string
  iban: string
  balance: number
}

const DEMO_USERS: DemoUser[] = [
  {
    email: "Günther1962",
    password: "Falk1962Günter",
    name: "Günther Falkenberg",
    iban: "DE12 1001 0101 2345 6789 01",
    balance: 4527.83,
  },
]

function findUser(email: string, password: string): DemoUser | null {
  return DEMO_USERS.find((u) => u.email === email && u.password === password) ?? null
}

export function demoSignIn(email: string, password: string) {
  const user = findUser(email, password)
  if (!user) {
    return { error: { message: "Invalid login credentials" } }
  }
  const session = { user: { email: user.email, user_metadata: { name: user.name } }, iban: user.iban, balance: user.balance }
  if (typeof window !== "undefined") {
    localStorage.setItem("dkb_demo_session", JSON.stringify(session))
  }
  return { data: { user: session.user }, error: null }
}

export function demoSignOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("dkb_demo_session")
  }
}

export function demoGetUser(): { data: { user: { email: string; user_metadata: { name: string } } | null } } {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("dkb_demo_session")
    if (raw) {
      const session = JSON.parse(raw)
      return { data: { user: session.user } }
    }
  }
  return { data: { user: null } }
}

export function demoGetAccountInfo(): { iban: string; balance: number } | null {
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem("dkb_demo_session")
    if (raw) {
      const session = JSON.parse(raw)
      return { iban: session.iban, balance: session.balance }
    }
  }
  return null
}

export { DEMO_USERS }
