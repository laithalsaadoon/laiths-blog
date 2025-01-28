export default function LatestPostsLoading() {
	const skeletonItems = ['first', 'second', 'third'];

	return (
		<div className="@container animate-pulse">
			<div className="grid gap-8 sm:gap-12 @sm:grid-cols-2 @lg:grid-cols-3">
				{skeletonItems.map((item) => (
					<div key={`latest-posts-skeleton-${item}`} className="group relative flex flex-col">
						<div className="aspect-[16/9] w-full rounded-2xl bg-gray-200 dark:bg-gray-800 mb-4 sm:mb-6" />
						<div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
						<div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded mb-3" />
						<div className="space-y-2">
							<div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
							<div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
							<div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-800 rounded" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
} 