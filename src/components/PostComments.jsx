import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const PostComments = ({ postId }) => {
	const [comment, setComment] = useState("");
	const [postComments, setPostComments] = useState([]);
	const [rootComments, setRootComments] = useState([]);

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
				if (res) {
					getPostComments();
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

			{rootComments.length > 0 ? (
				<>
					<ol>
						{rootComments.map((id) => (
							<CommentTree
								key={id}
								postId={postId}
								commentId={id}
								comments={postComments}
								findPostComments={getPostComments}
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

const CommentTree = ({ postId, commentId, comments, findPostComments }) => {
	const currentComment = comments.find((c) => c._id === commentId);
	const childCommentIds = currentComment.childCommentIds;
	const [replyId, setReplyId] = useState("");

	const handleReplyId = (id) => {
		setReplyId(id);
	};

	return (
		<li>
			{currentComment.comment + " "}
			<span
				className="cursor-pointer"
				onClick={() => handleReplyId(currentComment._id)}
			>
				Reply
			</span>
			{replyId === currentComment._id && (
				<div>
					<Reply
						postId={postId}
						parentId={commentId}
						changeReplyId={handleReplyId}
						findPostComments={findPostComments}
					/>
				</div>
			)}

			{childCommentIds.length > 0 && (
				<ol>
					{childCommentIds.map((childId) => (
						<CommentTree
							key={childId}
							postId={postId}
							commentId={childId}
							comments={comments}
							findPostComments={findPostComments}
						/>
					))}
				</ol>
			)}
		</li>
	);
};

const Reply = ({ postId, parentId, changeReplyId, findPostComments }) => {
	const [reply, setReply] = useState("");

	const saveComment = async (event) => {
		try {
			if (event.key === "Enter") {
				const res = await axios.post(
					BASE_URL + "/postcomment/save",
					{ postId, parentCommentId: parentId, comment: reply },
					{ withCredentials: true }
				);
				if (res) {
					findPostComments();
					setReply("");
					changeReplyId("");
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
