import { useParams, Outlet } from "react-router-dom";
import useFetch from "./hooks/useFetch";

import { PlaylistCard } from "./PlaylistCard";
import Collaborators from "./Collaborators";
import Songs from "./Songs";
import { PlaylistCardSkeleton } from "./PlaylistCardSkeleton";

export const PlaylistDetails = () => {
	const { id } = useParams();
	const playlistUrl = "http://127.0.0.1:5000/api/playlists/" + id;

	const {
		data: playlist,
		isPending: playlistIsPending,
		error: playlistError,
	} = useFetch(playlistUrl);

	const tracks = playlist?.tracks?.items || [];

	return (
		<div className="playlist-details text-white">
			{playlistError && (
				<div className="text-red-500">Error: {playlistError}</div>
			)}
			{playlistIsPending ? (
				<PlaylistCardSkeleton />
			) : (
				playlist && <PlaylistCard playlist={playlist} />
			)}

			<div className="grid grid-cols-3 gap-6 px-8 py-2">
				<div className="col-span-2">{tracks && <Songs />}</div>
				<div>
					<Collaborators />
				</div>
			</div>
		</div>
	);
};
