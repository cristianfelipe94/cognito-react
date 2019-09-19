import React, { Component } from 'react';
class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            isUserLogged: false
        }

        this.getStorage = this.getStorage.bind(this);
    }

    componentWillMount () {
        const storedUser = JSON.parse(localStorage.getItem('UserSession'));
        if (storedUser) {
            console.log('Something: ', storedUser);
            this.state = {username: storedUser.username, isUserLogged: true, storedUser};
            console.log(this.state);
        } else {
            console.log('Not something: ', storedUser);
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

        const templateGrid = {
            display: 'flex',
            flexDirection: 'row'
        }

        return (
            <div className="App">
                <header className="App-header" style= {templateGrid}>
                    <h1 onClick= {this.getStorage}>
                        Hola <span style= {username}>{this.state.isUserLogged ? this.state.username : this.forceUpdate()}</span>
                    </h1>
                </header>
            </div>
        )
    }
}
export default Home;