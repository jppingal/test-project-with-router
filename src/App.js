import React from "react";
import UserTable from "../src/components/UserTable";
import EditUser from './components/EditUser';
import RegistrationForm from './components/RegistrationForm';
import './index.css';
import { Route, Switch, } from 'react-router-dom';
const App = () => {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={UserTable} />
				<Route path="/register" component={RegistrationForm} />
				<Route path="/update" component={EditUser} />
			</Switch>
		</div>
	);
}
export default App;


