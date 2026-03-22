import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Link from "next/link"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Todo App",
  description: "Manage your chores and tasks",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-950">
        <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4">
          <div className="max-w-2xl mx-auto flex gap-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              My Lists
            </Link>
            <Link href="/Chores" className="text-gray-400 hover:text-white transition-colors">
              Chores
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}