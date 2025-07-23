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

	return <div></div>;
};

export default Chat;
