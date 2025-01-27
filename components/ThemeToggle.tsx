'use client'

import { useTheme } from './ThemeProvider'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      type="button"
      className="group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-gray-800/5 ring-1 ring-gray-900/5 backdrop-blur transition dark:bg-gray-800/90 dark:ring-white/10 dark:hover:ring-white/20"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="h-6 w-6 fill-gray-100 stroke-gray-500 transition group-hover:stroke-gray-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-gray-50 [@media(prefers-color-scheme:dark)]:stroke-gray-500 [@media(prefers-color-scheme:dark)]:group-hover:stroke-gray-400" />
      <MoonIcon className="hidden h-6 w-6 fill-gray-700 stroke-gray-500 transition dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-gray-400" />
    </button>
  )
}

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z" />
      <path
        d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061"
        fill="none"
      />
    </svg>
  )
}

function MoonIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
} 