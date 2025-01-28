import { cookiesClient } from "@/utils/amplify-utils";
import Link from "next/link";

export async function LatestPosts() {
	const { data: posts } = await cookiesClient.models.Post.list({
		authMode: "identityPool",
	});

	return (
		<div className="@container">
			<div className="grid gap-8 sm:gap-12 @sm:grid-cols-2 @lg:grid-cols-3">
				{posts.map((post) => (
					<article key={post.slug} className="group relative flex flex-col">
						<div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 dark:bg-gray-800 mb-4 sm:mb-6 overflow-hidden">
							{/* Add featured image support later */}
							<div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5" />
						</div>
						<time
							className="text-sm text-gray-500 dark:text-gray-400 mb-2"
							dateTime={post.createdAt}
						>
							{new Date(post.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</time>
						<h3 className="text-lg @md:text-xl font-semibold tracking-tight text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors">
							<Link
								href={`/blog/${post.slug}`}
								className="hover:text-primary focus-visible:text-primary focus-visible:outline-none"
							>
								<span className="absolute inset-0" />
								{post.title}
							</Link>
						</h3>
						<p className="mt-3 @md:mt-4 text-base text-gray-600 dark:text-gray-400 line-clamp-3">
							{post.excerpt}
						</p>
						<div className="mt-4 @md:mt-6 flex items-center text-sm font-medium text-primary">
							Read article
							<svg
								viewBox="0 0 16 16"
								fill="none"
								aria-hidden="true"
								className="ml-1 h-4 w-4 stroke-current transition-transform group-hover:translate-x-1"
							>
								<path
									d="M6.75 5.75 9.25 8l-2.5 2.25"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					</article>
				))}
			</div>
		</div>
	);
} 