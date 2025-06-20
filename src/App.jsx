import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import reduxStore from "./utils/reduxStore";

function App() {
	return (
		<>
			<Provider store={reduxStore}>
				<BrowserRouter basename="/">
					<Routes></Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}
