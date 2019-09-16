import React, { Component } from "react";
import Auth from "aws-amplify";
import "../App.css";

class Welcome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			email: "",
			password: "",
			confirmpassword: "",

			errorMessage: "",
			passwordmatch: false
		};

		this.confirmationMatch = this.confirmationMatch.bind(this);
	}

	// This function will get an event with a value keystroke.
	// Value Keystroke into State.
	// Event will tell us in which state the input will be saved.
	onInputInfo = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	confirmationMatch() {
		if (
			this.state.password !== "" &&
			this.state.confirmpassword !== "" &&
			this.state.username !== "" &&
			this.state.email !== ""
		) {
			if (this.state.password.length < 6) {
				this.setState({
					errorMessage:
						"Password must have 6 characters with at least one capital letter, one number and a special character."
				});
			} else if (this.state.password !== this.state.confirmpassword) {
				this.setState({
					errorMessage:
						"Password and confirmation password are incorrect. Make sure they are the same."
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

	handleSubmitedInfo = async event => {
		event.preventDefault();

		if (this.state.passwordmatch) {
			// Use destructure to get values from state.
			const { username, email, password } = this.state;
			try {
				const signUpResponse = await Auth.login(
					this.state.username,
					this.state.password
				);
				console.log("Sign response: ", signUpResponse);
				this.props.history.push("/home");
			} catch (error) {
				if (String(error.code) === "InvalidParameterException") {
					this.setState({
						errorMessage:
							"Password must contain at leats 6 characters, one Capital letter, one number and a special character"
					});
				}
			}
		}
	};

	render() {
		const welcomeTitle = {
			margin: "20px auto",
			fontWeight: "300"
		};

		const confirmationAdvice = {
			margin: "20px auto"
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

		const appTitles = {
			maxWidth: "50%"
		};

		const errorMessageContainer = {
			maxWidth: "50%",
			color: "#ef3030",
			fontSize: "16px"
		};

		return (
			<div className="App">
				<header className="App-header">
					<h1 style={welcomeTitle}>
						Welcome you are almost sign in, please check your email to confirm
						your account.
					</h1>
					<p style={confirmationAdvice}>
						If the confirmation email is not in your inbox, check your Spam
						Folder.
					</p>
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
								Registrarme
							</button>
						</div>
					</form>
				</header>
			</div>
		);
	}
}

export default Welcome;
