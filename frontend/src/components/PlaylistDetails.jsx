import { useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";

export const PlaylistDetails = () => {
	const { id } = useParams();
	const url = "http://127.0.0.1:5000/api/playlists/" + id;

	const { data: playlist, isPending, error } = useFetch(url);

	// return (
	// 	const PlaylistDetails = ({ playlist }) => {
	// if (!playlist) return null;

	const image = playlist.images?.[0]?.url || "/playlist.png";
	const owner = playlist.owner?.display_name || "Unknown";
	const followers = playlist.followers?.total || 0;
	const tracks = playlist.tracks?.items || [];

	return (
		<div className="bg-gradient-to-b from-indigo-900 to-black text-white min-h-screen p-6">
			<div className="flex gap-6 items-end">
				<img
					src={image}
					alt="Playlist cover"
					className="w-48 h-48 rounded shadow-lg object-cover bg-gray-800"
				/>
				<div>
					<p className="uppercase text-sm font-semibold text-gray-400">
						Public Playlist
					</p>
					<h1 className="text-5xl font-bold mt-2">{playlist.name}</h1>
					<p className="text-gray-300 mt-2">
						{owner} • {playlist.tracks?.total || 0} songs
					</p>
				</div>
			</div>

			{/* Controls */}
			<div className="flex items-center gap-4 mt-8">
				<button className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center">
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M5 3v18l15-9L5 3z" />
					</svg>
				</button>
				<button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm">
					Download
				</button>
				<button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded text-sm">
					Share
				</button>
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
	);
};

// Helper to format milliseconds to mm:ss
function millisToMinutesAndSeconds(millis) {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
