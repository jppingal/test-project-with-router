import React, { useState, useEffect } from "react";
import Styles from "../common/Styles";
import '../index.css';
import { Link } from 'react-router-dom';

const UserTable = () => {
	const [users, setUsers] = useState([])
	const getUsers = () => {
		fetch("https://6298b5dade3d7eea3c6e52fb.mockapi.io/api/v1/users").then(res => res.json()).then(res => setUsers(res));
	}

	const onClickDeleteButton = (item) => {
		fetch(`https://6298b5dade3d7eea3c6e52fb.mockapi.io/api/v1/users/${item.id}`, { method: 'DELETE' }).then(res => res.json()).then(res => getUsers());

	}
	useEffect(() => {
		getUsers();
	}, []);
	return (
		<div className='table-container'>
			<header className='header-container'>
				<h1 >Users</h1>
				<Link to="/register">
					<button
						style={Styles.registerButton}
					>
						Register User
					</button>
				</Link>
			</header>
			<div className="table-data">
				<table>
					<thead>
						<tr>
							<th>Id</th>
							<th>Name</th>
							<th>Email-Id</th>
							<th>Gender</th>
							<th>hobbies</th>
							<th>Country</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody>
						{users.map(item => {
							return (
								<tr key={item.id}>
									<td>{item.id}</td>
									<td>{item.name}</td>
									<td>{item.email}</td>
									<td>{item.gender}</td>
									<td>{item.hobbies}</td>
									<td>{item.country}</td>
									<td>
										<Link to={`/update/${item.id}`}>
											<button
												style={{ ...Styles.buttonStyle, background: 'green' }}
											>
												Edit
											</button>
										</Link>

									</td>
									<td className="td-btn">
										<button
											style={{ ...Styles.buttonStyle, background: 'red' }}
											onClick={() => onClickDeleteButton(item)}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default UserTable;