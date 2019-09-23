import React, { Component } from "react"; 

import Form from "../components/Form";

import "../App.css";
import "../index.css"

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

		return (
			<div className="app-layout">
				<div className="app-layout-titles">
					<h1>Ingresa la información para completar el proceso.</h1>

                    <Form {...this.props} type= {this.state.formType} />
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
export default VerificationCode;
