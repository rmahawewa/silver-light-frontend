import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { savereaction } from "../utils/imageSlice";
import { addNewConnectionRequest } from "../utils/connectionRequestSlice";
import ConnectionRequest from "./icons/ConnectionRequest";
import Message from "./icons/Message";
import {
	Like,
	Love,
	Familier,
	True,
	Wonderful,
	IFeelJelousy,
} from "./icons/Reactions";
import SendFriendRequest from "./UserFunctions/SendFriendRequest";

const ImageCard = ({ imageId }) => {
	const user = useSelector((store) => store.user);
	const [reaction, setReaction] = useState("");
	const [reactors, setReactors] = useState([]);
	// const [reactionCount, setReactionCount] = useState(0);
	const dispatch = useDispatch();
	const image = useSelector((store) =>
		store.imagefeed.find((img) => img._id === imageId)
	);
	const userConnections = useSelector((store) => store.connectionfeed);
	console.log(userConnections);
	const modalId = `reactions_modal_${imageId}`;

	useEffect(() => {
		// console.log(`ImageCard for Image ID: ${imageId}`);
		// console.log("Image object from Redux:", image);
		if (image && !image.reactions) {
			console.warn(`Image ID ${imageId} is missing 'reactions' array!`);
		} else if (image && image.reactions && image.reactions.length === 0) {
			console.log(`Image ID ${imageId} has an empty 'reactions' array.`);
		}
	}, [image, imageId, userConnections]);

	const findSimilarReactionCount = (type) => {
		const result = image.reactions.filter((r) => r.reactionType === type);
		return result.length;
	};

	useEffect(() => {
		if (image && user?._id) {
			const userReaction = image?.reactions?.find(
				(r) => r.reactedById === user._id
			);
			if (userReaction) {
				setReaction(userReaction.reactionType);
			}
		}
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

	const getSimillarReactionsForTheImage = async (r) => {
		const reactionArray = [];

		if (!image || !image.reactions) {
			console.warn(
				`Cannot get similar reactions for image ID ${imageId}: image or reactions data is missing.`
			);
			setReactors([]); // Ensure reactors is empty if data is not available
			document.getElementById("my_modal_2").showModal(); // Show modal with "No users found"
			return; // Exit early
		}

		image.reactions.forEach((reaction) => {
			if (reaction.reactionType === r) {
				reactionArray.push(reaction.reactedById);
			}
		});
		const res = await axios.post(
			BASE_URL + "/reaction/getreactor",
			{ reactedByIds: reactionArray },
			{ withCredentials: true }
		);
		setReactors(res.data.data);
	};

	useEffect(() => {
		// console.log(reactors);
		if (reactors.length > 0) document.getElementById(modalId).showModal();
	}, [reactors]);

	const getConnectionStatus = () => {
		return (
			userConnections.length > 0 &&
			userConnections.find(
				(r) => r.fromUserId === user._id || r.toUserId === user._id
			)
		);
	};

	return (
		<>
			<div className="card bg-base-100 w-200 shadow-sm">
				<figure>
					<img
						// src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
						src={image.url}
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
								reaction === "like"
									? "btn btn-soft btn-primary"
									: "btn btn-primary"
							}
						>
							<Like />
							Like
						</button>
						<button
							onClick={() => saveReaction("familier")}
							className={
								reaction === "familier"
									? "btn btn-soft btn-primary"
									: "btn btn-primary"
							}
						>
							<Familier />
							Familier
						</button>
						<button
							onClick={() => saveReaction("love")}
							className={
								reaction === "love"
									? "btn btn-soft btn-primary"
									: "btn btn-primary"
							}
						>
							<Love />
							Love
						</button>
						<button
							onClick={() => saveReaction("aTrue")}
							className={
								reaction === "aTrue"
									? "btn btn-soft btn-primary"
									: "btn btn-primary"
							}
						>
							<True />
							True
						</button>
						<button
							onClick={() => saveReaction("wonderful")}
							className={
								reaction === "wonderful"
									? "btn btn-soft btn-primary"
									: "btn btn-primary"
							}
						>
							<Wonderful />
							Wonderful
						</button>
						<button
							onClick={() => saveReaction("iFeelJelousy")}
							className={
								reaction === "iFeelJelousy"
									? "btn btn-soft btn-primary"
									: "btn btn-primary"
							}
						>
							<IFeelJelousy />I feel jelousy
						</button>
					</div>
					{!(reaction === "" || reaction === "undo") && (
						<p
							onClick={() => getSimillarReactionsForTheImage(reaction)}
							className="cursor-pointer"
						>
							View {findSimilarReactionCount(reaction)} simillar reactions
						</p>
					)}
				</div>
			</div>
			<dialog id={modalId} className="modal">
				<div className="modal-box">
					<ul className="list bg-base-100 rounded-box">
						<li className="p-4 pb-2 text-s opacity-60 tracking-wide">
							<span className="font-bold">{reaction}</span>'s by,
						</li>
					</ul>
					<div className="max-h-96 overflow-y-auto">
						<ul className="list bg-base-100 rounded-box">
							{reactors.length > 0 ? (
								reactors.map((r) => (
									<li key={r._id} className="list-row">
										<div>
											<img
												className="size-10 rounded-box"
												src={r.photoUrl}
												alt={`${r.userName}'s information`}
											/>
										</div>
										<div>
											<div>{r.userName}</div>
										</div>
										{reaction !== "iFeelJelousy" && (
											<>
												<button className="btn btn-square btn-ghost">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth={1.5}
														stroke="currentColor"
														className="size-6"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
														/>
													</svg>
												</button>
												{!getConnectionStatus() && r._id !== user._id ? (
													<button
														className="btn btn-square btn-ghost"
														onClick={() => SendFriendRequest(r._id)}
													>
														<ConnectionRequest />
													</button>
												) : (
													r._id !== user._id && (
														<span className="py-1">
															<Message />
														</span>
													)
												)}
											</>
										)}
									</li>
								))
							) : (
								<li className="p-4 text-center text-sm opacity-70">
									No users found with this reaction.
								</li>
							)}
						</ul>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
};

export default ImageCard;
