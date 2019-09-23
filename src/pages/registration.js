import React, { Component } from "react";

import Form from "../components/Form";

import "../App.css";
import "../index.css"

class Registration extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLooged: this.props.passTo.user,
			formType: "signUp"
		};

		// this.confirmationMatch = this.confirmationMatch.bind(this);
		this.goToLogin = this.goToLogin.bind(this);
	}

	// GoToLogin:
	// This function will take the user to the Register page.
	goToLogin() {
		this.props.history.push("/welcome");
	}

	render() {

		return (
			<div className="app-layout">
				<div>
					<div className="app-layout-titles">
						<h1>Atana</h1>

						<h2>
							Tus ideas deben ser comunicadas.
						</h2>
					</div>
					<Form {...this.props} type={this.state.formType} />
				</div>

				<div>
					<button onClick={this.goToLogin} className="nav-btn">
						Ya soy usuario
					</button>
				</div>
			</div>
		);
	}
}

export default Registration;
