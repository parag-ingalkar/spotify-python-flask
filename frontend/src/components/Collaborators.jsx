import { useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import { useEffect, useState } from "react";
import { CollaboratorsRowSkeleton } from "./CollaboratorsRowSkeleton";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Collaborators = () => {
	const { id } = useParams();
	const url = `${baseURL}/api/playlists/${id}/collaborators`;
	const {
		data: collaborators,
		isPending: collaboratorsIsPending,
		error: collaboratosError,
	} = useFetch(url);

	const [dropdownOpen, setDropdownOpen] = useState({});

	const handleRemoveTracksByCollaborator = (collaborator) => {
		const removeTrackURL = `${baseURL}/api/playlists/${id}/tracks/remove_by_collaborator`;

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
				.then((data) => {
					console.log(data);
					window.location.reload();
				})
				.catch((error) => console.error("Error:", error));
		}
	};

	return (
		<>
			<div className="text-center text-xl">Collaborators</div>
			<div className="h-[550px] mt-4 overflow-y-auto transparent-scrollbar mr-4 overscroll-y-auto bg-scroll">
				<div className="sticky top-0 z-10 bg-[#101828] bg-opacity-100 flex text-sm text-gray-400 border-b border-gray-700 pb-2">
					<div className="w-10 flex-none flex items-center justify-left p-2">
						#
					</div>
					<div className="flex-auto flex items-center justify-left">
						Collaborator
					</div>
					<div className="w-42 flex-none flex items-center justify-center text-center">
						Number of songs added
					</div>
					<div className="w-16 flex items-center justify-center"></div>
				</div>

				{collaboratorsIsPending &&
					Array(2)
						.fill(0)
						.map((_, i) => <CollaboratorsRowSkeleton key={i} />)}

				{collaborators?.map((collaborator, index) => (
					<div
						key={collaborator.id}
						className="flex text-sm py-3 border-b border-gray-800 hover:bg-gray-800"
					>
						<div className="w-10 flex-none flex justify-left items-center p-2">
							{index + 1}
						</div>
						<div className="flex-auto flex items-center justify-left">
							<img
								src={collaborator.images?.[1]?.url || "/user.png"}
								alt=""
								className="w-7 h-7 rounded-full"
							/>
							<p className="font-medium ml-2">{collaborator.display_name}</p>
						</div>
						<div className="w-42 flex-none flex items-center justify-center text-center">
							{collaborator.song_count}
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
								<div className="absolute top-full right-0 mt-1 w-50 bg-[#101828] border border-gray-700 rounded shadow-lg z-20">
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
												className="w-full text-center text-[12px] p-2 hover:bg-red-600"
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
