import { cookiesClient } from "@/utils/amplify-utils";
import Link from "next/link";

export async function BlogList() {
	const { data: posts } = await cookiesClient.models.Post.list({
		authMode: "identityPool",
	});

	return (
		<div className="flex max-w-3xl flex-col space-y-16">
			{posts.map((post) => {
				const formattedDate = post.publishDate
					? new Date(post.publishDate).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
					  })
					: null;

				return (
					<article
						key={post.id}
						className="bg-white rounded-lg border border-zinc-200 p-6 dark:bg-zinc-900 dark:border-zinc-700 md:grid md:grid-cols-4 md:items-baseline"
					>
						<div className="md:col-span-3 group relative flex flex-col items-start">
							<h2 className="text-2xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
								<Link href={`/blog/${post.slug}`}>
									<span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
									<span className="relative z-10">{post.title}</span>
								</Link>
							</h2>
							{formattedDate && (
								<time
									className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-500 dark:text-zinc-400"
									dateTime={post.publishDate || undefined}
								>
									{formattedDate}
								</time>
							)}
							<p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
								{post.excerpt}
							</p>
							<div
								aria-hidden="true"
								className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
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
						{formattedDate && (
							<time
								className="mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-500 dark:text-zinc-400"
								dateTime={post.publishDate || undefined}
							>
								{formattedDate}
							</time>
						)}
					</article>
				);
			})}
		</div>
	);
} 