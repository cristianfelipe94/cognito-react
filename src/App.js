import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import {createBrowserHistory} from "history";

import './App.css';

// Import all pages.
import Registration from './pages/registration';
import Welcome from './pages/welcome';
import Home from './pages/home';
import ForgotPassword from './pages/forgotPassword';
import VerificationCode from './pages/verificationCode';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.appDefaultState = this.appDefaultState.bind(this);
  }

  // AppDefaulState:
  // This function will update state in every page.
  appDefaultState(userLogged) {
    this.setState({
      user: userLogged
    });
  }

  // ComponentDidMount:
  //  This function will get Data from LocalStorage.
  componentDidMount () {
    const isLogged = JSON.parse(localStorage.getItem('UserSession'));
    if (isLogged) {
      // console.log("Stored session: ", this.isLogged);
      this.setState({
        user: isLogged
      });
    }
  }

  render() {
    // Create a prop that contains the State.
    const appProps = {
      user: this.state.user,
      setAppDefaultState: this.appDefaultState
    }

    // Asks if there is a logged user.
    // Renders based on state.
    if(this.state.user) {
      if(this.state.user.username) {
        return(
          <Router history={history}>
            <Switch>
              <Route exact path="/" render={(props) => <Home {...props} passTo={appProps}/>}/>
              <Route exact path="/welcome" render={(props) => <Home {...props} passTo={appProps}/>}/>
              <Route exact path="/security" render={(props) => <Home {...props} passTo={appProps}/>}/>
              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} passTo={appProps}/>}/>
              <Route exact path="/verificationcode" render={(props) => <VerificationCode {...props} passTo={appProps}/>}/>
            </Switch>
          </Router>
        );
      } else {
        return(
          <Router history={history}>
            <Switch>
              <Route exact path="/" render={(props) => <Registration {...props} passTo={appProps}/>}/>
              <Route exact path="/welcome" render={(props) => <Welcome {...props} passTo={appProps}/>}/>
              <Route exact path="/security" render={(props) => <Welcome {...props} passTo={appProps}/>}/>
              <Route exact path="/forgotpassword" render={(props) => <Welcome {...props} passTo={appProps}/>}/>
              <Route exact path="/verificationcode" render={(props) => <Welcome {...props} passTo={appProps}/>}/>
            </Switch>
          </Router>
        );
      }
    } else {
      return (
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={(props) => <Registration {...props} passTo={appProps}/>}/>
            <Route exact path="/welcome" render={(props) => <Welcome {...props} passTo={appProps}/>}/>
            <Route exact path="/security" render={(props) => <Registration {...props} passTo={appProps}/>}/>
            <Route exact path="/forgotpassword" render={(props) => <Registration {...props} passTo={appProps}/>}/>
            <Route exact path="/verificationcode" render={(props) => <Registration {...props} passTo={appProps}/>}/>
          </Switch>
        </Router>
      );
    };
  }
};

export default App;