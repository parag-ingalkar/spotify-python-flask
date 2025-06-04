import { Link } from "react-router-dom";
import useFetch from "./hooks/useFetch";

export const NavBar = () => {
	const {
		data: user,
		isPending: userIsPending,
		error: userError,
	} = useFetch("http://127.0.0.1:5000/api/me");

	const profileImg = user?.images?.[0]?.url || "/profile.png";

	const handleLogout = () => {
		console.log("Logout");
		// window.location.href = "http://127.0.0.1:5000/logout"; // or use fetch + redirect
	};

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
				<div className="container-fluid">
					{/* Brand - Left */}
					<Link className="navbar-brand" to="/">
						Spotify
					</Link>

					{/* Toggle button - visible only on small screens */}
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					{/* Collapsible nav links - Center (or collapsed in small view) */}
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav me-auto">
							<li className="nav-item">
								<a className="nav-link active" href="#">
									Playlists
								</a>
							</li>
						</ul>
					</div>

					{/* Profile picture & dropdown - Always visible, Right-aligned */}
					{user && (
						<div className="dropdown d-flex align-items-center ms-auto">
							<img
								src={profileImg}
								alt="Profile"
								width="40"
								height="40"
								className="rounded-circle dropdown-toggle"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							/>
							<ul className="dropdown-menu dropdown-menu-end">
								<li className="dropdown-item-text">
									<strong>{user.display_name}</strong>
								</li>
								<li>
									<hr className="dropdown-divider" />
								</li>
								<li>
									<button className="dropdown-item" onClick={handleLogout}>
										Logout
									</button>
								</li>
							</ul>
							<span className="text-white d-none d-lg-inline ms-2">
								{user.display_name}
							</span>
						</div>
					)}
				</div>
			</nav>
		</>
	);
};
