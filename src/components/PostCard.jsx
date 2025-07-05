import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { savepostreaction } from "../utils/postSlice";
import { addNewConnectionRequest } from "../utils/connectionRequestSlice";
import PostComments from "./PostComments";

const PostCard = ({ postId }) => {
	const user = useSelector((store) => store.user);
	const [reaction, setReaction] = useState("");
	const [reactors, setReactors] = useState([]);
	// const [comment, setComment] = useState("");
	// const [postComments, setPostComments] = useState([]);
	const dispatch = useDispatch();
	const post = useSelector((store) =>
		store.postfeed.find((pt) => pt._id === postId)
	);
	const userConnections = useSelector((store) => store.connectionfeed);
	const modalId = `reactions_modal_${postId}`;

	useEffect(() => {
		// console.log(`ImageCard for Image ID: ${imageId}`);
		// console.log("Image object from Redux:", image);
		if (post && !post.post_reactions) {
			console.warn(`Post ID ${postId} is missing 'post_reactions' array!`);
		} else if (
			post &&
			post.post_reactions &&
			post.post_reactions.length === 0
		) {
			console.log(`Post ID ${postId} has an empty 'post_reactions' array.`);
		}
		// console.log(userConnections);
		console.log(
			userConnections.length > 0 &&
				userConnections.find(
					(r) => r.fromUserId === user._id || r.toUserId === user._id
				).status
		);
		console.log(post);
	}, [post, postId, userConnections]);

	const findSimilarReactionCount = (type) => {
		const result = post.post_reactions.filter((r) => r.reactionType === type);
		return result.length;
		// console.log(image);
		// console.log(reaction);
		// setReactionCount(result.length);
	};

	useEffect(() => {
		if (post && user?._id) {
			// console.log(image);
			const userReaction = post?.post_reactions?.find(
				(r) => r.reactedById === user._id
			);
			if (userReaction) {
				setReaction(userReaction.reactionType);
			}
		}
		// findSimilarReactionCount();
	}, [post, user]);

	const saveReaction = async (r) => {
		try {
			if (reaction === r) {
				r = "undo";
				setReaction("");
			} else {
				setReaction(r);
			}
			const res = await axios.post(
				BASE_URL + "/postreaction/save",
				{ postId: postId, reaction: r },
				{ withCredentials: true }
			);
			console.log(res);
			dispatch(savepostreaction(res.data.data));
			// findSimilarReactionCount();
		} catch (err) {
			console.error(err);
		}
	};

	const getSimillarReactionsForTheImage = async (r) => {
		const reactionArray = [];

		if (!post || !post.post_reactions) {
			console.warn(
				`Cannot get similar reactions for image ID ${postId}: image or reactions data is missing.`
			);
			setReactors([]); // Ensure reactors is empty if data is not available
			document.getElementById("my_modal_2").showModal(); // Show modal with "No users found"
			return; // Exit early
		}

		post.post_reactions.forEach((reaction) => {
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

	const sendFriendRequest = async (receiverId) => {
		try {
			const responce = await axios.post(
				BASE_URL + "/request/send",
				{ toUserId: receiverId },
				{ withCredentials: true }
			);
			console.log(responce);
			dispatch(addNewConnectionRequest(responce.data.data));
		} catch (err) {}
	};

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
				{post && post.photos && (
					<figure>
						<div className="carousel w-full">
							{post.photos.map((p, index) => (
								<div
									key={p._id}
									id={"slide" + (index + 1)}
									className="carousel-item relative w-full"
								>
									<img
										key={p._id}
										src={p.url}
										className="w-full"
										alt={p.photoTitle}
									/>
									{post.photos.length > 1 && (
										<div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
											<a
												href={
													index === 0
														? "#slide" + post.photos.length
														: "#slide" + index
												}
												className="btn btn-circle"
											>
												❮
											</a>
											<a
												href={
													index === post.photos.length - 1
														? "#slide1"
														: "#slide" + Number(index + 2)
												}
												className="btn btn-circle"
											>
												❯
											</a>
										</div>
									)}
								</div>
							))}
						</div>
					</figure>
				)}

				<div className="card-body">
					<h2 className="card-title">{post.title}</h2>
					<p>{post.description}</p>
					<p>
						{post.category.map((c, i) => (
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="size-5"
							>
								<path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z" />
							</svg>
							Like
						</button>
						<button
							onClick={() => saveReaction("familier")}
							className={
								reaction === "familier"
									? "btn btn-secondary"
									: "btn btn-primary"
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="size-5"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.536-4.464a.75.75 0 1 0-1.061-1.061 3.5 3.5 0 0 1-4.95 0 .75.75 0 0 0-1.06 1.06 5 5 0 0 0 7.07 0ZM9 8.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S7.448 7 8 7s1 .672 1 1.5Zm3 1.5c.552 0 1-.672 1-1.5S12.552 7 12 7s-1 .672-1 1.5.448 1.5 1 1.5Z"
									clipRule="evenodd"
								/>
							</svg>
							Familier
						</button>
						<button
							onClick={() => saveReaction("love")}
							className={
								reaction === "love" ? "btn btn-secondary" : "btn btn-primary"
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="size-5"
							>
								<path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
							</svg>
							Love
						</button>
						<button
							onClick={() => saveReaction("aTrue")}
							className={
								reaction === "aTrue" ? "btn btn-secondary" : "btn btn-primary"
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="size-5"
							>
								<path
									fillRule="evenodd"
									d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
									clipRule="evenodd"
								/>
							</svg>
							True
						</button>
						<button
							onClick={() => saveReaction("wonderful")}
							className={
								reaction === "wonderful"
									? "btn btn-secondary"
									: "btn btn-primary"
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="size-5"
							>
								<path d="M15.98 1.804a1 1 0 0 0-1.96 0l-.24 1.192a1 1 0 0 1-.784.785l-1.192.238a1 1 0 0 0 0 1.962l1.192.238a1 1 0 0 1 .785.785l.238 1.192a1 1 0 0 0 1.962 0l.238-1.192a1 1 0 0 1 .785-.785l1.192-.238a1 1 0 0 0 0-1.962l-1.192-.238a1 1 0 0 1-.785-.785l-.238-1.192ZM6.949 5.684a1 1 0 0 0-1.898 0l-.683 2.051a1 1 0 0 1-.633.633l-2.051.683a1 1 0 0 0 0 1.898l2.051.684a1 1 0 0 1 .633.632l.683 2.051a1 1 0 0 0 1.898 0l.683-2.051a1 1 0 0 1 .633-.633l2.051-.683a1 1 0 0 0 0-1.898l-2.051-.683a1 1 0 0 1-.633-.633L6.95 5.684ZM13.949 13.684a1 1 0 0 0-1.898 0l-.184.551a1 1 0 0 1-.632.633l-.551.183a1 1 0 0 0 0 1.898l.551.183a1 1 0 0 1 .633.633l.183.551a1 1 0 0 0 1.898 0l.184-.551a1 1 0 0 1 .632-.633l.551-.183a1 1 0 0 0 0-1.898l-.551-.184a1 1 0 0 1-.633-.632l-.183-.551Z" />
							</svg>
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
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="size-5"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM6.75 9.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z"
									clipRule="evenodd"
								/>
							</svg>
							I feel jelousy
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
					<div className="postComments my-5">
						<PostComments postId={postId} />
					</div>
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
														onClick={() => sendFriendRequest(r._id)}
													>
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
																d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
															/>
														</svg>
													</button>
												) : (
													r._id !== user._id && (
														<span className="py-1">
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
																	d="M5 12h14"
																/>
															</svg>
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

export default PostCard;
