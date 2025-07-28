import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
	const [isEditable, setIsEditable] = useState(true);
	const user = useSelector((store) => store.user);
	//user input fields
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [userName, setUserName] = useState(user.userName);
	const [birthday, setBirthday] = useState(user.birthday);
	const [email, setEmail] = useState(user.email);
	const [gender, setGender] = useState(user.gender);
	const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
	const [country, setCountry] = useState(user.country);
	const [reagion, setReagion] = useState(user.reagion);
	const [about, setAbout] = useState(user.about);

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
			console.log(res);
			if (res.data.data) {
				//dispatch the user store
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
						<label className="label">First name</label>
						<input
							type="text"
							className="input"
							placeholder="First name"
							value={firstName}
							onChange={(e) => onChange(setFirstName(e.target.value))}
						/>

						<label className="label">Last name</label>
						<input
							type="text"
							className="input"
							placeholder="Last name"
							value={lastName}
							onChange={(e) => onChange(setLastName(e.target.value))}
						/>

						<label className="label">User name</label>
						<input
							type="text"
							className="input"
							placeholder="User name"
							value={userName}
							onChange={(e) => onChange(setUserName(e.target.value))}
						/>

						<label className="label">Birthday</label>
						<input
							type="text"
							className="input"
							placeholder="Birthday"
							value={birthday}
							onChange={(e) => onChange(setBirthday(e.target.value))}
						/>

						<label className="label">Email</label>
						<input
							type="text"
							className="input"
							placeholder="Email"
							value={email}
							onChange={(e) => onChange(setEmail(e.target.value))}
						/>

						<label className="label">Gender</label>
						<input
							type="text"
							className="input"
							placeholder="Gender"
							value={gender}
							onChange={(e) => onChange(setGender(e.target.value))}
						/>

						<label className="label">Photo url</label>
						<input
							type="text"
							className="input"
							placeholder="Photo url"
							value={photoUrl}
							onChange={(e) => onChange(setPhotoUrl(e.target.value))}
						/>

						<label className="label">Country</label>
						<input
							type="text"
							className="input"
							placeholder="Country"
							value={country}
							onChange={(e) => onChange(setCountry(e.target.value))}
						/>

						<label className="label">Reagion</label>
						<input
							type="text"
							className="input"
							placeholder="Reagion"
							value={reagion}
							onChange={(e) => onChange(setReagion(e.target.value))}
						/>

						<label className="label">About</label>
						<input
							type="text"
							className="input"
							placeholder="About"
							value={about}
							onChange={(e) => onChange(setAbout(e.target.value))}
						/>

						<button
							className="btn btn-neutral mt-4"
							onClick={() => saveDetails()}
						>
							Save
						</button>
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
