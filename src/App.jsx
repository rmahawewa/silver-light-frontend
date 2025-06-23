import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import reduxStore from "./utils/reduxStore";
import Body from "./components/Body";
import Drawer from "./components/Sidebar";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Settings from "./components/Settings";

function App() {
	return (
		<>
			<Provider store={reduxStore}>
				<BrowserRouter basename="/">
					<Routes>
						<Route path="/" element={<Body />}>
							<Route path="/" element={<Feed />} />
							<Route path="/login" element={<Login />} />
							<Route path="/connections" element={<Connections />} />
							<Route path="/conn-requests" element={<Requests />} />
							<Route path="/settings" element={<Settings />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
