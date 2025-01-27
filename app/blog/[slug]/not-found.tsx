import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-16">
      <h2 className="text-2xl font-bold mb-4 gradient-text">Post Not Found</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Sorry, the blog post you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-gray-800/10 hover:bg-gray-800/20 dark:bg-gray-50/10 dark:hover:bg-gray-50/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 mr-2"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
            clipRule="evenodd"
          />
        </svg>
        Back to home
      </Link>
    </div>
  )
} 
