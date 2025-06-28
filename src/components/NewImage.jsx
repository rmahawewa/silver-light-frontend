import React from "react";

const NewImage = () => {
	return (
		<div className="flex justify-center py-12">
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
				<legend className="fieldset-legend">Add new image</legend>
				<label className="label">Image</label>
				<input type="file" className="input" />
				<label className="label">Title</label>
				<input
					type="text"
					className="input"
					placeholder="Beautifully branched tree"
				/>

				<label className="label">Category</label>
				<div className="join ">
					{/* <div> */}
					{/* <label className="input validator join-item"> */}
					<input
						type="text"
						className="input rounded-box"
						placeholder="nature"
					/>
					{/* </label> */}
					<div className="validator-hint hidden">Enter valid category</div>
					{/* </div> */}
					<button className="btn btn-success">Join</button>
				</div>

				<label className="label">Description</label>
				<textarea
					className="textarea"
					placeholder="The artistic nature of branching is amaizing"
				></textarea>
			</fieldset>
		</div>
	);
};

export default NewImage;
