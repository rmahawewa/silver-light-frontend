export const getFeed = async (category) => {
	// if (feedData) return; // this output null
	console.log(category); // logs as undefined
	try {
		const res = await axios.post(
			BASE_URL + "/feed",
			{ categ: category },
			{
				withCredentials: true,
			}
		);
		console.log(res.data);
		// console.log(res.data.postData);
		dispatch(addImageFeed(res.data.imageData));
		dispatch(addPostFeed(res.data.postData));
		const postComments = await axios.get(BASE_URL + "/feed/postcomments", {
			// operate later
			withCredentials: true,
		});
	} catch (err) {
		console.error(err);
	}
};
