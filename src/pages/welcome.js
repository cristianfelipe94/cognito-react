import React, { Component } from "react";

// Auth is an object that has inside methods.
// signIn, signOut Methods.
import {Auth} from "aws-amplify";

import "../App.css";

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",

			errorMessage: "",
			passwordmatch: false,
			isLooged: {
				logged: this.props.passTo.user,
				user: ""
			}
		};

		this.confirmationMatch = this.confirmationMatch.bind(this);
		this.handleSubmitedInfo = this.handleSubmitedInfo.bind(this);
		this.goToSignUp = this.goToSignUp.bind(this);
	}

	// OnInputInfo:
	// This function will get an event with the keystroke value.
	// Keystroke values will be saved into State.
	onInputInfo = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	// ConfirmationMatch:
	//This function will make tests in the front before sending a request in the Back.
	confirmationMatch() {
		if (this.state.password !== "" && this.state.username !== "") {
			if (this.state.password.length < 6) {
				this.setState({
					errorMessage: 'Por seguridad las contraseñas tienen que ser mayores de 6 caracteres, tener al menos un número, una letra mayúscula y un caracter especial.'
				});
			} else {
				this.setState({
					passwordmatch: true
				});
			}
		} else {
			this.setState({
				errorMessage: "Asegúrese de completar todos los campos."
			});
		}
	}

	// GoToSignUp:
	// This function will load a new page.
	goToSignUp() {
		this.props.history.push('/');
	}	

	// HandleSubmitedInfo:
	// This function will Submit
	handleSubmitedInfo = async event => {
		event.preventDefault();
		if (this.state.passwordmatch) {
			const {username, password} = this.state;
			// console.log("Destructure state: ", username, password);
			Auth.signIn({
				username, password
			}).then((user) => {
				// console.log("Response from Cognito: ", user);
				this.setState({
					errorMessage: "",
					isLooged: {
						logged: true,
						username: user
					}
				}, () => {
					// console.log("Save response into State: ", this.state);
					this.props.passTo.setAppDefaultState(this.state.isLooged);
					localStorage.setItem('UserSession', JSON.stringify(this.state));
					this.props.history.push('/home');
				});
			}).catch(err => {
				// console.log("Response error: ",err.message);
				this.setState({
					errorMessage: err.message
				})
			});
		}
	};

	render() {
		const welcomeTitle = {
			margin: "20px 0",
			fontWeight: "300"
		};

		const confirmationAdvice = {
			margin: "20px 0"
		};

		const accessConfirmedTitle = {
			display: "block"
		};

		const accessDeniedTitle = {
			display: "none"
		};

		const formBlock = {
			display: "flex",
			flexDirection: "row",
			maxWidth: "90%"
		};

		const formInputContainer = {
			border: "none",
			width: "50%",
			display: "inline-block"
		};

		const formSubmitContainer = {
			border: "none",
			width: "50%",
			display: "flex"
		};

		const submitInput = {
			border: "none",
			height: "40px",
			fontSize: "20px",
			color: "white",
			margin: "auto",
			backgroundColor: "#05a697",
			cursor: "pointer"
		};

		const errorMessageContainer = {
			maxWidth: "50%",
			color: "#ef3030",
			fontSize: "16px"
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
					<div>

						<h1 style={welcomeTitle}>
							Hola, ya casi termina el proceso de registro
						</h1>
						<p style={confirmationAdvice}>
							Acabamos de enviarte un correo de confirmación a tu correo
							electrónico.
						</p>
						<div style= {errorMessageContainer}>
							<p>{this.state.errorMessage}</p>
						</div>
						<form onSubmit={this.handleSubmitedInfo} style={formBlock}>
							<div style={formInputContainer}>
								<input
									type="text"
									id="username"
									placeholder="Nombre de usuario"
									value={this.state.username}
									onChange={this.onInputInfo}
									className={"user-input"}
								/>
								<input
									type="password"
									id="password"
									placeholder="Ingresar contraseña"
									value={this.state.password}
									onChange={this.onInputInfo}
									className={"user-input"}
								/>
							</div>
							<div style={formSubmitContainer}>
								<button onClick={this.confirmationMatch} style={submitInput}>
									Ingresar a Atala
								</button>
							</div>
						</form>
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
					<div>
						<h2 style={welcomeTitle}>
							Hola que tal!
						</h2>

						<p style={confirmationAdvice}>
							Te invitamos a abrir tu cuenta.
						</p>

						<div style= {errorMessageContainer}>
							<p>{this.state.errorMessage}</p>
						</div>

						<form onSubmit={this.handleSubmitedInfo} style={formBlock}>
							<div style={formInputContainer}>
								<input
									type="text"
									id="username"
									placeholder="Nombre de usuario"
									value={this.state.username}
									onChange={this.onInputInfo}
									className={"user-input"}
								/>
								<input
									type="password"
									id="password"
									placeholder="Ingresar contraseña"
									value={this.state.password}
									onChange={this.onInputInfo}
									className={"user-input"}
								/>
							</div>
							<div style={formSubmitContainer}>
								<button onClick={this.confirmationMatch} style={submitInput}>
									Ingresar a Atala
								</button>
							</div>
						</form>
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
