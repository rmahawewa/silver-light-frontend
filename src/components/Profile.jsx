import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
	const [isEditable, setIsEditable] = useState(true);
	const user = useSelector((store) => store.user);
	//user input fields
	const [firstName, setFirstName] = useState(user.firstName);
	const [lastName, setLastName] = useState(user.lastName);
	const [userName, setUserName] = useState(user.userName);
	const [birthday, setBirthday] = useState(user.birthday);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState(user.password);
	const [gender, setGender] = useState(user.gender);
	const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
	const [country, setCountry] = useState(user.country);
	const [reagion, setReagion] = useState(user.reagion);
	const [about, setAbout] = useState(user.about);

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

						<label className="label">Password</label>
						<input
							type="text"
							className="input"
							placeholder="Password"
							value={password}
							onChange={(e) => onChange(setPassword(e.target.value))}
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

						<button className="btn btn-neutral mt-4">Save</button>
					</>
				) : (
					<>
						<label className="label">First name</label>
						<input type="text" className="input" placeholder="First name" />

						<label className="label">Last name</label>
						<input type="text" className="input" placeholder="Last name" />

						<label className="label">User name</label>
						<input type="text" className="input" placeholder="User name" />

						<label className="label">Birthday</label>
						<input type="text" className="input" placeholder="Birthday" />

						<label className="label">Email</label>
						<input type="text" className="input" placeholder="Email" />

						<label className="label">Password</label>
						<input type="text" className="input" placeholder="Password" />

						<label className="label">Gender</label>
						<input type="text" className="input" placeholder="Gender" />

						<label className="label">Photo url</label>
						<input type="text" className="input" placeholder="Photo url" />

						<label className="label">Country</label>
						<input type="text" className="input" placeholder="Country" />

						<label className="label">Reagion</label>
						<input type="text" className="input" placeholder="Reagion" />

						<label className="label">About</label>
						<input type="text" className="input" placeholder="About" />
					</>
				)}
			</fieldset>
		</div>
	);
};

export default Profile;
