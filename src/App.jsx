import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import reduxStore from "./utils/reduxStore";
import Body from "./components/Body";
import Drawer from "./components/Sidebar";

function App() {
	return (
		<>
			{/* <Provider store={reduxStore}> */}
			<BrowserRouter basename="/">
				<Routes>
					<Route path="/" element={<Body />}>
						{/* <Route path="/categories" element={<Drawer />} /> */}
					</Route>
				</Routes>
			</BrowserRouter>
			{/* </Provider> */}
		</>
	);
}

export default App;
