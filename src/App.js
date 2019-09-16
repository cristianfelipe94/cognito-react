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
      isLogged: 'false'
    }
  }
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Registration passTo={this.state.isLogged}/>}/>
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;