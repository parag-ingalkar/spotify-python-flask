import useFetch from "./hooks/useFetch";
import { NavBar } from "./NavBar";
import { PlaylistCard } from "./PlaylistCard";

export const Dashboard = () => {
	const {
		data: playlists,
		isPending,
		error,
	} = useFetch("http://127.0.0.1:5000/api/playlists");

	return (
		<>
			<NavBar />
			<div className="container mt-4">
				<h2>Your Playlists</h2>
				{error && <div> {error} </div>}
				{isPending && <div> Loading... </div>}
				{playlists &&
					playlists.map((playlist) => (
						<PlaylistCard key={playlist.id} playlist={playlist} />
					))}
			</div>
		</>
	);
};
