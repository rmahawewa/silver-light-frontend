import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Connections = () => {
	const [connecs, setConnecs] = useState([]);
	const getConnections = async () => {
		const res = await axios.get(BASE_URL + "/request/connections", {
			withCredentials: true,
		});
		console.log(res.data.connections);
		setConnecs(res.data.connections);
	};

	useEffect(() => {
		try {
			getConnections();
		} catch (err) {
			console.log(err);
		}
	}, []);
	return (
		<div>
			<ul className="list bg-base-100 rounded-box shadow-md">
				<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
					Connections
				</li>
				{connecs.length > 0 ? (
					connecs.map((c) => (
						<li className="list-row" key={c._id}>
							<div>
								<img
									className="size-10 rounded-box"
									src={"https://img.daisyui.com/images/profile/demo/1@94.webp"}
								/>
							</div>
							<div>
								<div>Dio Lupa</div>
								<div className="text-xs uppercase font-semibold opacity-60">
									Remaining Reason
								</div>
							</div>
							<button className="btn btn-square btn-ghost">
								<svg
									className="size-[1.2em]"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
								>
									<g
										strokeLinejoin="round"
										strokeLinecap="round"
										strokeWidth="2"
										fill="none"
										stroke="currentColor"
									>
										<path d="M6 3L20 12 6 21 6 3z"></path>
									</g>
								</svg>
							</button>
							<button className="btn btn-square btn-ghost">
								<svg
									className="size-[1.2em]"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
								>
									<g
										strokeLinejoin="round"
										strokeLinecap="round"
										strokeWidth="2"
										fill="none"
										stroke="currentColor"
									>
										<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
									</g>
								</svg>
							</button>
						</li>
					))
				) : (
					<div>You yet have no any connection</div>
				)}
			</ul>
		</div>
	);
};

export default Connections;
