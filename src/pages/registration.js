import React, { Component } from 'react';

// Auth is an object that has inside methods.
// signIn, signOut Methods.
import {Auth} from 'aws-amplify';

import '../App.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmpassword: "",

      errorMessage: "",
      passwordmatch: false,
      isLooged: this.props.passTo.user
    };

    this.confirmationMatch = this.confirmationMatch.bind(this);
    this.goToLogin = this.goToLogin.bind(this);
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
  confirmationMatch () {
    if (this.state.password !== "" && this.state.confirmpassword !== "" && this.state.username !== "" && this.state.email !== "") {
      if (this.state.password.length < 6) {
        this.setState({
            errorMessage: 'Por seguridad las contraseñas tienen que ser mayores de 6 caracteres, tener al menos un número, una letra mayúscula y un caracter especial.'
        });
      } else if (this.state.password !== this.state.confirmpassword) {
        this.setState({
            errorMessage: 'La contraseña y la confirmación tienen que ser iguales. Asegúrese de estar ingresando la contraseña correcta.'
        });
      } else {
        this.setState({
            passwordmatch: true,
            isLooged: true
        });
      }
    } else {
        this.setState({
            errorMessage: "Asegúrese de completar todos los campos."
        })
    }
  };

  // HandleSubmitedInfo:
	// This function will Submit
  handleSubmitedInfo = async event => {
    event.preventDefault();

    if(this.state.passwordmatch) {
      // Use destructure to get values from state.
      const {username, email, password} = this.state;
      Auth.signUp({
        username,
        password,
        attributes: {
          email: email
        }
      }).then((userCreated) => {
        // console.log("Cognito response: ", userCreated);
        this.props.passTo.setAppDefaultState(userCreated);
        this.props.history.push('/welcome');
      }).catch((err) => {
        // console.log("Cognito error: ", err);
        this.setState({
          errorMessage: err.message
        })
      });
    }
  }

  goToLogin() {
    this.props.history.push('/welcome');
  }

  render() {
    const formBlock = {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '90%'
    };

    const formInputContainer = {
      border: 'none',
      width: '50%',
      display: 'inline-block',
      padding: '30px 0 15px'
    }

    const formSubmitContainer = {
      border: 'none',
      width: '50%',
      display: 'flex'
    }

    const submitInput = {
      border: 'none',
      height: '40px',
      fontSize: '18px',
      color: '#3b3b3b',
      margin: 'auto',
      backgroundColor: '#05a697',
      cursor: 'pointer',
      fontFamily: 'Roboto',
      width: 'max-content',
      padding: '10px'
    }

    const appTitles = {
      maxWidth: '80%'
    }

    const errorMessageContainer = {
        maxWidth: '50%',
        color: '#ef3030',
        fontSize: '16px'
    }

    const enterHome = {
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

    return (
      <div className="app-layout">
        <div>
          <div style= {appTitles}>
            <h1 style= {{fontWeight: '300'}}>
                Atana
            </h1>

            <h2 style= {{fontWeight: '300'}}>
                Tus ideas deben ser comunicadas.
            </h2>
          </div>

          <div style= {errorMessageContainer}>
            <p>{this.state.errorMessage}</p>
          </div>

          <form onSubmit= {this.handleSubmitedInfo} style= {formBlock}>

            <div style= {formInputContainer}>
              <label htmlFor= "email">Ingrese su correo</label>
              <input type= "text" id= "email" placeholder= "atana-@-ejemplo.com" value= {this.state.email} onChange= {this.onInputInfo} className= {'user-input'}/>
              
              <label htmlFor= "username">Ingrese su nombre de usuario</label>
              <input type= "text" id= "username" placeholder= "Nombre de usuario" value= {this.state.username} onChange= {this.onInputInfo} className= {'user-input'}/>
              
              <label htmlFor= "email">Crear contraseña</label>
              <input type= "password" id= "password" placeholder= "Nueva contraseña" value= {this.state.password} onChange= {this.onInputInfo}  className= {'user-input'}/>
              
              <label htmlFor= "email">Confirme su contraseña</label>
              <input type= "password" id= "confirmpassword" placeholder= "Confirmar contraseña" value= {this.state.confirmpassword} onChange= {this.onInputInfo}  className= {'user-input'}/>
            </div>

            <div style= {formSubmitContainer}>
              <button onClick= {this.confirmationMatch} style= {submitInput}>
                Registrarme
              </button>
            </div>

          </form>
        </div>

        <div>
          <button onClick= {this.goToLogin} style= {enterHome}>
            Ya soy usuario
          </button>
        </div>
    </div>
    );
  }
}

export default Registration;
