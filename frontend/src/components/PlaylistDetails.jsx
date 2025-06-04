import { useParams, Outlet } from "react-router-dom";
import useFetch from "./hooks/useFetch";

import { PlaylistCard } from "./PlaylistCard";

export const PlaylistDetails = () => {
	const { id } = useParams();
	const playlistUrl = "http://127.0.0.1:5000/api/playlists/" + id;

	const {
		data: playlist,
		playlistIsPending,
		playlistError,
	} = useFetch(playlistUrl);
	const collaboratorsUrl =
		"http://127.0.0.1:5000/api/playlists/" + id + "/get_collaborators";
	const { data: collaborators, isPending, error } = useFetch(collaboratorsUrl);

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

				<div className="collaborators">
					<div className="mt-10">
						<div className="flex text-sm text-gray-400 border-b border-gray-700 pb-2">
							<div className="w-8">#</div>
							<div className="flex-1">Collaborator</div>
							<div className="w-48 hidden sm:block">Number of songs added</div>
						</div>
						{collaborators.map((collaborator, index) => {
							return (
								<div
									key={collaborator.id}
									className="flex text-sm py-3 border-b border-gray-800 hover:bg-gray-800"
								>
									<div className="w-8">{index + 1}</div>
									<div className="flex-1 flex items-center gap-4">
										<img
											src={collaborator.images?.[2]?.url}
											alt=""
											className="w-10 h-10 rounded"
										/>
										<div>
											<p className="font-medium">{collaborator.display_name}</p>
										</div>
									</div>
									<div className="w-48 hidden sm:block">"Songs Added"</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Song List */}
				<div className="mt-10">
					<div className="flex text-sm text-gray-400 border-b border-gray-700 pb-2">
						<div className="w-8">#</div>
						<div className="flex-1">Title</div>
						<div className="w-48 hidden sm:block">Album</div>
						<div className="w-32 hidden md:block">Date added</div>
						<div className="w-16 text-right">Time</div>
					</div>
					{tracks.map((item, index) => {
						const track = item.track;
						return (
							<div
								key={track.id}
								className="flex text-sm py-3 border-b border-gray-800 hover:bg-gray-800"
							>
								<div className="w-8">{index + 1}</div>
								<div className="flex-1 flex items-center gap-4">
									<img
										src={track.album.images?.[2]?.url}
										alt=""
										className="w-10 h-10 rounded"
									/>
									<div>
										<p className="font-medium">{track.name}</p>
										<p className="text-gray-400">
											{track.artists.map((a) => a.name).join(", ")}
										</p>
									</div>
								</div>
								<div className="w-48 hidden sm:block">{track.album.name}</div>
								<div className="w-32 hidden md:block">
									{new Date(item.added_at).toLocaleDateString()}
								</div>
								<div className="w-16 text-right">
									{millisToMinutesAndSeconds(track.duration_ms)}
								</div>
							</div>
						);
					})}
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
