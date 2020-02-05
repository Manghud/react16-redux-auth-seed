import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import config from '../config';
import {
  AuthRouter
} from './routes';

export class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path="/auth" component={AuthRouter}/>
      </Switch>
    );
  }
}

let RouterForEnv;
if (config.isDevEnvironment) {
  RouterForEnv = hot(Router);
} else {
  RouterForEnv = Router;
}

export default RouterForEnv;