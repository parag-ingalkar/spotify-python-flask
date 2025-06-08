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
		<div className="relative isolate px-6 pt-14 lg:px-8 text-white">
			<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
				<div className="text-center">
					<h1 className="text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
						Welcome to Spotify Playlist Manager
					</h1>
					<p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
						Manage your collaborative playlist. <br />
						Easily remove songs added by a Collaborator.
					</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<button
							onClick={handleGetStarted}
							className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
						>
							Get started
						</button>
					</div>
				</div>
			</div>
			<div
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
				aria-hidden="true"
			></div>
		</div>
	);
};
