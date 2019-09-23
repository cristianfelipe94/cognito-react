import React, { Component } from "react";

import Form from "../components/Form";

import "../App.css";

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

		const welcomeTitle = {
			margin: "20px 0",
			fontWeight: "300"
		};

		const layoutBlock = {
			width: '80%'
		}

		const confirmationAdvice = {
			margin: "20px 0"
		};

		const enterWelcome = {
			border: 'none',
			fontSize: '16px',
			color: 'white',
			margin: 'auto',
			padding: '10px',
			backgroundColor: 'rgb(59, 59, 59)',
			fontFamily: 'Roboto',
			width: 'max-content',
			cursor: 'pointer'
		}

		// Check if user is looged.
		// True or Something: Will render a page in which the user has started a Registration process.
		// Null: Will render a page in which the user is new with no registration process and user info.
		if (this.state.isLooged.logged !== null) {
			return (
				<div className="app-layout">
					<div style= {layoutBlock}>

						<h1 style={welcomeTitle}>
							Hola, ya casi termina el proceso de registro
						</h1>
						<p style={confirmationAdvice}>
							Acabamos de enviarte un correo de confirmación a tu correo
							electrónico.
						</p>

						<Form {...this.props} type= {this.state.formType}/>
					</div>
					
					<div>
						<button onClick= {this.goToSignUp} style= {enterWelcome}>
							Ir al Registro
						</button>
					</div>
				</div>
				);
		} else {
			return (
				<div className="app-layout">
					<div style= {layoutBlock}>
						<h2 style={welcomeTitle}>
							Ingreso
						</h2>

						<p style={confirmationAdvice}>
							Te invitamos a abrir tu perfil.
						</p>
						<Form {...this.props} type= {this.state.formType}/>
					</div>
					<div>
						<button onClick= {this.goToSignUp} style= {enterWelcome}>
							Ir al Registro
						</button>
					</div>
				</div>
			);
		}
	}
}

export default Welcome;
