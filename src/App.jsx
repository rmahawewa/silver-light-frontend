import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { reduxStore, persistor } from "./utils/reduxStore";
import { PersistGate } from "redux-persist/integration/react";
import Body from "./components/Body";
import Drawer from "./components/Sidebar";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Settings from "./components/Settings";
import NewImage from "./components/NewImage";
import NewPost from "./components/NewPost";
import Categories from "./components/Categories";

function App() {
	return (
		<>
			<Provider store={reduxStore}>
				<PersistGate loading={null} persistor={persistor}>
					<BrowserRouter basename="/">
						<Routes>
							<Route path="/" element={<Body />}>
								<Route path="/:category" element={<Feed />} />
								<Route path="/login" element={<Login />} />
								<Route path="/connections" element={<Connections />} />
								<Route path="/conn-requests" element={<Requests />} />
								<Route path="/settings" element={<Settings />} />
								<Route path="/new-image" element={<NewImage />} />
								<Route path="/new-post" element={<NewPost />} />
								<Route path="/categories" element={<Categories />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</PersistGate>
			</Provider>
		</>
	);
}

export default App;
