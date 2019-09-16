import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Client library.
import Amplify from 'aws-amplify';

// Import Config.
import config from './config';

import * as serviceWorker from './serviceWorker';

// Makes sure the app its connected to the right AWS.
Amplify.configure({
    Auth: {
        mandatorySignId: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    }
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
