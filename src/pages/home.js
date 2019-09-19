import React, { Component } from 'react';

import '../App.css';

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            isUserLogged: false
        }

        this.getStorage = this.getStorage.bind(this);
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

    render() {

        const username = {
            color: '#05a697'
        }

        return (
            <div className="app-layout">
                <h1 onClick= {this.getStorage}>
                    Hola <span style= {username}>{this.state.isUserLogged ? this.state.username : this.forceUpdate()}</span>
                </h1>
            </div>
        )
    }
}
export default Home;