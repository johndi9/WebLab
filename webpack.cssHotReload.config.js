const variables    = require('./webpack.config')[0];
const config       = require('./webpack.config')[1];

const hotCssLoadConfig = config;

// lodash not working for this case: it mixes props (in scss and css) and creates an issue in the output
hotCssLoadConfig.module.loaders.push(
  {test: /\.scss$/, loaders: ['style-loader', variables.sassLoaders.join('!')]},
  {test: /\.css$/, loaders: ['style-loader', variables.cssLoaders.join('!')]}
);

module.exports = hotCssLoadConfig;