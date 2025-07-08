import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const getAllCategories = async () => {
		try {
			const res = await axios.get(BASE_URL + "/allCategories", {
				withCredentials: true,
			});
			console.log(res.data.categories);
			setCategories(res.data.categories);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		getAllCategories();
	}, []);

	return (
		<div>
			<ul className="list bg-base-100 rounded-box shadow-md">
				<li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
					Most played songs this week
				</li>
				{categories &&
					categories.map((categ, index) => (
						<li key={index} className="list-row">
							<button className="btn  btn-ghost">
								<div>{categ}</div>
							</button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default Categories;
