export default function ProjectsPage() {
	return (
		<div className="prose prose-gray dark:prose-invert">
			<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
				Projects
			</h1>
			<div className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
				<p>
					Welcome to my projects page! This is where you can showcase your work,
					side projects, and contributions to the tech community.
				</p>
				<div className="mt-8">
					<div className="bg-white rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
						<h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
							Example Project
						</h2>
						<p className="mt-2">
							A brief description of your project, its impact, and the
							technologies used. You can replace this with your actual projects.
						</p>
						<div className="mt-4 flex gap-2">
							<span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
								React
							</span>
							<span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-100">
								TypeScript
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
