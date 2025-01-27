import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import ThemeProvider from '../components/ThemeProvider'
import { Navigation } from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Your Name - Software Designer & Developer',
  description: 'Personal blog and portfolio showcasing software design, development, and thoughts on technology.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <header className="py-10">
                <Navigation />
              </header>
              <main>{children}</main>
              <footer className="mt-32 flex-none py-16">
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    &copy; {new Date().getFullYear()} Your Name. All rights
                    reserved.
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
