'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import clsx from 'clsx'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Articles', href: '/articles' },
  { name: 'Projects', href: '/projects' },
  { name: 'Speaking', href: '/speaking' },
  { name: 'Uses', href: '/uses' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-8">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'relative -my-2 -mx-3 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-0 dark:text-gray-400 dark:hover:text-gray-100',
              pathname === item.href &&
                'text-gray-900 dark:text-gray-100'
            )}
          >
            <span className="relative z-10">{item.name}</span>
            {pathname === item.href && (
              <span
                className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-gray-800"
                aria-hidden="true"
              />
            )}
          </Link>
        ))}
      </div>
      <ThemeToggle />
    </nav>
  )
} 