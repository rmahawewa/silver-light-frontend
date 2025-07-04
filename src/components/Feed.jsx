import React, { useEffect } from "react";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import { addImageFeed } from "../utils/imageSlice";
import { addPostFeed } from "../utils/postSlice";
import { addConnectionFeed } from "../utils/connectionRequestSlice";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import ImageCard from "./ImageCard";

const Feed = () => {
	const dispatch = useDispatch();
	const feedData = useSelector((store) => store.imagefeed);

	const getFeed = async () => {
		// if (feedData) return; // this output null
		try {
			const res = await axios.get(BASE_URL + "/feed", {
				withCredentials: true,
			});
			// console.log(res);
			// console.log(res.data.imageData);
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

	const getConnections = async () => {
		try {
			const res = await axios.get(BASE_URL + "/request/user-requests", {
				withCredentials: true,
			});
			// console.log(res.data.connections);
			dispatch(addConnectionFeed(res.data.connections));
		} catch (err) {}
	};

	useEffect(() => {
		getFeed();
		getConnections();
	}, []);

	if (!feedData) return;
	if (feedData.length === 0)
		return <h1 className="flex justify-center my-10">Feed is empty</h1>;

	return (
		<>
			{feedData &&
				feedData.map((img) => (
					<div key={img._id} className=" flex justify-center py-10">
						<ImageCard imageId={img._id} />
					</div>
				))}
		</>
	);
};

export default Feed;
