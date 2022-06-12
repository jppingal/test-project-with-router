import { useState, useEffect } from 'react';
import Styles from "../../src/common/Styles";
import { validateEmail } from "../../src/common/helper"
import '../index.css';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const EditUser = (props) => {

	const history = useHistory()

	const [user, setUser] = useState(null);
	const [editFormState, setEditFormState] = useState(false)
	const [name, setName] = useState("");
	const [nameError, SetNameError] = useState("");
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [country, setCountry] = useState("");
	const [gender, setGender] = useState("");
	const [hobbies, setHobbies] = useState([]);
	const [hobbiesError, setHobbiesError] = useState("");
	const [itemToEdit, setItemToEdit] = useState(null);



	let LocArray = window.location.pathname.split('/');
	let id = LocArray[LocArray.length - 1];
	const getUserData = () => {
		fetch(`https://6298b5dade3d7eea3c6e52fb.mockapi.io/api/v1/users/${id}`).then(res => res.json()).then(res => setUser(res));
	}

	useEffect(() => {
		getUserData();
	}, []);


	// const onClickEditButton = (item) => {
	// 	setEditFormState(true)
	// 	setItemToEdit(item);

	// }

	const onClickUpdateButton = () => {
		setEditFormState(true)
		if (name.length < 5) {
			SetNameError("Please input name at least of 5 character!!")
			return;
		} else {
			SetNameError("")
		}
		if (!validateEmail(email)) {
			setEmailError("Please input valid Email")
			return;
		} else {
			setEmailError("")
		}
		let reqBody = {
			id: user.id,
			name: !!name ? name : user.name,
			email: !!email ? email : user.email,
			gender: !!gender ? gender : user.gender,
			country: !!country ? country : user.country,
			hobbies: !!hobbies ? hobbies : user.hobbies
		};
		const requestOptions = {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reqBody)
		};

		fetch(`https://6298b5dade3d7eea3c6e52fb.mockapi.io/api/v1/users/${user.id}`, requestOptions).then(res => {
			console.log("User updated successfully");
		}
		);
		// 👇️ redirect to home Page
		// history.push('/')

	}
	const genderRadioSelectedEdit = (e) => {
		console.log("Here is the event", e)
		setGender(e.target.value)
	}
	const handleOnChangeEdit = (e) => {
		let tempHobbies = hobbies;
		if (e.target.checked) {
			tempHobbies.push(e.target.value);
		} else {
			tempHobbies = hobbies.filter(item => item !== e.target.value)
		}
	}

	return (
		<div className='formContainer'>
			<div className='formContent'>
				<div className='form-title'>
					<h1>Update User Here</h1>
				</div>

				<div className='formInput'>
					<input onChange={e => setName(e.target.value)}
						style={Styles.registerFormInputStyle}
						placeholder={!!user ? user.name : ''}
						defaultValue={!!user ? user.name : ''}

					/>
					{!!nameError && <div style={{ color: 'red' }}>{nameError}</div>}
					<input
						onChange={e => setEmail(e.target.value)}
						style={Styles.registerFormInputStyle}
						placeholder={!!user ? user.email : ''}
						defaultValue={!!user ? user.email : ''}
					/>
					{!!emailError && <div style={{ color: 'red' }}>{emailError}</div>}
				</div>
				<div className='formDownContent'>
					<div >
						<label>Select Your Gender: </label>
						<div onChange={(e) => genderRadioSelectedEdit(e)} style={{ margin: 10 }}>
							{!!user && user.gender === "MALE" ? <input type="radio" checked value="MALE" name="gender" /> : <input type="radio" value="MALE" name="gender" />} Male

							{!!user && user.gender === "FEMALE" ? <input type="radio" checked value="FEMALE" name="gender" /> : <input type="radio" value="FEMALE" name="gender" />} Female
						</div>
					</div>
					<div style={{ marginTop: 10 }}>
						<label>Select Your Country! </label>
						<select defaultValue={!!user && user.country} onChange={e => setCountry(e.target.value)}>

							{!!user && !!user.country === "India" ? <option selected value="India">India</option> : <option value="India">India</option>}
							{!!user && !!user.country === "United State" ? <option selected value="United State">United State</option> : <option value="United State">United State</option>}

							{!!user && !!user.country === "Norway" ? <option selected value="Norway">Norway</option> : <option value="Norway">Norway</option>}
						</select>

					</div>
					<div style={{ marginTop: 10 }}>
						<label>Select Your Hobby :</label>
						<div>

							<input
								type="checkbox"
								id="Reading"
								name="Reading"
								value="Reading"
								onChange={(e) => handleOnChangeEdit(e)}
							/>
							Reading
						</div>
						<div>
							<input
								type="checkbox"
								id="Writing"
								name="Writing"
								value="Writing"
								onChange={(e) => handleOnChangeEdit(e)}
							/>
							Writing
						</div>
						<div>
							<input
								type="checkbox"
								id="Traveling"
								name="Traveling"
								value="Traveling"
								onChange={(e) => handleOnChangeEdit(e)}
							/>
							Traveling
						</div>
					</div>
					{!!hobbiesError && <div style={{ color: 'red' }}>{hobbiesError}</div>}
				</div>
				<button className='form-btn'
					onClick={() => onClickUpdateButton()}>Update
				</button>
				<Link to={"/"} >
					<button className='form-btn-link'>Go To Home</button>
				</Link>
			</div>
		</div>
	);
}
export default EditUser;