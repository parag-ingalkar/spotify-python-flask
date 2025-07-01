import useFetch from "./hooks/useFetch";
import { PlaylistCard } from "./PlaylistCard";
import { PlaylistCardSkeleton } from "./PlaylistCardSkeleton";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const Playlists = () => {
	const {
		data: authData,
		isPending: IsPending,
		error: Error,
	} = useFetch(`${baseURL}/check-auth`);

	console.log(authData);

	const {
		data: playlists,
		isPending: playlistsIsPending,
		error: playlistsError,
	} = useFetch(`${baseURL}/api/playlists`);

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
