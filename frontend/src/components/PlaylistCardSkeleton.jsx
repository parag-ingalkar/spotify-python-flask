export const PlaylistCardSkeleton = () => (
	<div className="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4">
		<div className="flex gap-6 items-end">
			{/* Image skeleton */}
			<div className="w-46 h-46 rounded shadow-lg bg-gray-700 animate-pulse"></div>

			{/* Text skeleton */}
			<div className="flex flex-col gap-2">
				{/* Public/Private text */}
				<div className="h-3.5 w-32 bg-gray-700 rounded animate-pulse"></div>

				{/* Playlist name */}
				<div className="h-12 w-64 bg-gray-700 rounded animate-pulse mt-2"></div>

				{/* Owner and song count */}
				<div className="h-4 w-48 bg-gray-700 rounded animate-pulse mt-2"></div>
			</div>
		</div>
	</div>
);
