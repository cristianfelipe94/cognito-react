import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css'

import Registration from './pages/registration';
import Welcome from './pages/welcome';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Registration} />
            <Route exact path="/welcome" component={Welcome} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;