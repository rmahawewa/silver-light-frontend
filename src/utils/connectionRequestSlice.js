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
	},
});

export const { addConnectionFeed, addNewConnectionRequest } =
	connectionRequestSlice.actions;
export default connectionRequestSlice.reducer;
