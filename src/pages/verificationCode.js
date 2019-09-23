import React, { Component } from "react"; 

import Form from "../components/Form";

import "../App.css";

class VerificationCode extends Component {
	constructor(props) {
		super(props);
		this.state = {
            formType: "verificationCode"
		};

        this.goToHome = this.goToHome.bind(this);
		// this.getStorage = this.getStorage.bind(this);
	}

	// GoToHome:
	// This function will take the user to the Home page.
	goToHome() {
		this.props.history.push("/home");
	}

	render() {

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
        
        const layoutBlock = {
			width: '80%'
		}

		return (
			<div className="app-layout">
				<div style={layoutBlock}>
					<h1>Ingresa la información para completar el proceso.</h1>

                    <Form {...this.props} type= {this.state.formType} />
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
