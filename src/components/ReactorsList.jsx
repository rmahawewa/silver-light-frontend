import React from "react";
import GetConnectionStatus from "./UserFunctions/GetConnectionStatus";
import ConnectionRequest from "./icons/ConnectionRequest";
import Message from "./icons/Message";
import SendFriendRequest from "./UserFunctions/SendFriendRequest";

const ReactorsList = ({
	user,
	reaction,
	reactors,
	userConnections,
	dispatch,
}) => {
	return (
		<>
			<div className="modal-box">
				<ul className="list bg-base-100 rounded-box">
					<li className="p-4 pb-2 text-s opacity-60 tracking-wide">
						<span className="font-bold">{reaction}</span>'s by,
					</li>
				</ul>
				<div className="max-h-96 overflow-y-auto">
					<ul className="list bg-base-100 rounded-box">
						{reactors?.length > 0 ? (
							reactors?.map((r) => (
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
											{!GetConnectionStatus(r._id, userConnections) &&
											r._id !== user._id ? (
												<button
													className="btn btn-square btn-ghost"
													onClick={() => SendFriendRequest(dispatch, r._id)}
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
								No users found with for this reaction.
							</li>
						)}
					</ul>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</>
	);
};

export default ReactorsList;
