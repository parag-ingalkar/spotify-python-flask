import { Outlet } from "react-router";
import { NavBar } from "./NavBar";

export const Dashboard = () => {
	return (
		<>
			<div className="dashboard">
				<NavBar />
				<Outlet />
			</div>
		</>
	);
};
