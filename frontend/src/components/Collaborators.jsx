import { useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { useState } from "react";

const Collaborators = () => {
	const { id } = useParams();
	const url = "http://127.0.0.1:5000/api/playlists/" + id + "/collaborators";
	const { data: collaborators, isPending, error } = useFetch(url);

	const [dropdownOpen, setDropdownOpen] = useState({});

	const handleRemoveTracksByCollaborator = (collaborator) => {
		const removeTrackURL =
			"http://127.0.0.1:5000/api/playlists/" +
			id +
			"/tracks/remove_by_collaborator";

		if (confirm(`Remove all songs added by ${collaborator.display_name}?`)) {
			fetch(removeTrackURL, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ collaborator_id: collaborator.id }),
				credentials: "include",
			})
				.then((response) => response.json())
				.then((data) => console.log(data))
				.catch((error) => console.error("Error:", error));
		}
	};

	return (
		<>
			<div className="text-center text-xl">Collaborators</div>
			<div className="h-[450px] mt-3 overflow-y-auto transparent-scrollbar pr-4 overscroll-y-auto ">
				<div className="sticky top-0 z-10 bg-[#18154a] bg-opacity-100 flex text-sm text-gray-400 border-b border-gray-700 pb-2">
					<div className="w-8 text-center items-center flex justify-center">
						#
					</div>
					<div className="flex-1 flex items-center justify-start px-4">
						Collaborator
					</div>
					<div className="w-64 flex items-center justify-center text-center">
						Number of songs added
					</div>
					<div className="w-16 flex items-center justify-center"></div>
				</div>

				{collaborators.map((collaborator, index) => (
					<div
						key={collaborator.id}
						className="flex text-sm py-3 border-b border-gray-800 hover:bg-gray-800"
					>
						<div className="w-8 flex justify-center items-center">
							{index + 1}
						</div>
						<div className="flex-1 flex items-center justify-start px-4">
							<img
								src={collaborator.images?.[1]?.url || "/user.png"}
								alt=""
								className="w-6 h-6 rounded-full"
							/>
							<p className="font-medium ml-2">{collaborator.display_name}</p>
						</div>
						<div className="w-64 flex items-center justify-center text-center">
							"Songs Added"
						</div>
						<div className="w-16 relative flex items-center justify-center">
							<button
								onClick={() =>
									setDropdownOpen((prev) => ({
										...prev,
										[collaborator.id]: !prev[collaborator.id],
									}))
								}
								className="text-white hover:text-gray-300 px-2 py-1 focus:outline-none"
							>
								⋮
							</button>

							{dropdownOpen[collaborator.id] && (
								<div className="absolute top-full right-0 mt-1 w-50 bg-[#18154a] border border-gray-700 rounded shadow-lg z-20">
									<ul className="text-sm text-left text-white">
										<li>
											<button
												onClick={() => {
													handleRemoveTracksByCollaborator(collaborator);
													setDropdownOpen((prev) => ({
														...prev,
														[collaborator.id]: false,
													}));
												}}
												className="w-full text-left text-sm px-4 py-2 hover:bg-red-600"
											>
												Remove all songs by this Collaborator
											</button>
										</li>
									</ul>
								</div>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Collaborators;
