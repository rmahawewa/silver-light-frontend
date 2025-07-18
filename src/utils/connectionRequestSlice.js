import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice({
	name: "connectionfeed",
	initialState: [],
	reducers: {
		addConnectionFeed: (state, action) => {
			return action.payload;
		},
		addNewConnectionRequest: (state, action) => {
			state.push(action.payload);
		},
		saveRespond: (state, action) => {
			const request = action.payload;
			const entry = state.find((r) => r._id === request._id);
			if (!entry) {
				console.warn(`Connection request with ${request._id} not found.`);
			}
			entry.status = request.status;
		},
	},
});

export const { addConnectionFeed, addNewConnectionRequest, saveRespond } =
	connectionRequestSlice.actions;
export default connectionRequestSlice.reducer;
