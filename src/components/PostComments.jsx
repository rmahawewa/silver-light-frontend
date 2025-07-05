import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const PostComments = ({ postId }) => {
	const [comment, setComment] = useState("");
	const [postComments, setPostComments] = useState([]);
	const [rootComments, setRootComments] = useState([]);
	///////////////////////
	// console.log(postComments);
	// const commentsArr = comments.comments;

	console.log(rootComments);
	//////////////////////////
	useEffect(() => {
		getPostComments();
	}, []);

	useEffect(() => {
		const rComments =
			postComments.length > 0 &&
			postComments.filter((c) => c.parentCommentId === null).map((c) => c._id);
		setRootComments(rComments);
	}, [postComments]);

	const getPostComments = async () => {
		try {
			const res = await axios.get(BASE_URL + "/postcomment/" + postId, {
				withCredentials: true,
			});
			setPostComments(res.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	const saveComment = async (parentCommentId, event) => {
		try {
			if (event.key === "Enter") {
				const res = await axios.post(
					BASE_URL + "/postcomment/save",
					{ postId, parentCommentId, comment },
					{ withCredentials: true }
				);
				console.log(res);
				if (res) {
					getPostComments();
					console.log(postComments);
					setComment("");
				}
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<input
				type="text"
				placeholder="Add a new coment"
				className="input"
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				onKeyUp={(e) => saveComment(0, e)}
			/>
			{/* {postComments && (
				<div className="my-5">
					<PostComments comments={postComments} />
				</div>
			)} */}
			{rootComments.length > 0 ? (
				<>
					<ol>
						{rootComments.map((id) => (
							<CommentTree
								key={id}
								postId={postId}
								commentId={id}
								comments={postComments}
							/>
						))}
					</ol>
				</>
			) : (
				<div>No comments yet</div>
			)}
		</>
	);
};

const CommentTree = ({ postId, commentId, comments }) => {
	const currentComment = comments.find((c) => c._id === commentId);
	const childCommentIds = currentComment.childCommentIds;

	return (
		<li>
			{currentComment.comment}
			{childCommentIds.length > 0 && (
				<ol>
					{childCommentIds.map((childId) => (
						<CommentTree
							key={childId}
							commentId={childId}
							comments={comments}
						/>
					))}
				</ol>
			)}
			<Reply postId={postId} parentId={commentId} />
		</li>
	);
};

const Reply = ({ postId, parentId }) => {
	const [reply, setReply] = useState("");

	const getPostComments = async () => {
		try {
			const res = await axios.get(BASE_URL + "/postcomment/" + postId, {
				withCredentials: true,
			});
			setPostComments(res.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	const saveComment = async (event) => {
		try {
			if (event.key === "Enter") {
				const res = await axios.post(
					BASE_URL + "/postcomment/save",
					{ postId, parentId, reply },
					{ withCredentials: true }
				);
				console.log(res);
				if (res) {
					getPostComments();
					console.log(postComments);
					setReply("");
				}
			}
		} catch (err) {}
	};
	return (
		<p>
			<input
				type="text"
				placeholder="Reply"
				className="input input-sm"
				value={reply}
				onChange={(e) => setReply(e.target.value)}
				onKeyUp={(e) => saveComment(e)}
			/>
		</p>
	);
};

export default PostComments;
