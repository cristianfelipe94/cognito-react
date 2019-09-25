import React, { Component } from "react";

import Form from "../components/Form";

import "../App.css";
import "../index.css"

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
		this.props.history.push("/");
	}

	render() {

		return (
			<div className="app-layout">
				<div>
					<div className="app-layout-titles">
						<h1>
							Código de verificación
						</h1>

						<h2>
							Ingresa tu correo para confirmar la cuenta.
						</h2>
					</div>
					<Form {...this.props} type= {this.state.formType}/>
				</div>

				<div>
					<button onClick={this.goToHome} className="nav-btn">
						Volver al perfil
					</button>
				</div>
			</div>
		);
	}
}

export default ForgotPassword;
