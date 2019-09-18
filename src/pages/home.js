import React, { Component } from 'react';
class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
            userLooged: ""
        }

        this.getStorage = this.getStorage.bind(this);
        this.getUserSession = this.getUserSession.bind(this);
    }

    componentDidMount () {
        this.getUserSession();
    }

    getUserSession() {
        this.setState({
            userLooged: JSON.parse(localStorage.getItem('UserSession') || '{}')
        });
    }

    getStorage() {
        console.log(this.state.userLooged.username);
    }
    render() {
        const propsHome = this.props;
        console.log(propsHome);

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
                        Hola <span style= {username}>{this.state.userLooged.username}</span>
                    </h1>
                </header>
            </div>
        )
    }
}
export default Home;