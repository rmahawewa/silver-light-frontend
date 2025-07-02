import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
	name: "postfeed",
	initialState: null,
	reducers: {
		addPostFeed: (state, action) => {
			return action.payload;
		},
		addOnePost: (state, action) => {
			state = [...state, action.payload];
			return state;
		},
	},
});

export const { addPostFeed, addOnePost } = postSlice.actions;
export default postSlice.reducer;
