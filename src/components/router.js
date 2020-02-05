import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

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

export default hot(Router);