import { hot } from 'react-hot-loader/root';
import React from 'react';
import Router from './components/router';
import { Provider } from 'react-redux';
import { store, routerHistory } from './store';

function App() {
  return (
    <Provider store={store}>
      <Router routerHistory={routerHistory}/>
    </Provider>
  );
}

export default hot(App);
