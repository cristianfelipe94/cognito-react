import React, { Component } from "react";

import Form from "../components/Form";

import "../App.css";

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formType: "forgotPassword",
			isLooged: this.props.passTo.user
		};

		this.goToHome = this.goToHome.bind(this);
	}

	// GoToHome:
	// This function will take the user to the Home page.
	goToHome() {
		this.props.history.push("/home");
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
						<h1 style={{ fontWeight: "300" }}>
							Código de verificación
						</h1>

						<h2 style={{ fontWeight: "300" }}>
							Ingresa tu correo para confirmar la cuenta.
						</h2>
					</div>
					<Form {...this.props} type= {this.state.formType}/>
				</div>

				<div>
					<button onClick={this.goToHome} style={enterHome}>
						Volver al perfil
					</button>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;
