import { Link } from "react-router-dom";

export const PlaylistCard = ({ playlist }) => {
	const imageUrl =
		playlist.images && playlist.images.length > 0
			? playlist.images[0].url
			: "/playlist.png";

	return (
		<div className="playlist-card">
			<div className="card mb-5">
				<div className="row g-0">
					<div className="playlist-image col-md-4">
						<img
							src={imageUrl}
							className="img-fluid rounded-start"
							alt={playlist.name}
							width="180"
							height="180"
						/>
					</div>
					<div className="playlist-details col-md-8">
						<div className="card-body">
							<div>
								<Link
									to={`/dashboard/playlists/${playlist.id}`}
									style={{ textDecoration: "none" }}
								>
									<h5 className="card-title">{playlist.name}</h5>
									<p className="card-text">{playlist.owner.display_name}</p>
									<p className="card-text">
										<small className="text-muted">
											Tracks: {playlist.tracks.total}
										</small>
									</p>
								</Link>
							</div>
							<div className="playlist-spotify-link mt-3">
								<a
									href={playlist.external_urls.spotify}
									className="btn btn-primary"
									target="_blank"
									rel="noopener noreferrer"
								>
									Open in Spotify
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
