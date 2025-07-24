import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
	const { targetUserId, targetUserName } = useParams();

	const user = useSelector((store) => store.user);
	const [newMessage, setNewMessage] = useState("");
	const userId = user?._id;
	const [messages, setMessages] = useState([]);

	const fetchChatMessages = async () => {
		try {
			const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
				withCredentials: true,
			});
			console.log(chat);
			const chatMessages = chat?.data?.messages.map((msg) => {
				const { createdAt, senderId, text } = msg;
				return {
					senderId: senderId?._id,
					firstName: senderId?.firstName,
					lastName: senderId?.lastName,
					userName: senderId?.userName,
					text,
					createdAt,
				};
			});
			setMessages(chatMessages);
			console.log(messages);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchChatMessages();
	}, []);

	return <div></div>;
};

export default Chat;
