import React, { Component } from 'react';
import {Auth} from 'aws-amplify';

import '../App.css';

class Security extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            oldpassword: "",
            password: "",
            passedValidation: "",
            errorMessage: ""
        }

        this.getStorage = this.getStorage.bind(this);
        this.goToHome = this.goToHome.bind(this);
        this.confirmationMatch = this.confirmationMatch.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
    }

    // OnInputInfo:
	// This function will get an event with the keystroke value.
	// Keystroke values will be saved into State.
    onInputInfo = (event) => {
        this.setState({
        [event.target.id]: event.target.value
        });
    }

    // ConfirmationMatch:
    //This function will make tests in the front before sending a request in the Back.
    confirmationMatch (event) {
        event.preventDefault();
        if (this.state.username !== "" && this.state.password !== "" && this.state.oldpassword !== "") {
        if (this.state.password.length < 6 && this.state.oldpassword < 6) {
            this.setState({
                errorMessage: 'Por seguridad las contraseñas tienen que ser mayores de 6 caracteres, tener al menos un número, una letra mayúscula y un caracter especial.'
            });
        } else if (this.state.password === this.state.oldpassword) {
            this.setState({
                errorMessage: 'La nueva contraseña debe de ser diferente a antiguas contraseñas.'
            });
        } else {
            console.log("Passed validation: ",this.state.username," ",this.state.password," ",this.state.oldpassword);
            this.setState({
                passedValidation: true
            });
        }
        } else {
            this.setState({
                errorMessage: "Asegúrese de completar todos los campos."
            })
        }
    };

    getStorage() {
        // Auth.currentAuthenticatedUser()
        // .then(user => {
        //     console.log("Whos profile: ", user);
        //     return Auth.changePassword(this.state.username, this.state.oldpassword, this.state.oldpassword )
        // }).then(data => {console.log(data)})
        // .catch(err => {console.log(err)});
        
        console.log(this.state);
    }

    handleChangePass = async event => {
        event.preventDefault();
        console.log("Password request in Cognito");
        if (this.state.passedValidation) {
            Auth.currentAuthenticatedUser()
            .then((user) => {
                console.log("Whos profile: ", user);
                return Auth.changePassword(
                        this.state.username,
                        this.state.oldpassword,
                        this.state.password
                    )
            }).then((data) => {
                console.log(data)
            }).catch((err) => {
                console.log(err)
            });
        }
    }

    goToHome() {
        this.props.history.push('./home');
    }

    render() {

        const formSubmitContainer = {
            border: 'none',
            width: '50%',
            display: 'flex'
        }

        const submitInput = {
            border: 'none',
            height: '40px',
            fontSize: '18px',
            color: 'white',
            margin: 'auto',
            backgroundColor: '#05a697',
            cursor: 'pointer',
            fontFamily: 'Roboto',
            width: 'max-content',
            padding: '10px'
        }

        const formBlock = {
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '90%'
        }

        const formInputContainer = {
            border: 'none',
            width: '50%',
            display: 'inline-block'
        }

        const navigationTab = {
            border: 'none',
            fontSize: '16px',
            color: 'white',
            margin: '10px auto',
            padding: '10px',
            backgroundColor: 'rgb(59, 59, 59)',
            fontFamily: 'Roboto',
            width: 'max-content',
            cursor: 'pointer',
            display: 'block'
        }

        const errorMessageContainer = {
            maxWidth: '50%',
            color: '#ef3030',
            fontSize: '16px'
        }

        return (
            <div className="app-layout">
                <div>
                    <h1 onClick= {this.getStorage}>
                        Administrador de contraseña
                    </h1>
                    <div style= {errorMessageContainer}>
                        <p>{this.state.errorMessage}</p>
                    </div>
                    <form onSubmit= {this.handleChangePass} style= {formBlock}>

                        <div style= {formInputContainer}>
                            <input type= "text" id= "username" placeholder= "Nombre de usuario" value= {this.state.username} onChange= {this.onInputInfo} className= {'user-input'}/>
                            <input type= "password" id= "oldpassword" placeholder= "Contraseña" value= {this.state.oldpassword} onChange= {this.onInputInfo}  className= {'user-input'}/>
                            <input type= "password" id= "password" placeholder= "Nueva contraseña" value= {this.state.password} onChange= {this.onInputInfo}  className= {'user-input'}/>
                        </div>

                        <div style= {formSubmitContainer}>
                            <button onClick= {this.confirmationMatch} style= {submitInput}>
                                Cambiar de contraseña
                            </button>
                        </div>

                    </form>
                </div>

                <div>
                    <button onClick= {this.goToHome} style= {navigationTab}>
                        Volver al perfil
                    </button>
                </div>
            </div>
        )
    }
}
export default Security;