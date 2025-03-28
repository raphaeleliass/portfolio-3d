import type { Metadata } from "next"
import { Cinzel } from "next/font/google"
import "./globals.css"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  fallback: ["system-ui"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "3D Portfolio",
  description: "Conheça o portfólio de um desenvolvedor 3D",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${cinzel.variable} antialiased`}>{children}</body>
    </html>
  )
}
