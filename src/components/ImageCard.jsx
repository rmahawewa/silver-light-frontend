import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";

const ImageCard = ({ image }) => {
	const user = useSelector((store) => store.user);
	const [reaction, setReaction] = useState("");

	useEffect(() => {
		image.reactions.map((r) => {
			if (r.reactedById === user._id) {
				setReaction(r.reactionType);
			}
		});
	}, []);
	const saveReaction = async (reaction) => {
		try {
			const res = await axios.post(
				BASE_URL + "/reaction/save",
				{ photoId: image._id, reaction: reaction },
				{ withCredentials: true }
			);
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
						Like
					</button>
					<button
						onClick={() => saveReaction("familier")}
						className={
							reaction === "familier" ? "btn btn-secondary" : "btn btn-primary"
						}
					>
						Familier
					</button>
					<button
						onClick={() => saveReaction("love")}
						className={
							reaction === "love" ? "btn btn-secondary" : "btn btn-primary"
						}
					>
						Love
					</button>
					<button
						onClick={() => saveReaction("aTrue")}
						className={
							reaction === "aTrue" ? "btn btn-secondary" : "btn btn-primary"
						}
					>
						True
					</button>
					<button
						onClick={() => saveReaction("wonderful")}
						className={
							reaction === "wonderful" ? "btn btn-secondary" : "btn btn-primary"
						}
					>
						Wonderful
					</button>
					<button
						onClick={() => saveReaction("iFeelJelousy")}
						className={
							reaction === "iFeelJelousy"
								? "btn btn-secondary"
								: "btn btn-primary"
						}
					>
						I feel jelousy
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
