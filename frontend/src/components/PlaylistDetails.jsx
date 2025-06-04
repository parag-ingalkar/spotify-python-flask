import { useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";

export const PlaylistDetails = () => {
	const { id } = useParams();
	const url = "http://127.0.0.1:5000/api/playlists/" + id;

	const { data: playlist, isPending, error } = useFetch(url);

	return (
		<div className="playlist-details">
			<div className="container mt-4">
				{isPending ? (
					<div className="d-flex justify-content-center">
						<div className="spinner-border" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				) : error ? (
					<div>{error}</div>
				) : (
					playlist && (
						<div>
							<h2>{playlist.name}</h2>
							<p>Owner: {playlist.owner?.display_name}</p>
							<p>Followers: {playlist.followers?.total}</p>
						</div>
					)
				)}
			</div>
		</div>
	);
};
