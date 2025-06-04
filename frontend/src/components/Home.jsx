import { useNavigate } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate();

	const handleGetStarted = async () => {
		try {
			const res = await fetch("http://127.0.0.1:5000/check-auth", {
				credentials: "include",
			});
			const data = await res.json();

			if (data.authenticated) {
				navigate("/dashboard");
			} else {
				window.location.href = "http://127.0.0.1:5000/login";
			}
		} catch (err) {
			console.error("Error checking authentication", err);
		}
	};

	return (
		<>
			<div>
				<div className="text-white">
					<h2>Welcome to Spotify Playlist Manager</h2>
					<p>Manage your collaborative playlist.</p>
					<div>
						<button className="border-4" onClick={handleGetStarted}>
							Get Started
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
