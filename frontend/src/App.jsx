//App.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";
import { PlaylistDetails } from "./components/PlaylistDetails";
import { Playlists } from "./components/Playlists";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<div className="content">
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/dashboard" element={<Dashboard />}>
							<Route index element={<Playlists />} />
							<Route path="playlists/:id" element={<PlaylistDetails />} />
						</Route>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
