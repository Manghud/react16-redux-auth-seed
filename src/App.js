import React from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import Router from './components/router';
import { store, routerHistory } from './store';

function App() {
  return (
    <Provider store={store} context={ReactReduxContext}>
      <ConnectedRouter history={routerHistory} context={ReactReduxContext}>
        <Router/>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
