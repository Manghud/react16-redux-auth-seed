import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';

import {
  TimeDisplay
} from './routes';

class Router extends React.Component {
  render() {
    return (
      <ConnectedRouter history={this.props.routerHistory}>
        <Switch>
          <Route path="/" component={TimeDisplay}/>
        </Switch>
      </ConnectedRouter>
    );
  }
}

Router.propTypes = {
  routerHistory: PropTypes.object.isRequired
};

export default Router;