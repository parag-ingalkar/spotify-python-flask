import { useParams, Outlet } from "react-router-dom";
import useFetch from "./hooks/useFetch";

import { PlaylistCard } from "./PlaylistCard";
import Collaborators from "./Collaborators";
import Songs from "./Songs";

export const PlaylistDetails = () => {
	const { id } = useParams();
	const playlistUrl = "http://127.0.0.1:5000/api/playlists/" + id;

	const {
		data: playlist,
		playlistIsPending,
		playlistError,
	} = useFetch(playlistUrl);

	console.log("Playlist: ", playlist);

	const imageUrl = playlist.images?.[0]?.url || "/playlist.png";
	const owner = playlist.owner?.display_name || "Unknown";
	const tracks = playlist.tracks?.items || [];

	return (
		<div className="playlist-details container-mt-4">
			<div className="bg-gradient-to-b from-indigo-900 to-black text-white min-h-screen p-6">
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
							{owner} • {playlist.tracks?.total || 0} songs
						</p>
					</div>
				</div>

				<div className="grid grid-cols-3 gap-4">
					<div className="col-span-2">{tracks && <Songs />}</div>
					<div>
						<Collaborators />
					</div>
				</div>
			</div>
		</div>
	);
};

// Helper to format milliseconds to mm:ss
function millisToMinutesAndSeconds(millis) {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
