import useFetch from "./hooks/useFetch";
import { PlaylistCard } from "./PlaylistCard";

export const Playlists = () => {
	const {
		data: playlists,
		isPending: playlistsIsPending,
		error: playlistsError,
	} = useFetch("http://127.0.0.1:5000/api/playlists");

	return (
		<div className="py-8 px-4 md:px-8">
			<h2 className="text-2xl font-semibold text-white mb-6">Your Playlists</h2>

			{playlistsError && (
				<div className="text-red-500 font-medium">{playlistsError}</div>
			)}

			{playlistsIsPending && <div className="text-gray-300">Loading...</div>}

			{playlists && (
				<div className="space-y-6">
					{playlists.map((playlist) => (
						<PlaylistCard key={playlist.id} playlist={playlist} />
					))}
				</div>
			)}
		</div>
	);
};
