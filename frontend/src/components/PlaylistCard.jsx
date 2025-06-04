export const PlaylistCard = ({ playlist }) => {
	const imageUrl =
		playlist.images && playlist.images.length > 0
			? playlist.images[0].url
			: "https://via.placeholder.com/150";

	return (
		<div className="card mb-3" style={{ maxWidth: "540px" }}>
			<div className="row g-0">
				<div className="col-md-4">
					<img
						src={imageUrl}
						className="img-fluid rounded-start"
						alt={playlist.name}
					/>
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">{playlist.name}</h5>
						<p className="card-text">{playlist.owner.display_name}</p>
						<p className="card-text">
							<small className="text-muted">
								Tracks: {playlist.tracks.total}
							</small>
						</p>
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
	);
};
