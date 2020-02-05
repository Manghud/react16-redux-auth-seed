import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Signup from './signup';

export class AuthRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path={`${this.props.match.path}/signup`} component={Signup}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default AuthRouter;