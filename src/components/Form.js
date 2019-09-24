import React, { Component } from "react";

import { Auth } from "aws-amplify";

const cognitoErrorsRegex = {
	whitespace: /\s+/g,
	validationError: /\b(\w*validation errors detected\w*)\b/g
}

class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",

			password: "",
			confirmpassword: "",

			verificationCode: "",
			newPassword: "",

			errorMessage: "",
			passedValidation: false,

			isLooged: {
				logged: false,
				userProfile: null
			}
		};

		this.validationSignUp = this.validationSignUp.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);

		this.validationSignIn = this.validationSignIn.bind(this);
		this.handleSignIn = this.handleSignIn.bind(this);

		this.validationForgotPass = this.validationForgotPass.bind(this);
		this.handleForgotPassword = this.handleForgotPassword.bind(this);

		this.validationVerificationCode = this.validationVerificationCode.bind(this);
		this.handleVerificationCode = this.handleVerificationCode.bind(this);
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
	validationSignUp() {
		if (
			this.state.password !== "" &&
			this.state.confirmpassword !== "" &&
			this.state.username !== "" &&
			this.state.email !== ""
		) {
			if (this.state.password.length < 6) {
				this.setState({
					errorMessage:
						"Por seguridad las contraseñas tienen que ser mayores de 6 caracteres, tener al menos un número, una letra mayúscula y un caracter especial."
				});
			} else if (this.state.password !== this.state.confirmpassword) {
				this.setState({
					errorMessage:
						"La contraseña y la confirmación tienen que ser iguales. Asegúrese de estar ingresando la contraseña correcta."
				});
			} else if (cognitoErrorsRegex.whitespace.test(this.state.username) || cognitoErrorsRegex.whitespace.test(this.state.email)) {
				this.setState({
					errorMessage: "El nombre de usuario y correo no deben contener espacios en blanco. Vuelva a intentarlo."
				});
			} else {
				this.setState({
					passedValidation: true,
					errorMessage: ""
				});
			}
		} else {
			this.setState({
				errorMessage: "Asegúrese de completar todos los campos."
			});
		}
	}

	// ConfirmationMatch:
	//This function will make tests in the front before sending a request in the Back.
	validationSignIn() {
		if (this.state.password !== "" && this.state.username !== "") {
			if (this.state.password.length < 6) {
				this.setState({
					errorMessage: "Por seguridad las contraseñas tienen que ser mayores de 6 caracteres, tener al menos un número, una letra mayúscula y un caracter especial."
				});
			} else if (cognitoErrorsRegex.whitespace.test(this.state.username)) {
				this.setState({
					errorMessage: "El nombre de usuario no debe contener espacios en blanco. Vuelva a intentarlo."
				});
			} else {
				this.setState({
					passedValidation: true,
					errorMessage: ""
				});
			}
		} else {
			this.setState({
				errorMessage: "Asegúrese de completar todos los campos."
			});
		}
	}

	// ConfirmationMatch:
	//This function will make tests in the front before sending a request in the Back.
	validationForgotPass() {
		if (this.state.email !== "") {
			if (cognitoErrorsRegex.whitespace.test(this.state.email)) {
				this.setState({
					errorMessage: "El correo no debe contener espacios en blanco. Vuelva a intentarlo."
				});
			} else {
				this.setState({
					passedValidation: true,
					errorMessage: ""
				});
			};
		} else {
			this.setState({
				errorMessage: "Asegúrese de completar todos los campos."
			});
		}
	}

	// ConfirmationMatch:
	//This function will make tests in the front before sending a request in the Back.
	validationVerificationCode() {
		if (this.state.newPassword !== "" && this.state.confirmedPassword !== "") {
			if (this.state.newPassword.length < 6 && this.state.confirmedPassword < 6) {
				this.setState({
					errorMessage: "Por seguridad las contraseñas tienen que ser mayores de 6 caracteres, tener al menos un número, una letra mayúscula y un caracter especial."
				});
			} else if (this.state.newPassword !== this.state.confirmedPassword) {
				this.setState({
					errorMessage: "Asegurese de confirmar la nueva contraseña."
				});
			}  else if (cognitoErrorsRegex.whitespace.test(this.state.email) || cognitoErrorsRegex.whitespace.test(this.state.verificationCode)) {
				this.setState({
					errorMessage: "El correo y el código de verificación no deben contener espacios en blanco. Vuelva a intentarlo."
				});
			} else {
				// console.log("Passed validation: ",this.state.email," ",this.state.newPassword," ",this.state.confirmedPassword);
				this.setState({
					passedValidation: true,
					errorMessage: ""
				});
			}
		} else {
			this.setState({
				errorMessage: "Asegúrese de completar todos los campos."
			});
		}
	}
	
	// HandleSubmitedInfo:
	// This function will Submit
	handleSignUp = async event => {
		event.preventDefault();

		if (this.state.passedValidation) {
			// Use destructure to get values from state.
			const { username, email, password } = this.state;

			// Auth.signUp:
			// This is a method inside Auth, that takes Username, Password and email attributes.
			Auth.signUp({
				username,
				password,
				attributes: {
					email: email
				}
			})
				.then(userCreated => {
					// console.log("Cognito response: ", userCreated);
					this.props.passTo.setAppDefaultState(userCreated);
					this.props.history.push("/welcome");
				})
				.catch(err => {
					// console.log("Cognito error: ", cognitoErrors);
					if (cognitoErrorsRegex.validationError.test(err.message)) {
						this.setState({
							errorMessage: "El nombre de usuario y el correo no deben contener espacios en blanco. Vuelva a intentarlo."
						});
					} else {
						this.setState({
							errorMessage: err.message
						});
					}
				});
		}
	};

	// HandleSubmitedInfo:
	// This function will Submit
	handleSignIn = async event => {
		event.preventDefault();

		if (this.state.passedValidation) {
			const { username, password } = this.state;
			// console.log("Destructure state: ", username, password);

			// Auth.signIn:
			// This is a method inside Auth, that takes Username and Password.
			Auth.signIn({
				username,
				password
			}).then((user) => {
				// console.log("Response from Cognito: ", user);
                this.setState({
                    errorMessage: "",
                    isLooged: {
                        logged: true,
                        userProfile: user
                    }
				});
			}).catch((err) => {
				// console.log("Cognito error: ", cognitoErrors);
				if (cognitoErrorsRegex.validationError.test(err.message)) {
					this.setState({
						errorMessage: "El nombre de usuario no debe contener espacios en blanco. Vuelva a intentarlo."
					});
				} else {
					this.setState({
						errorMessage: err.message
					});
				}
			});
			this.goToHome();
		}
	};

	goToHome = async event => {
		if(this.state.isLooged.logged) {
			this.props.passTo.setAppDefaultState(this.state.isLooged);
			localStorage.setItem("UserSession", JSON.stringify(this.state));
			this.props.history.push("/");
			window.location.reload();
		};
	}

	// HandleSubmitedInfo:
	// This function will Submit a Amplify process
	handleForgotPassword = async event => {
		event.preventDefault();

		if (this.state.passedValidation) {
			// Use destructure to get values from state.
			const { email } = this.state;

			// Auth.forgotPassword:
			// This is a method inside Auth that takes one value (email).
			Auth.forgotPassword(email)
				.then(data => {
					this.props.history.push("/verificationcode");
				})
				.catch(err => {
					// console.log("Cognito error: ", cognitoErrors);
					if (cognitoErrorsRegex.validationError.test(err.message)) {
						this.setState({
							errorMessage: "El correo no debe contener espacios en blanco. Vuelva a intentarlo."
						});
					} else {
						this.setState({
							errorMessage: err.message
						});
					}
				});
		}
	};

	// HandleChangePass:
	// This function will Submit
	handleVerificationCode = async event => {
		event.preventDefault();

		// console.log("Password request in Cognito");
		if (this.state.passedValidation) {
			const { email, verificationCode, newPassword } = this.state;
			// console.log("Destructure state: ", email, verificationCode, newPassword);

			// Auth.forgotPasswordSubmit:
			// This is a method inside Auth, that takes Email, VerificationCode and NewPassword.
			Auth.forgotPasswordSubmit(email, verificationCode, newPassword)
				.then(() => {
					// After new password is created the session will be removed and user has to log in the Welcome page.
					this.props.passTo.setAppDefaultState(null);
					localStorage.clear();
					this.props.history.push("/welcome");
				})
				.catch(err => {
					// console.log("Cognito error: ", cognitoErrors);
					if (cognitoErrorsRegex.validationError.test(err.message)) {
						this.setState({
							errorMessage: "El nombre de usuario y el código de verificación no deben contener espacios en blanco. Vuelva a intentarlo."
						});
					} else {
						this.setState({
							errorMessage: err.message
						});
					}
				});
		}
	};

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

		const errorMessageContainer = {
			maxWidth: "50%",
			color: "#ef3030",
			fontSize: "16px"
		};

		if (this.props.type === "signUp") {
			return (
				<div>
					<div style={errorMessageContainer}>
						<p>{this.state.errorMessage}</p>
					</div>
					<form onSubmit={this.handleSignUp} style={formBlock}>
						<div style={formInputContainer}>
							<div>
								<label htmlFor="email">Ingrese su correo</label>
								<input
									type="text"
									id="email"
									placeholder="atana-@-ejemplo.com"
									value={this.state.email}
									onChange={this.onInputInfo}
									className={"user-input"}
								/>

								<label htmlFor="username">Ingrese su nombre de usuario</label>
								<input
									type="text"
									id="username"
									placeholder="Nombre de usuario"
									value={this.state.username}
									onChange={this.onInputInfo}
									className={"user-input"}
								/>

								<label htmlFor="password">Crear contraseña</label>
								<input
									type="password"
									id="password"
									placeholder="Nueva contraseña"
									value={this.state.password}
									onChange={this.onInputInfo}
									className={"user-input"}
								/>

								<label htmlFor="confirmpassword">Confirme su contraseña</label>
								<input
									type="password"
									id="confirmpassword"
									placeholder="Confirmar contraseña"
									value={this.state.confirmpassword}
									onChange={this.onInputInfo}
									className={"user-input"}
								/>
							</div>
							<div style={formSubmitContainer}>
								<button onClick={this.validationSignUp} style={submitInput}>
									Registrarme
								</button>
							</div>
						</div>
					</form>
				</div>
			);
		} else if (this.props.type === "signIn") {
			return (
				<div>
					<div style={errorMessageContainer}>
						<p>{this.state.errorMessage}</p>
					</div>
					<form onSubmit={this.handleSignIn} style={formBlock}>
						<div style={formInputContainer}>
							<label htmlFor="username">Ingrese su nombre de usuario</label>
							<input
								type="text"
								id="username"
								placeholder="Nombre de usuario"
								value={this.state.username}
								onChange={this.onInputInfo}
								className={"user-input"}
							/>

							<label htmlFor="password">Ingresar contraseña</label>
							<input
								type="password"
								id="password"
								placeholder="Contraseña"
								value={this.state.password}
								onChange={this.onInputInfo}
								className={"user-input"}
							/>
						</div>
						<div style={formSubmitContainer}>
							<button onClick={this.validationSignIn} style={submitInput}>
								Ingresar a Atana
							</button>
						</div>
					</form>
				</div>
			);
		} else if (this.props.type === "forgotPassword") {
			return (
				<div>
					<div style={errorMessageContainer}>
						<p>{this.state.errorMessage}</p>
					</div>
					<form onSubmit={this.handleForgotPassword} style={formBlock}>
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
							<button onClick={this.validationForgotPass} style={submitInput}>
								Generar código
							</button>
						</div>
					</form>
				</div>
			);
		} else if (this.props.type === "verificationCode") {
			return (
				<div>
					<div style={errorMessageContainer}>
						<p>{this.state.errorMessage}</p>
					</div>
					<form onSubmit={this.handleVerificationCode} style={formBlock}>
						<div style={formInputContainer}>
							<label htmlFor="email">Ingrese su correo electrónico</label>
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

							<label htmlFor="newPassword">Ingrese su nueva contraseña</label>
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
							<button
								onClick={this.validationVerificationCode}
								style={submitInput}
							>
								Cambiar de contraseña
							</button>
						</div>
					</form>
				</div>
			);
		}
	}
}

export default Form;
