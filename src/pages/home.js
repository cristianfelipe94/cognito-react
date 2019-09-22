import React, { Component } from 'react';
import {Auth} from 'aws-amplify';

import '../App.css';

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            isUserLogged: false,
            userProfile: null
        }

        this.getStorage = this.getStorage.bind(this);
        this.handleSignOut = this.handleSignOut.bind(this);
        this.goToPassword = this.goToPassword.bind(this);
    }

    // ComponentWillMount:
    // Is the First Render process made by React.
    // This function will load data and set it as State.
    componentWillMount () {
        const storedUser = JSON.parse(localStorage.getItem('UserSession'));
        if (storedUser) {
            this.setState({
                username: storedUser.username,
                isUserLogged: true,
                userProfile: storedUser
            }, () => {
                // console.log("State before mutation: ", this.state);
            });
            // console.log('Something in localStorage: ', storedUser);
        } else {
            // console.log('Not something in localStorage: ', storedUser);
            this.setState({
                isUserLogged: false
            });
        }
    }

    // GetStorage:
    // Utility function.
    getStorage() {
        console.log(this.state);
    }

    // HandleSignOut:
    // This function will Submit a Amplify process
    handleSignOut = async event => {
        event.preventDefault();

        // Auth.signOut:
        // This is a method inside Auth, that takes one Boolean if TRUE deletes Tokens other sessions.
        Auth.signOut({ global: true })
        .then(() => {
            // console.log("Global setter: ", this.props.passTo.setAppDefaultState);
            this.props.passTo.setAppDefaultState(null);
            localStorage.removeItem('UserSession');
        }).catch((err) => {
            console.log("Cognito error: ", err);
        });
    }

    // GoToPassword:
    // This will take the user to change the password.
    goToPassword() {
        this.props.history.push('/forgotpassword');
    }

    render() {

        const username = {
            color: '#05a697'
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

        return (
            <div className="app-layout">
                <h1 onClick= {this.getStorage}>
                    Hola <span style= {username}>{this.state.isUserLogged ? this.state.username : ""}</span>
                </h1>
                <div>
                    <button onClick= {this.handleSignOut} style= {navigationTab}>
                        Salir de la aplicación
                    </button>

                    <button onClick= {this.goToPassword} style= {navigationTab}>
                        Olvidé la contraseña
                    </button>
                </div>
            </div>
        )
    }
}
export default Home;