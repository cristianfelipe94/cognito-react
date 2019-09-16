import React, { Component } from 'react';
import '../App.css';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    const welcomeTitle = {
        margin: '20px auto',
        fontWeight: '300'
    }

    const confirmationAdvice = {
        margin: '20px auto'
    }
    return (
      <div className="App">
        <header className="App-header">
            <h1 style= {welcomeTitle}>
                Welcome you are almost sign in, please check your email to confirm your account.
            </h1>
            <p style= {confirmationAdvice}>
                If the confirmation email is not in your inbox, check your Spam Folder.
            </p>
        </header>
      </div>
    );
  }
}

export default Welcome;
