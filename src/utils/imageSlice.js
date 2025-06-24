import { createSlice } from "@reduxjs/toolkit";

const imageSlice = createSlice({
	name: "imagefeed",
	initialState: null,
	reducers: {
		addImageFeed: (state, action) => {
			return action.payload;
		},
	},
});

export const { addImageFeed } = imageSlice.actions;
export default imageSlice.reducer;
