import Link from 'next/link'
import { cookiesClient } from "@/utils/amplify-utils";


export default async function Home() {
  const {data: posts} = await cookiesClient.models.Post.list({authMode: 'identityPool'});

  return (
    <div className="py-20">
      <header className="lg:flex lg:justify-between lg:items-center">
        <div className="max-w-2xl">
          <h1 className="mt-6 text-4xl font-bold tracking-tight gradient-text sm:text-5xl">
            Welcome to my blog
          </h1>
          <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="mt-6 flex gap-6">
            <Link
              href="https://twitter.com/yourusername"
              className="group -m-1 p-1"
              aria-label="Follow on Twitter"
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-6 w-6 fill-gray-500 transition group-hover:fill-gray-600 dark:fill-gray-400 dark:group-hover:fill-gray-300"
              >
                <path d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z" />
              </svg>
            </Link>
            {/* Add more social links here */}
          </div>
        </div>
        <div className="mt-12 lg:mt-0 lg:pl-20">
        </div>
      </header>

      <div className="mt-20 md:mt-32">
        <div className="md:border-l md:border-gray-100 md:pl-6 md:dark:border-gray-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {posts.map((post) => (
              <article key={post.slug} className="md:grid md:grid-cols-4 md:items-baseline">
                <div className="md:col-span-3 group relative flex flex-col items-start">
                  <h2 className="text-base font-semibold tracking-tight text-gray-800 dark:text-gray-100">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                      <span className="relative z-10">{post.title}</span>
                    </Link>
                  </h2>
                  <time
                    className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400 pl-3.5"
                    dateTime={post.createdAt}
                  >
                    <span
                      className="absolute inset-y-0 left-0 flex items-center"
                      aria-hidden="true"
                    >
                      <span className="h-4 w-0.5 rounded-full bg-gray-200 dark:bg-gray-500" />
                    </span>
                    {post.createdAt}
                  </time>
                  <p className="relative z-10 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {post.excerpt}
                  </p>
                  <div
                    aria-hidden="true"
                    className="relative z-10 mt-4 flex items-center text-sm font-medium text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Read article
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="ml-1 h-4 w-4 stroke-current"
                    >
                      <path
                        d="M6.75 5.75 9.25 8l-2.5 2.25"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <time
                  className="mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-gray-500 dark:text-gray-400"
                  dateTime={post.createdAt}
                >
                  {post.createdAt}
                </time>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
