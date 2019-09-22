import React, { Component } from "react";

// Auth is an object that has inside methods.
// signIn, signOut Methods.
import { Auth } from "aws-amplify";

import "../App.css";

class VerificationCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			verificationCode: "",
			newPassword: "",
			passedValidation: false,
			errorMessage: ""
		};

		this.confirmationMatch = this.confirmationMatch.bind(this);
		this.handleChangePass = this.handleChangePass.bind(this);
		this.goToHome = this.goToHome.bind(this);
		// this.getStorage = this.getStorage.bind(this);
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
		if (this.state.newPassword !== "" && this.state.confirmedPassword !== "") {
			if (
				this.state.newPassword.length < 6 &&
				this.state.confirmedPassword < 6
			) {
				this.setState({
					errorMessage:
						"Por seguridad las contraseñas tienen que ser mayores de 6 caracteres, tener al menos un número, una letra mayúscula y un caracter especial."
				});
			} else if (this.state.newPassword !== this.state.confirmedPassword) {
				this.setState({
					errorMessage: "Asegurese de confirmar la nueva contraseña."
				});
			} else {
				// console.log("Passed validation: ",this.state.email," ",this.state.newPassword," ",this.state.confirmedPassword);
				this.setState({
					passedValidation: true
				});
			}
		} else {
			this.setState({
				errorMessage: "Asegúrese de completar todos los campos."
			});
		}
	}

	// Utility function.
	// getStorage() {
	//     console.log(this.state);
	// }

	// HandleChangePass:
	// This function will Submit
	handleChangePass = async event => {
		event.preventDefault();
		// console.log("Password request in Cognito");
		if (this.state.passedValidation) {
            const {email, verificationCode, newPassword} = this.state;
            // console.log("Destructure state: ", email, verificationCode, newPassword);

			// Auth.forgotPasswordSubmit:
			// This is a method inside Auth, that takes Email, VerificationCode and NewPassword.
			Auth.forgotPasswordSubmit(
				email,
				verificationCode,
				newPassword
			).then(() => {
                // After new password is created the session will be removed and user has to log in the Welcome page.
                this.props.passTo.setAppDefaultState(null);
                localStorage.removeItem("UserSession");
                this.props.history.push("/welcome");
            }).catch(err => {
                console.log("Not able to submit password: ", err);
            });
		}
	};

	// GoToHome:
	// This function will take the user to the Home page.
	goToHome() {
		this.props.history.push("/home");
	}

	render() {
		const formSubmitContainer = {
			border: "none",
			width: "50%",
			display: "flex"
		};

		const layoutBlock = {
			width: "70%"
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

		const formBlock = {
			display: "flex",
			flexDirection: "column",
			maxWidth: "90%"
		};

		const formInputContainer = {
			border: "none",
			width: "50%",
			display: "inline-block"
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
				<div style={layoutBlock}>
					<h1>Ingresa la información para completar el proceso.</h1>
					<div style={errorMessageContainer}>
						<p>{this.state.errorMessage}</p>
					</div>

					<form onSubmit={this.handleChangePass} style={formBlock}>
						<div style={formInputContainer}>
							<label htmlFor="email">
                                Ingrese su correo electrónico
                            </label>
							<input
								type="text"
								id="email"
								placeholder="Correo electrónico"
								value={this.state.email}
								onChange={this.onInputInfo}
								className={"user-input"}
							/>

							<label htmlFor="verificationCode">
								Ingrese su código de confirmación, que se encuentra en su correo
								electrónico.
                            </label>
							<input
								type="number"
								id="verificationCode"
								placeholder="Código de confirmación "
								value={this.state.verificationCode}
								onChange={this.onInputInfo}
								className={"user-input"}
							/>

							<label htmlFor="newPassword">
                                Ingrese su nueva contraseña
                            </label>
							<input
								type="password"
								id="newPassword"
								placeholder="Nueva contraseña"
								value={this.state.newPassword}
								onChange={this.onInputInfo}
								className={"user-input"}
							/>

							<label htmlFor="confirmedPassword">
								Vuelva a ingresar su nueva contraseña
							</label>
							<input
								type="password"
								id="confirmedPassword"
								placeholder="Confirmar nueva contraseña"
								value={this.state.confirmedPassword}
								onChange={this.onInputInfo}
								className={"user-input"}
							/>
						</div>

						<div style={formSubmitContainer}>
							<button onClick={this.confirmationMatch} style={submitInput}>
								Cambiar de contraseña
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
export default VerificationCode;
