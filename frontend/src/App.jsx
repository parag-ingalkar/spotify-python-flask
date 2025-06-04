import "bootstrap/dist/css/bootstrap.min.css";
//App.jsx

import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/dashboard" element={<Dashboard />} />
		</Routes>
	);
}

export default App;
