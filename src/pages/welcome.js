import React, { Component } from "react";

import Form from "../components/Form";

import "../App.css";
import "../index.css"

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formType: "signIn",
			isLooged: {
				logged: this.props.passTo.user,
				user: ""
			}
		};

		this.goToSignUp = this.goToSignUp.bind(this);
	}

	// GoToSignUp:
	// This function will load a new page.
	goToSignUp() {
		this.props.history.push('/');
	}

	render() {

		// Check if user is looged.
		// True or Something: Will render a page in which the user has started a Registration process.
		// Null: Will render a page in which the user is new with no registration process and user info.
		if (this.state.isLooged.logged !== null) {
			return (
				<div className="app-layout">
					<div className="app-layout-titles">

						<h1>
							Hola, ya casi termina el proceso de registro
						</h1>
						<p>
							Acabamos de enviarte un correo de confirmación a tu correo
							electrónico.
						</p>

						<Form {...this.props} type= {this.state.formType}/>
					</div>
					
					<div>
						<button onClick= {this.goToSignUp} className="nav-btn">
							Ir al Registro
						</button>
					</div>
				</div>
				);
		} else {
			return (
				<div className="app-layout">
					<div className="app-layout-titles">
						<h2>
							Ingreso
						</h2>

						<p>
							Te invitamos a abrir tu perfil.
						</p>
						<Form {...this.props} type= {this.state.formType}/>
					</div>
					<div>
						<button onClick= {this.goToSignUp} className="nav-btn">
							Ir al Registro
						</button>
					</div>
				</div>
			);
		}
	}
}

export default Welcome;
