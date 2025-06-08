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
		window.location.href = "http://127.0.0.1:5000/logout";
	};
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	return (
		<nav className="bg-linear-to-t from-gray-900 to-gray-950 px-4 py-3 my-1 flex">
			{/* Brand */}
			<div className="flex flex-none px-2 py-1 mx-2 items-center">
				<Link to="/" className="text-white font-bold text-xl">
					Spotify
				</Link>
			</div>

			{/* Links */}
			<div className="flex flex-auto px-2 py-1 mx-2 items-center text-left justify-start">
				<Link to="/dashboard" className="px-2 text-white hover:text-green-400">
					Manage Playlist
				</Link>
				<Link to="/#" className="px-2 text-white hover:text-green-400">
					Create Playlist
				</Link>
			</div>
			{/* Profile dropdown */}
			{user && (
				<div className="flex flex-none relative mx-2 px-2 items-center text-center">
					<span className="text-white py-1 pr-2 mr-2 hidden md:inline">
						{user.display_name}
					</span>
					<button
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						className="flex items-center space-x-2"
					>
						<img
							src={profileImg}
							alt="Profile"
							className="w-8 h-8 rounded-full"
						/>
					</button>

					{isDropdownOpen && (
						<ul className="absolute top-10 right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
							<li className="px-4 py-2 text-left font-semibold text-gray-800 border-b md:hidden">
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
		</nav>
	);
};
