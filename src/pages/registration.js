import React, { Component } from "react";

import Form from "../components/Form";

import "../App.css";

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
		const appTitles = {
			maxWidth: "80%"
		};

		const enterHome = {
			border: "none",
			fontSize: "16px",
			color: "white",
			margin: "auto",
			padding: "10px",
			backgroundColor: "rgb(59, 59, 59)",
			fontFamily: "Roboto",
			width: "max-content",
			cursor: "pointer"
		};

		return (
			<div className="app-layout">
				<div>
					<div style={appTitles}>
						<h1 style={{ fontWeight: "300" }}>Atana</h1>

						<h2 style={{ fontWeight: "300" }}>
							Tus ideas deben ser comunicadas.
						</h2>
					</div>
					<Form {...this.props} type={this.state.formType} />
				</div>

				<div>
					<button onClick={this.goToLogin} style={enterHome}>
						Ya soy usuario
					</button>
				</div>
			</div>
		);
	}
}

export default Registration;
