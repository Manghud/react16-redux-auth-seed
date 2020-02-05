import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';

import {
  AuthRouter
} from './routes';

class Router extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.routerHistory}>
        <Switch>
          <Route path="/auth" component={AuthRouter}/>
        </Switch>
      </ConnectedRouter>
    );
  }
}

Router.propTypes = {
  routerHistory: PropTypes.object.isRequired
};

export default Router;