const {
  getLoader,
  loaderByName,
  ESLINT_MODES,
  throwUnexpectedConfigError
} = require('@craco/craco');
const CSS_MODULE_LOCAL_IDENT_NAME = '[local]___[hash:base64:5]';

module.exports = {
  eslint: {
    mode: ESLINT_MODES.file
  },
  jest: {
    configure: require('./jest.config.js')
  },
  webpack: {
    alias: {
      '../../theme.config$': require('path').join(__dirname, '/src/semantic-ui/theme.config')
    }
  },
  style: {
    modules: {
      camelCase: true,
      localIdentName: CSS_MODULE_LOCAL_IDENT_NAME
    }
  },
  babel: {
    loaderOptions: {
      // Without this Babel caches module name resolution,
      // e.g. wrongly identifies that CSS module does not exist.
      cacheDirectory: false
    },
    plugins: [
      'react-hot-loader/babel',
      [
        'babel-plugin-react-css-modules',
        {
          attributeNames: {
            activeStyleName: 'activeClassName'
          },
          filetypes: {
            '.scss': {
              syntax: 'postcss-scss'
            }
          },
          generateScopedName: CSS_MODULE_LOCAL_IDENT_NAME,
          handleMissingStyleName: 'warn'
        }
      ]
    ]
  },
  plugins: [
    { plugin: require('craco-less') },
    {
      plugin: {
        overrideWebpackConfig: ({ context, webpackConfig }) => {
          const { isFound, match: fileLoaderMatch } = getLoader(
            webpackConfig,
            loaderByName('file-loader'),
          );

          if (!isFound) {
            throwUnexpectedConfigError({
              message: `Can't find file-loader in the ${context.env} webpack config!`
            });
          }

          fileLoaderMatch.loader.exclude.push(/theme.config$/);
          fileLoaderMatch.loader.exclude.push(/\.variables$/);
          fileLoaderMatch.loader.exclude.push(/\.overrides$/);

          return webpackConfig;
        }
      }
    }
  ]
};