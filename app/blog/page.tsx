import { BlogList } from "@/components/blog/BlogList";
import BlogListLoading from "@/components/blog/BlogList.loading";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Blog | Laith Saado",
	description: "Thoughts on software development, tech, and more.",
};

// Force static generation
export const dynamic = "force-static";
export const revalidate = 900; // Revalidate every 15 minutes

export default async function BlogPage() {
	return (
		<div className="py-12 sm:py-16 lg:py-20">
			<header className="mb-12 sm:mb-16 lg:mb-20">
				<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
					Blog
				</h1>
				<p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
					Thoughts on software development, tech, and more.
				</p>
			</header>

			<div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
				<Suspense fallback={<BlogListLoading />}>
					<BlogList />
				</Suspense>
			</div>
		</div>
	);
}
