import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
	const user = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
			dispatch(removeUser());
			return navigate("/login");
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<>
			<div className="navbar bg-base-100 shadow-sm">
				<div className="flex-1">
					<Link to="/" className="btn btn-ghost text-xl">
						miraculous
					</Link>
				</div>
				{user && (
					<div className="hidden flex-none lg:block">
						<ul className="menu menu-horizontal">
							{/* Navbar menu content here */}

							<li>
								<a>Categories</a>
							</li>
						</ul>

						<button className="btn btn-ghost btn-circle">
							<div className="indicator">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									{" "}
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
									/>{" "}
								</svg>
								<span className="badge badge-xs badge-primary indicator-item"></span>
							</div>
						</button>
						{/* </div> */}

						<div className="dropdown dropdown-end mx-5">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									<img
										alt="Tailwind CSS Navbar component"
										src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									/>
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
							>
								<li>
									<Link to="/connections" className="justify-between">
										Connections<span className="badge">New {5}</span>
									</Link>
								</li>
								<li>
									<Link to="/conn-requests">Conn requests</Link>
								</li>
								<li>
									<Link to="/settings">Settings</Link>
								</li>
								<li>
									<a>Logout</a>
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default NavBar;
