import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { savereaction } from "../utils/imageSlice";

const ImageCard = ({ imageId }) => {
	const user = useSelector((store) => store.user);
	const [reaction, setReaction] = useState("");
	// const [reactionCount, setReactionCount] = useState(0);
	const dispatch = useDispatch();
	const image = useSelector((store) =>
		store.imagefeed.find((img) => img._id === imageId)
	);

	const findSimilarReactionCount = (type) => {
		const result = image.reactions.filter((r) => r.reactionType === type);
		return result.length;
		// console.log(image);
		// console.log(reaction);
		// setReactionCount(result.length);
	};

	useEffect(() => {
		if (image && user?._id) {
			const userReaction = image.reactions.find(
				(r) => r.reactedById === user._id
			);
			if (userReaction) {
				setReaction(userReaction.reactionType);
			}
		}
		// findSimilarReactionCount();
	}, [image, user]);

	const saveReaction = async (r) => {
		try {
			if (reaction === r) {
				r = "undo";
				setReaction("");
			} else {
				setReaction(r);
			}
			const res = await axios.post(
				BASE_URL + "/reaction/save",
				{ photoId: image._id, reaction: r },
				{ withCredentials: true }
			);
			dispatch(savereaction(res.data.data));
			// findSimilarReactionCount();
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<div className="card bg-base-100 w-180 shadow-sm">
			<figure>
				<img
					src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
					alt="Shoes"
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">{image.photoTitle}</h2>
				<p>{image.photoDescription}</p>
				<p>
					{image.category.map((c, i) => (
						<span key={i}>#{c} </span>
					))}
				</p>
				<div className="card-actions justify-end py-5">
					<button
						onClick={() => saveReaction("like")}
						className={
							reaction === "like" ? "btn btn-secondary" : "btn btn-primary"
						}
					>
						Like{" "}
						{reaction === "like" && (
							<span className="badge badge-ghost">
								{findSimilarReactionCount(reaction)}
							</span>
						)}
					</button>
					<button
						onClick={() => saveReaction("familier")}
						className={
							reaction === "familier" ? "btn btn-secondary" : "btn btn-primary"
						}
					>
						Familier{" "}
						{reaction === "familier" && (
							<span className="badge badge-ghost">
								{findSimilarReactionCount(reaction)}
							</span>
						)}
					</button>
					<button
						onClick={() => saveReaction("love")}
						className={
							reaction === "love" ? "btn btn-secondary" : "btn btn-primary"
						}
					>
						Love{" "}
						{reaction === "love" && (
							<span className="badge badge-ghost">
								{findSimilarReactionCount(reaction)}
							</span>
						)}
					</button>
					<button
						onClick={() => saveReaction("aTrue")}
						className={
							reaction === "aTrue" ? "btn btn-secondary" : "btn btn-primary"
						}
					>
						True{" "}
						{reaction === "aTrue" && (
							<span className="badge badge-ghost">
								{findSimilarReactionCount(reaction)}
							</span>
						)}
					</button>
					<button
						onClick={() => saveReaction("wonderful")}
						className={
							reaction === "wonderful" ? "btn btn-secondary" : "btn btn-primary"
						}
					>
						Wonderful{" "}
						{reaction === "wonderful" && (
							<span className="badge badge-ghost">
								{findSimilarReactionCount(reaction)}
							</span>
						)}
					</button>
					<button
						onClick={() => saveReaction("iFeelJelousy")}
						className={
							reaction === "iFeelJelousy"
								? "btn btn-secondary"
								: "btn btn-primary"
						}
					>
						I feel jelousy{" "}
						{reaction === "iFeelJelousy" && (
							<span className="badge badge-ghost">
								{findSimilarReactionCount(reaction)}
							</span>
						)}
					</button>
				</div>
			</div>
		</div>
	);
};
//                  "like",
// 					"familier",
// 					"aTrue",
// 					"love",
// 					"wonderful",
// 					"iFeelJelousy",

export default ImageCard;
