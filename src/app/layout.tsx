import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Das kann Bank",
  description:
    "Dein Girokonto, Tagesgeld & Depot bei der DKB – einer der größten Direktbanken Deutschlands! Alles digital, alles in einer App.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
