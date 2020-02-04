const development = {
  displayReduxTools: true,
  domainName: ''
};

const staging = {
  displayReduxTools: true,
  domainName: ''
};

const production = {
  displayReduxTools: false,
  domainName: ''
};

const environmentConfigs = {
  development,
  staging,
  production
};

/*eslint no-undef: off*/
export default environmentConfigs[process.env.REACT_APP_ENVIRONMENT] || development;
