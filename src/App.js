import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Registration from './pages/registration';
import Welcome from './pages/welcome';
import Home from './pages/home';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.appDefaultState= this.appDefaultState.bind(this);
  }

  // State Setter Will update in all views.
  appDefaultState(userLogged) {
    this.setState({
      user: userLogged
    });
  }

  componentDidMount () {
    const isLooged = JSON.parse(localStorage.getItem('UserSession'));
    if (isLooged) {
      console.log(this.state);
      this.setState({
        user: isLooged
      });
    }
  }

  render() {

    // Create an object with the State and State Setter inside this component.
    const appProps = {
      user: this.state.user,
      setAppDefaultState: this.appDefaultState
    }

    if(this.state.user) {
      return(
        <Router>
          <Switch>
            <Route exact path="/home" render={(props)=> <Home {...props} passTo={appProps}/>}/>
            <Route exact path="/" render={(props) => <Home {...props} passTo={appProps}/>}/>
            <Route exact path="/welcome" render={(props) => <Home {...props} passTo={appProps}/>}/>
          </Switch>
        </Router>
      );
    } else {
      return (
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => <Registration {...props} passTo={appProps}/>}/>
            <Route exact path="/welcome" render={(props) => <Welcome {...props} passTo={appProps}/>}/>
            <Route exact path="/home" render={(props)=> <Registration {...props} passTo={appProps}/>}/>
          </Switch>
        </Router>
      );
    };
  }
}

export default App;