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

	const categoriesButtonClick = async (category) => {
		try {
			const res = await axios.post(
				BASE_URL + "/category/allByCategory",
				{ categoryName: category },
				{ withCredentials: true }
			);
		} catch (err) {}
	};

	return (
		<div>
			{categories &&
				categories.map((categ, index) => (
					<li key={index} className="list-row flex align-center justify-center">
						<button className="btn  btn-ghost">
							<div>{categ}</div>
						</button>
					</li>
				))}
		</div>
	);
};

export default Categories;
