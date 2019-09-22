import React, { Component } from "react";

// Auth is an object that has inside methods.
// signIn, signOut Methods.
import { Auth } from "aws-amplify";

import "../App.css";

class ForgotPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
            errorMessage: "",
            validated: false,
			isLooged: this.props.passTo.user
		};

		this.confirmationMatch = this.confirmationMatch.bind(this);
        this.goToHome = this.goToHome.bind(this);
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
		if (this.state.email !== "") {
			this.setState({
                validated: true
            });
		} else {
			this.setState({
				errorMessage: "Asegúrese de completar todos los campos."
			});
		}
	}

	// HandleSubmitedInfo:
	// This function will Submit a Amplify process
	handleSubmitedInfo = async event => {
		event.preventDefault();

		if (this.state.validated) {
			// Use destructure to get values from state.
			const { email} = this.state;

			// Auth.forgotPassword:
			// This is a method inside Auth that takes one value (email).
			Auth.forgotPassword(email)
				.then((data) => {
					this.props.history.push("/verificationcode");
				})
				.catch((err) => {
					// console.log("Cognito error: ", err);
					this.setState({
						errorMessage: err.message
					});
				});
		}
	};

	// GoToHome:
	// This function will take the user to the Home page.
	goToHome() {
		this.props.history.push("/home");
	}

	render() {
		const formBlock = {
			display: "flex",
			flexDirection: "column",
			maxWidth: "90%"
		};

		const formInputContainer = {
			border: "none",
			width: "50%",
			display: "inline-block",
			padding: "30px 0 15px"
		};

		const formSubmitContainer = {
			border: "none",
			width: "50%",
			display: "flex"
		};

		const submitInput = {
			border: "none",
			height: "40px",
			fontSize: "18px",
			color: "#3b3b3b",
			margin: "auto",
			backgroundColor: "#05a697",
			cursor: "pointer",
			fontFamily: "Roboto",
			width: "max-content",
			padding: "10px"
		};

		const appTitles = {
			maxWidth: "80%"
		};

		const errorMessageContainer = {
			maxWidth: "50%",
			color: "#ef3030",
			fontSize: "16px"
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
						<h1 style={{ fontWeight: "300" }}>Código de verificación</h1>

						<h2 style={{ fontWeight: "300" }}>
							Ingresa tu correo para confirmar la cuenta.
						</h2>
					</div>

					<div style={errorMessageContainer}>
						<p>{this.state.errorMessage}</p>
					</div>

					<form onSubmit={this.handleSubmitedInfo} style={formBlock}>
						<div style={formInputContainer}>
							<label htmlFor="email">Ingrese su correo</label>
							<input
								type="text"
								id="email"
								placeholder="atana-@-ejemplo.com"
								value={this.state.email}
								onChange={this.onInputInfo}
								className={"user-input"}
							/>
						</div>

						<div style={formSubmitContainer}>
							<button onClick={this.confirmationMatch} style={submitInput}>
								Generar código
							</button>
						</div>
					</form>
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
