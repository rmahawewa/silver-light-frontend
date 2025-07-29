import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Profile = () => {
	const [isEditable, setIsEditable] = useState(true);
	const user = useSelector((store) => store.user);
	//user input fields
	const [firstName, setFirstName] = useState(
		user.firstName ? user.firstName : ""
	);
	const [lastName, setLastName] = useState(user.lastName ? user.lastName : "");
	const [userName, setUserName] = useState(user.userName ? user.userName : "");
	const [birthday, setBirthday] = useState(user.birthday ? user.birthday : "");
	const [email, setEmail] = useState(user.email ? user.email : "");
	const [gender, setGender] = useState(user.gender ? user.gender : "");
	const [photoUrl, setPhotoUrl] = useState(user.photoUrl ? user.photoUrl : "");
	const [country, setCountry] = useState(user.country ? user.country : "");
	const [reagion, setReagion] = useState(user.reagion ? user.reagion : "");
	const [about, setAbout] = useState(user.about ? user.about : "");

	const dispatch = useDispatch();

	const handleFileChange = () => {
		setPhotoUrl(event.target.files[0]);
	};

	const saveDetails = async () => {
		try {
			const res = await axios.patch(
				BASE_URL + "/update",
				{
					firstName,
					lastName,
					userName,
					birthday,
					email,
					gender,
					photoUrl,
					country,
					reagion,
					about,
				},
				{ withCredentials: true }
			);
			console.log(res.data.data);
			if (res.data.data) {
				//dispatch the user store
				dispatch(addUser(res.data.data));
				//view message

				setIsEditable(false);
			}
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="flex justify-center">
			<fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
				<legend className="fieldset-legend">
					{isEditable ? "Edit Page details" : "Page details"}
				</legend>

				{isEditable ? (
					<>
						<>
							<label className="label">First name</label>
							<input
								type="text"
								className="input"
								placeholder="First name"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>

							<label className="label">Last name</label>
							<input
								type="text"
								className="input"
								placeholder="Last name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>

							<label className="label">User name</label>
							<input
								type="text"
								className="input"
								placeholder="User name"
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>

							<label className="label">Photo url</label>
							<input
								type="file"
								accept="image/*"
								className="input"
								placeholder="Photo url"
								onChange={handleFileChange}
							/>

							<label className="label">Birthday</label>
							<input
								type="date"
								className="input"
								placeholder="Birthday"
								value={birthday}
								onChange={(e) => setBirthday(e.target.value)}
							/>

							<label className="label">Email</label>
							<input
								type="text"
								className="input"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<label className="label">Gender</label>
							<input
								type="text"
								className="input"
								placeholder="Gender"
								value={gender}
								onChange={(e) => setGender(e.target.value)}
							/>

							<label className="label">Country</label>
							<input
								type="text"
								className="input"
								placeholder="Country"
								value={country}
								onChange={(e) => setCountry(e.target.value)}
							/>

							<label className="label">Reagion</label>
							<input
								type="text"
								className="input"
								placeholder="Reagion"
								value={reagion}
								onChange={(e) => setReagion(e.target.value)}
							/>

							<label className="label">About</label>
							<input
								type="text"
								className="input"
								placeholder="About"
								value={about}
								onChange={(e) => setAbout(e.target.value)}
							/>

							<button
								className="btn btn-neutral mt-4"
								onClick={() => saveDetails()}
							>
								Save
							</button>
						</>
						<>
							<div>
								<img></img>
							</div>
						</>
					</>
				) : (
					<>
						<label className="label">First name</label>
						<label>{firstName}</label>

						<label className="label">Last name</label>
						<label>{lastName}</label>

						<label className="label">User name</label>
						<label>{userName}</label>

						<label className="label">Birthday</label>
						<label>{birthday}</label>

						<label className="label">Email</label>
						<label>{email}</label>

						<label className="label">Gender</label>
						<label>{gender}</label>

						<label className="label">Photo url</label>
						<label>{photoUrl}</label>

						<label className="label">Country</label>
						<label>{country}</label>

						<label className="label">Reagion</label>
						<label>{reagion}</label>

						<label className="label">About</label>
						<label>{about}</label>

						<button
							className="btn btn-neutral mt-4"
							onClick={() => setIsEditable(true)}
						>
							Edit
						</button>
					</>
				)}
			</fieldset>
		</div>
	);
};

export default Profile;
