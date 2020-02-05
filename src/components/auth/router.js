import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Signup from './signup';
import Login from './login';

export class AuthRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={`${this.props.match.path}/signup`} component={Signup}/>
          <Route path={`${this.props.match.path}/login`} component={Login}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default AuthRouter;