export const SongsRowSkeleton = () => {
	return (
		<div className="flex h-18 animate-pulse items-center text-white border-b border-gray-700">
			<div className="w-10 flex items-center justify-left p-2">
				<div className="w-4 h-4 bg-gray-700 rounded" />
			</div>

			<div className="flex-1 flex items-center gap-4 p-2">
				<div className="w-10 h-10 bg-gray-700 rounded" />
				<div className="space-y-2">
					<div className="w-36 h-4 bg-gray-700 rounded" />
					<div className="w-24 h-3 bg-gray-600 rounded" />
				</div>
			</div>

			<div className="w-48 flex items-center justify-left p-2">
				<div className="w-28 h-4 bg-gray-700 rounded" />
			</div>

			<div className="w-48 flex items-center justify-left p-2">
				<div className="w-7 h-7 bg-gray-700 rounded-full" />
				<div className="w-24 h-4 bg-gray-700 rounded ml-2" />
			</div>

			<div className="w-32 flex items-center justify-left p-2">
				<div className="w-16 h-4 bg-gray-700 rounded" />
			</div>

			<div className="w-16 flex items-center justify-center p-2">
				<div className="w-8 h-4 bg-gray-700 rounded" />
			</div>

			<div className="w-16 flex items-center justify-center p-2">
				<div className="w-2 h-4 bg-gray-700 rounded" />
			</div>
		</div>
	);
};
