import React, { Component } from "react";
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

	// This function will get an event with a value keystroke.
	// Value Keystroke into State.
	// Event will tell us in which state the input will be saved.
	onInputInfo = event => {
		console.log("Prop is: ", this.state);
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	confirmationMatch() {
		if (this.state.password !== "" && this.state.username !== "") {
			if (this.state.password.length < 6) {
				this.setState({
					errorMessage:
						"Password must have 6 characters with at least one capital letter, one number and a special character."
				});
			} else {
				this.setState({
					passwordmatch: true
				});
			}
		} else {
			this.setState({
				errorMessage: "Please make sure to fill all the required fields."
			});
		}
	}

	goToSignUp() {
		this.props.history.push('/');
	}	

	handleSubmitedInfo = async event => {
		event.preventDefault();
		if (this.state.passwordmatch) {
			const {username, password} = this.state;
			console.log(username, password);
			Auth.signIn({
				username, password
			}).then((user) => {
				console.log(user);
				this.setState({
					isLooged: {
						logged: true,
						username: user
					}
				}, () => {
					// console.log(this.state.isLooged);
					this.props.passTo.setAppDefaultState(this.state.isLooged);
					localStorage.setItem('UserSession', JSON.stringify(user));
					this.props.history.push('/home');
				});
			}).catch(err => {
				console.log(err.message);
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

		const templateGrid = {
			display: 'flex',
			flexDirection: 'row'
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

		const appTitles = {
			maxWidth: "50%"
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

		if (this.state.isLooged.logged !== null) {
			return (
				<div className="App">
					<header className="App-header" style= {templateGrid}>
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
										placeholder="Enter username"
										value={this.state.username}
										onChange={this.onInputInfo}
										className={"user-input"}
									/>
									<input
										type="password"
										id="password"
										placeholder="Enter password"
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
					</header>
				</div>
			);
		} else {
			return (
				<div className="App">
					<header className="App-header" style= {templateGrid}>
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
										placeholder="Enter username"
										value={this.state.username}
										onChange={this.onInputInfo}
										className={"user-input"}
									/>
									<input
										type="password"
										id="password"
										placeholder="Enter password"
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
					</header>
				</div>
			);
		}
	}
}

export default Welcome;
