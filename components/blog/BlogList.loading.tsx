export default function BlogListLoading() {
	const skeletonItems = ['first', 'second', 'third'];

	return (
		<div className="flex max-w-3xl flex-col space-y-16 animate-pulse">
			{skeletonItems.map((item) => (
				<div
					key={`blog-list-skeleton-${item}`}
					className="bg-white rounded-lg border border-zinc-200 p-6 dark:bg-zinc-900 dark:border-zinc-700 md:grid md:grid-cols-4 md:items-baseline"
				>
					<div className="md:col-span-3 group relative flex flex-col items-start">
						<div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
						<div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-3" />
						<div className="space-y-2">
							<div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
							<div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
							<div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-800 rounded" />
						</div>
					</div>
					<div className="mt-1 hidden md:block h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
				</div>
			))}
		</div>
	);
} 