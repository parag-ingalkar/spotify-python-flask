import { useNavigate } from "react-router-dom";

export const NavBar = () => {
	const navigate = useNavigate();

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-dark">
				<div className="container-fluid">
					<a className="navbar-brand" href="" onClick={() => navigate("/")}>
						Spotify
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavAltMarkup"
						aria-controls="navbarNavAltMarkup"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
						<div className="navbar-nav">
							<a className="nav-link active" aria-current="page" href="#">
								Playlists
							</a>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};
