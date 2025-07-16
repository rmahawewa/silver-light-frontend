import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

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

	const closeModel = () => {
		const modal = document.getElementById("modal_categories");
		if (modal instanceof HTMLDialogElement) {
			modal.close();
		}
	};

	return (
		<div>
			{categories &&
				categories.map((categ, index) => (
					<li key={index} className="list-row flex align-center justify-center">
						<form method="dialog" className="w-full">
							<Link
								to={"/category-feed/" + categ}
								className="w-full"
								onClick={closeModel}
							>
								<button className="btn btn-ghost w-full" type="submit">
									<div>{categ}</div>
								</button>
							</Link>
						</form>
					</li>
				))}
		</div>
	);
};

export default Categories;
