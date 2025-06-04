import { Link } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { PlaylistCard } from "./PlaylistCard";

export const Playlists = () => {
	const {
		data: playlists,
		isPending: playlistsIsPending,
		error: playlistsError,
	} = useFetch("http://127.0.0.1:5000/api/playlists");

	return (
		<>
			<div className="playlists">
				<div className="container mt-4">
					<h2>Your Playlists</h2>
					{playlistsError && <div> {playlistsError} </div>}
					{playlistsIsPending && <div> Loading... </div>}
					{playlists &&
						playlists.map((playlist) => (
							<PlaylistCard key={playlist.id} playlist={playlist} />
						))}
				</div>
			</div>
		</>
	);
};
