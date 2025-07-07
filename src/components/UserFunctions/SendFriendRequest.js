const SendFriendRequest = async (receiverId) => {
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

export default SendFriendRequest;
