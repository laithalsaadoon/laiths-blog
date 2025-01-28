export default function SpeakingPage() {
	return (
		<div className="prose prose-gray dark:prose-invert">
			<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
				Speaking
			</h1>
			<div className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
				<p>
					This is where you can showcase your speaking engagements, conference
					talks, workshops, and other presentations.
				</p>
				<div className="mt-8">
					<div className="bg-white rounded-lg border border-zinc-200 p-6 dark:bg-zinc-900 dark:border-zinc-700">
						<h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
							Example Talk
						</h2>
						<p className="mt-2 text-zinc-600 dark:text-zinc-400">
							Conference Name • Date
						</p>
						<p className="mt-2">
							A brief description of your talk, including the main topics
							covered and key takeaways for the audience.
						</p>
						<div className="mt-4">
							<a
								href="/speaking/example-talk-slides"
								className="text-sm font-medium text-teal-500 hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
							>
								View Slides →
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
