import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "postfeed",
	initialState: null,
	reducers: {
		addPostFeed: (state, action) => {
			return action.payload;
		},
	},
});
