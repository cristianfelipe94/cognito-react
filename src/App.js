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

  render() {

    // Create an object with the State and State Setter inside this component.
    const appProps = {
      user: this.state.user,
      setAppDefaultState: this.appDefaultState
    }
    
    return (
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Registration passTo={appProps}/>}/>
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </Router>
    );
  }
}

export default App;