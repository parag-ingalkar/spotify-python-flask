import { Link } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { useState } from "react";

export const NavBar = () => {
	const {
		data: user,
		isPending: userIsPending,
		error: userError,
	} = useFetch("http://127.0.0.1:5000/api/me");

	const profileImg = user?.images?.[0]?.url || "/user.png";

	const handleLogout = () => {
		console.log("Logout");
		// window.location.href = "http://127.0.0.1:5000/logout"; // or use fetch + redirect
	};
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<nav className="bg-gray-900 px-4 py-3">
			<div className="container mx-auto flex items-center justify-between">
				{/* Brand */}
				<Link to="/" className="text-white font-bold text-xl">
					Spotify
				</Link>

				{/* Toggle button for mobile */}
				<button
					className="text-white md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>

				{/* Links */}
				<div
					className={`${
						isMenuOpen ? "block" : "hidden"
					} md:flex md:items-center md:space-x-6`}
				>
					<Link to="/dashboard" className="text-white hover:text-amber-400">
						Playlists
					</Link>
				</div>

				{/* Profile dropdown */}
				{user && (
					<div className="relative ml-4">
						<button
							onClick={() => setIsDropdownOpen(!isDropdownOpen)}
							className="flex items-center space-x-2"
						>
							<span className="text-white hidden lg:inline">
								{user.display_name}
							</span>
							<img
								src={profileImg}
								alt="Profile"
								className="w-10 h-10 rounded-full"
							/>
						</button>

						{isDropdownOpen && (
							<ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
								<li className="px-4 py-2 font-semibold text-gray-800 border-b">
									{user.display_name}
								</li>
								<li>
									<button
										className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
										onClick={handleLogout}
									>
										Logout
									</button>
								</li>
							</ul>
						)}
					</div>
				)}
			</div>
		</nav>
	);
};
