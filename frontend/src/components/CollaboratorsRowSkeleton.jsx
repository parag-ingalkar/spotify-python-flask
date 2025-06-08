export const CollaboratorsRowSkeleton = () => {
	return (
		<div className="flex h-15 animate-pulse items-center text-white border-b border-gray-700">
			<div className="w-10 flex-none flex items-center justify-left p-2">
				<div className="w-4 h-4 bg-gray-700 rounded" />
			</div>

			<div className="flex-auto flex items-center justify-left">
				<div className="w-7 h-7 rounded-full bg-gray-700" />
				<div className="w-24 h-3 bg-gray-600 rounded ml-2" />
			</div>

			<div className="w-42 flex-none flex items-center justify-center text-center">
				<div className="w-4 h-4 bg-gray-700 rounded" />
			</div>

			<div className="w-16 flex items-center justify-center p-2">
				<div className="w-2 h-4 bg-gray-700 rounded" />
			</div>
		</div>
	);
};
