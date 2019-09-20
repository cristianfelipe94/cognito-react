import React, { Component } from 'react';
import {Auth} from 'aws-amplify';

import '../App.css';

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            isUserLogged: false
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
            // console.log('Something in localStorage: ', storedUser);
            this.state = {username: storedUser.username, isUserLogged: true, storedUser};
        } else {
            // console.log('Not something in localStorage: ', storedUser);
            this.setState({
                isUserLogged: false
            });
        }
    }

    getStorage() {
        console.log(this.state);
    }

    handleSignOut = async event => {
        event.preventDefault();

        Auth.signOut({ global: true })
        .then(() => {
            // console.log("Global setter: ", this.props.passTo.setAppDefaultState);
            this.props.passTo.setAppDefaultState(null);
            localStorage.removeItem('UserSession');
        }).catch(err => {
            console.log("Cognito error: ", err);
        });
    }

    goToPassword() {
        this.props.history.push('/security');
    }

    render() {
        console.log("Global state: ",this.props);

        const username = {
            color: '#05a697'
        }

        const formSubmitContainer = {
            border: 'none',
            width: '50%',
            display: 'flex'
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
                    Hola <span style= {username}>{this.state.isUserLogged ? this.state.username : this.forceUpdate()}</span>
                </h1>
                <div>
                    <button onClick= {this.handleSignOut} style= {navigationTab}>
                        Salir de la aplicación
                    </button>

                    <button onClick= {this.goToPassword} style= {navigationTab}>
                        Cambiar de contraseña
                    </button>
                </div>
            </div>
        )
    }
}
export default Home;