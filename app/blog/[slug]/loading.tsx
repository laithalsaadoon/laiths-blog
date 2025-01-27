export default function Loading() {
	return (
		<div className="py-16 lg:py-20 animate-pulse">
			<header className="mb-16 lg:mb-20 lg:text-center">
				<div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6 mx-auto" />
				<div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mx-auto" />
			</header>
			<div className="max-w-3xl mx-auto space-y-6">
				<div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
				<div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
				<div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded" />
				<div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
				<div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
				<div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
				<div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
				<div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded" />
			</div>
		</div>
	);
}
