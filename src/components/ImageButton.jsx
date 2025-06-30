import React, { use, useEffect, useState } from "react";

const ImageButton = ({ image, handleImageButtonClick }) => {
	// const [isClicked, setIsClicked] = useState(false);
	// const imageButtonClick = () => {
	// 	setIsClicked((value) => !value);
	// 	// console.log("test");
	// 	// console.log(isClicked);
	// };
	return (
		<div>
			<button>
				<img src={image.url} alt={image.photoTitle} />
			</button>
		</div>
	);
};

export default ImageButton;
