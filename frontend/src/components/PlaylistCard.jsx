import { useNavigate } from "react-router-dom";

export const PlaylistCard = ({ playlist }) => {
	const navigate = useNavigate();
	const imageUrl = playlist.images?.[0]?.url || "/playlist.png";

	const handleCardClick = () => {
		navigate(`/dashboard/playlists/${playlist.id}`);
	};

	return (
		<div
			onClick={handleCardClick}
			className="flex flex-col gap-2 p-8 cursor-pointer sm:flex-row sm:items-center sm:gap-6 sm:py-4 hover:bg-gray-700"
		>
			<div className="flex gap-6 items-end">
				<img
					src={imageUrl}
					alt="Playlist cover"
					className="w-48 h-48 rounded shadow-lg object-cover bg-gray-800"
				/>
				<div>
					<p className="uppercase text-sm font-semibold text-gray-400">
						Public Playlist
					</p>
					<p className="text-sm font-semibold text-gray-400">{playlist.id}</p>
					<h1 className="text-5xl text-white font-bold mt-2">
						{playlist.name}
					</h1>
					<p className="text-gray-300 mt-2">
						{playlist.owner?.display_name} • {playlist.tracks?.total || 0} songs
					</p>
				</div>
			</div>
		</div>
	);
};
