import { useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { useState } from "react";

const Songs = () => {
	const [dropdownOpen, setDropdownOpen] = useState({});

	const { id } = useParams();

	const tracksUrl = "http://127.0.0.1:5000/api/playlists/" + id + "/tracks";

	const { data: tracks, tracksIsPending, tracksError } = useFetch(tracksUrl);

	const handleRemoveTrack = (trackID) => {
		const removeTrackURL =
			"http://127.0.0.1:5000/api/playlists/" + id + "/tracks/" + trackID;

		fetch(removeTrackURL, {
			method: "DELETE",
			credentials: "include",
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error("Error:", error));
	};

	return (
		<div className="mt-10 h-[450px] overflow-y-auto transparent-scrollbar pr-4 overscroll-y-auto bg-scroll">
			<div className="flex text-sm text-gray-400 border-b border-gray-700 pb-2 sticky top-0 z-50 bg-[#18154a] ">
				<div className="w-10 flex items-center justify-left p-2">#</div>
				<div className="flex-1 flex items-center justify-left p-2">Title</div>
				<div className="w-48 flex items-center justify-left p-2">Album</div>
				<div className="w-48 flex items-center justify-left p-2">Added by</div>
				<div className="w-32 flex items-center justify-left p-2">
					Date added
				</div>
				<div className="w-16 flex items-center justify-left p-2">Duration</div>
				<div className="w-16 flex items-center justify-center p-2"></div>
			</div>
			{tracks.map((item, index) => {
				const track = item.track;
				return (
					<div
						key={track.id}
						className="flex text-sm py-3 border-b border-gray-800 hover:bg-gray-800"
					>
						<div className="w-10 flex items-center justify-left p-2">
							{index + 1}
						</div>
						<div className="flex-1 flex items-center gap-4 p-2">
							<img
								src={track.album.images?.[2]?.url}
								alt=""
								className="w-10 h-10 rounded"
							/>
							<div>
								<p className="font-medium">{track.name}</p>
								<p className="text-gray-400">
									{track.artists.map((a) => a.name).join(", ")}
								</p>
							</div>
						</div>
						<div className="w-48 flex items-center justify-left p-2">
							{track.album.name}
						</div>
						<div className="w-48 flex items-center justify-left p-2">
							<img
								src={item.added_by.images?.[1]?.url || "/user.png"}
								alt=""
								className="w-7.5 h-7.5 rounded-full"
							/>
							<div>
								<p className="font-medium ml-2">{item.added_by.display_name}</p>
							</div>
						</div>
						<div className="w-32 flex items-center justify-left p-2">
							{new Date(item.added_at).toLocaleDateString()}
						</div>
						<div className="w-16 flex items-center justify-center p-2">
							{millisToMinutesAndSeconds(track.duration_ms)}
						</div>
						<div className="w-16 relative flex items-center justify-center p-2">
							<div className="relative">
								<button
									onClick={() =>
										setDropdownOpen((prev) => ({
											...prev,
											[track.id]: !prev[track.id],
										}))
									}
									className="text-white hover:text-gray-300 px-2 py-1 focus:outline-none"
								>
									⋮
								</button>

								{/* Dropdown menu */}
								{dropdownOpen[track.id] && (
									<div className="absolute top-full right-0 mt-1 w-36 bg-[#18154a] border border-gray-700 rounded shadow-lg z-20">
										<ul className="text-sm text-left text-white">
											<li>
												<button
													onClick={() => {
														handleRemoveTrack(track.id);
														setDropdownOpen((prev) => ({
															...prev,
															[track.id]: false,
														}));
													}}
													className="w-full text-left px-4 py-2 hover:bg-red-600"
												>
													Remove this song
												</button>
											</li>
										</ul>
									</div>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

function millisToMinutesAndSeconds(millis) {
	const minutes = Math.floor(millis / 60000);
	const seconds = ((millis % 60000) / 1000).toFixed(0);
	return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default Songs;
