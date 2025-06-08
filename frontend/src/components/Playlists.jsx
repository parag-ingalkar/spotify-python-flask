import useFetch from "./hooks/useFetch";
import { PlaylistCard } from "./PlaylistCard";
import { PlaylistCardSkeleton } from "./PlaylistCardSkeleton";

export const Playlists = () => {
	const {
		data: playlists,
		isPending: playlistsIsPending,
		error: playlistsError,
	} = useFetch("http://127.0.0.1:5000/api/playlists");

	return (
		<div className="py-8 px-4 md:px-8">
			<h2 className="text-2xl font-semibold text-white mb-6">Your Playlists</h2>
			<div className="grid grid-cols-2 gap-4">
				{playlistsError && (
					<div className="text-red-500 font-medium">{playlistsError}</div>
				)}

				{playlistsIsPending &&
					Array(5)
						.fill(0)
						.map((_, index) => <PlaylistCardSkeleton key={index} />)}

				{playlists && (
					<>
						{playlists.map((playlist) => (
							<PlaylistCard key={playlist.id} playlist={playlist} />
						))}
					</>
				)}
			</div>
		</div>
	);
};
