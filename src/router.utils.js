import React from 'react';
import Loadable from 'react-loadable';

import Loading from './components/common/loaders/loading';
const TIMEOUT = 5000;
const DELAY = 200;

const onLoading = () => {
  return <Loading />;
};


export const createLodable = (loader) => Loadable({
  loader,
  loading: onLoading,
  timeout: TIMEOUT,
  delay: DELAY
});
