import Link from "next/link";
import { LatestPosts } from "@/components/blog/LatestPosts";
import LatestPostsLoading from "@/components/blog/LatestPosts.loading";
import { Suspense } from "react";

export default async function Home() {
	return (
		<div className="py-16 sm:py-20 lg:py-24 custom-scrollbar">
			<header className="relative isolate @container">
				{/* Background gradient blur */}
				<div className="absolute inset-x-0 -top-16 -z-10 h-[500px] bg-gradient-to-b from-primary/5 via-primary/10 to-transparent transform-gpu overflow-hidden" />

				<div className="lg:flex lg:justify-between lg:gap-16">
					<div className="max-w-2xl">
						<h1 className="text-[calc(2rem+2vw)]/tight lg:text-[calc(2.5rem+2vw)]/tight font-bold tracking-tight gradient-text">
							Thoughts on Software, Design & Technology
						</h1>
						<p className="mt-6 sm:mt-8 text-base sm:text-lg/relaxed text-gray-600 dark:text-gray-400">
							Welcome to my corner of the internet. I write about software
							development, design patterns, and my journey building products
							that make a difference.
						</p>
						<div className="mt-6 sm:mt-8 flex gap-4 sm:gap-6">
							<Link
								href="https://twitter.com/yourusername"
								className="group transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:outline-none"
								aria-label="Follow on Twitter"
							>
								<svg
									viewBox="0 0 24 24"
									aria-hidden="true"
									className="h-5 w-5 sm:h-6 sm:w-6 fill-gray-500 transition group-hover:fill-primary dark:fill-gray-400"
								>
									<path d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z" />
								</svg>
							</Link>
							<Link
								href="https://github.com/yourusername"
								className="group transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:outline-none"
								aria-label="Follow on GitHub"
							>
								<svg
									viewBox="0 0 24 24"
									aria-hidden="true"
									className="h-5 w-5 sm:h-6 sm:w-6 fill-gray-500 transition group-hover:fill-primary dark:fill-gray-400"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									/>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</header>

			<div className="mt-20 sm:mt-24 lg:mt-32">
				<h2 className="text-xl sm:text-2xl font-semibold mb-8 sm:mb-12">
					Latest Posts
				</h2>
				<Suspense fallback={<LatestPostsLoading />}>
					<LatestPosts />
				</Suspense>
			</div>
		</div>
	);
}
