export default function AboutPage() {
	return (
		<div className="prose prose-gray dark:prose-invert">
			<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
				About Me
			</h1>
			<div className="mt-6 text-base text-zinc-600 dark:text-zinc-400 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
				<p>
					Hello! This is a placeholder for the About page. Here you can share
					your story, background, interests, and what drives you.
				</p>
				<p className="mt-4">
					Consider including:
				</p>
				<ul className="mt-2">
					<li>Your professional background</li>
					<li>What you're passionate about</li>
					<li>Your technical expertise</li>
					<li>Personal interests and hobbies</li>
				</ul>
			</div>
		</div>
	);
}
