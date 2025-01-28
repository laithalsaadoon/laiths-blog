import type { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

Amplify.configure(outputs);

const client = generateClient<Schema>({});

// Force static generation
export const dynamic = "force-static";
export const revalidate = 900;

async function getPost(slug: string) {
	try {
		const { data: post } = await client.models.Post.listPostBySlug(
			{ slug: slug },
			{
				authMode: "identityPool",
			},
		);
		if (!post) return null;
		return post;
	} catch (error) {
		console.error("Error fetching post:", error);
		return null;
	}
}

async function getAllPosts() {
	try {
		const { data: posts } = await client.models.Post.list({
			authMode: "identityPool",
		});
		return posts;
	} catch (error) {
		console.error("Error fetching posts:", error);
		return [];
	}
}

export async function generateMetadata({
	params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
	const paramAwaited = await Promise.resolve(params);
	const post = await getPost(paramAwaited.slug);
	const postData = post?.[0];

	if (!postData) {
		return {
			title: "Post Not Found",
			description: "The requested blog post could not be found.",
		};
	}

	const metadata: Metadata = {
		title: `${postData?.title} | Your Name`,
		description: postData?.excerpt || undefined,
		openGraph: {
			title: postData?.title || "Untitled Post",
			description: postData?.excerpt || undefined,
			type: "article",
			publishedTime: postData?.publishDate || undefined,
		},
	};

	return metadata;
}

export async function generateStaticParams() {
	const allPosts = await getAllPosts();
	return allPosts.map((post) => ({
		slug: post.slug,
	}));
}

export default async function BlogPost({
	params,
}: { params: Promise<{ slug: string }> }) {
	const slug = (await params).slug;
	const post = await getPost(slug);
	const postData = post?.[0];

	if (!postData) {
		notFound();
	}

	const formattedDate = postData?.publishDate
		? new Date(postData.publishDate).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			})
		: null;

	return (
		<article className="py-12 sm:py-16 lg:py-20 @container">
			<div className="mx-auto max-w-3xl">
				<Link
					href="/"
					className="group mb-8 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-md shadow-gray-800/5 ring-1 ring-gray-900/5 transition dark:border dark:border-gray-700/50 dark:bg-gray-800 dark:ring-0 dark:ring-white/10 dark:hover:border-gray-700 dark:hover:ring-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
				>
					<svg
						viewBox="0 0 16 16"
						fill="none"
						aria-hidden="true"
						className="h-4 w-4 stroke-gray-500 transition group-hover:stroke-gray-700 dark:stroke-gray-500 dark:group-hover:stroke-gray-400"
					>
						<path
							d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Link>

				<header className="relative mb-8 sm:mb-10 xl:mb-16">
					<div className="flex flex-col">
						{formattedDate && (
							<time
								dateTime={postData.publishDate || undefined}
								className="mb-4 sm:mb-6 block text-sm text-gray-600 dark:text-gray-400"
							>
								{formattedDate}
							</time>
						)}
						<h1 className="gradient-text mt-2 text-[calc(1.75rem+1.5vw)]/tight sm:text-[calc(2rem+1.5vw)]/tight font-bold tracking-tight">
							{postData?.title || "Untitled Post"}
						</h1>
						{postData?.excerpt && (
							<p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400">
								{postData.excerpt}
							</p>
						)}
					</div>
				</header>

				<div
					className="prose prose-base @lg:prose-lg prose-gray mx-auto dark:prose-invert 
					prose-headings:font-semibold 
						prose-a:text-primary hover:prose-a:text-primary/80 
						prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800
					prose-img:rounded-2xl prose-img:shadow-lg
						prose-hr:border-gray-200 dark:prose-hr:border-gray-800
					prose-blockquote:border-l-primary/30
						prose-strong:text-gray-900 dark:prose-strong:text-gray-100
						prose-code:text-primary dark:prose-code:text-primary/90
						prose-code:before:content-none prose-code:after:content-none
				"
				>
					{(postData?.content || "")
						.split("\n")
						.map((paragraph: string, i: number) => (
							<p key={`${slug}-${i}-${paragraph.substring(0, 20)}`}>
								{paragraph.trim()}
							</p>
						))}
				</div>

				<div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800">
					<Link
						href="/"
						className="text-primary hover:text-primary/80 inline-flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full px-4 py-2 -ml-4"
					>
						<svg
							viewBox="0 0 16 16"
							fill="none"
							aria-hidden="true"
							className="h-4 w-4 stroke-current transition-transform group-hover:-translate-x-1"
						>
							<path
								d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Back to blog
					</Link>
				</div>
			</div>
		</article>
	);
}
