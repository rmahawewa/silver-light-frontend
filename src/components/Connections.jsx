import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnectionFeed } from "../utils/connectionRequestSlice";
import Message from "./icons/Message";
import ActiveMessage from "./icons/ActiveMessage";

const Connections = () => {
	// const [connecs, setConnecs] = useState([]);
	// const dispatch = useDispatch();
	const loggedInUsr = useSelector((store) => store.user)._id;
	console.log(loggedInUsr);
	const connecs = useSelector((store) => store.connectionfeed).filter(
		(c) => c.status === "accepted"
	);
	console.log(connecs);
	// const getConnections = async () => {
	// 	const res = await axios.get(BASE_URL + "/request/user-requests", {
	// 		withCredentials: true,
	// 	});
	// 	console.log(res.data.connections);
	// 	// setConnecs(res.data.connections);
	// 	dispatch(addConnectionFeed(res.data.connections));
	// };

	// useEffect(() => {
	// 	try {
	// 		getConnections();
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }, []);
	return (
		<div>
			<ul className="list bg-base-100 rounded-box shadow-md">
				<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
					Connections
				</li>
				{connecs.length > 0 ? (
					connecs.map((c) => (
						<li className="list-row" key={c._id}>
							{c.fromUserId._id === loggedInUsr ? (
								<ConnectionView conn={c.toUserId} />
							) : (
								<ConnectionView conn={c.fromUserId} />
							)}
						</li>
					))
				) : (
					<div>You yet have no any connection</div>
				)}
			</ul>
		</div>
	);
};

const ConnectionView = ({ conn }) => {
	return (
		<>
			<div>
				<img className="size-10 rounded-box" src={conn.photoUrl} />
			</div>
			<div>
				<div>{conn.userName}</div>
				<div className="text-xs font-semibold opacity-60">
					Since: {conn.updatedAt}
				</div>
			</div>
			<button className="btn btn-square btn-ghost">
				<ActiveMessage />
			</button>
		</>
	);
};

export default Connections;
