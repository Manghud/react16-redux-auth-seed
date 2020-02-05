const development = {
  displayReduxTools: true,
  domainName: '',
  isDevEnvironment: true
};

const staging = {
  displayReduxTools: true,
  domainName: process.env.REACT_APP_DOMAIN_NAME
};

const production = {
  displayReduxTools: false,
  domainName: process.env.REACT_APP_DOMAIN_NAME
};

const environmentConfigs = {
  development,
  staging,
  production
};

/*eslint no-undef: off*/
export default environmentConfigs[process.env.REACT_APP_ENVIRONMENT] || development;
