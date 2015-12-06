const ExtractTextPlugin = require('extract-text-webpack-plugin');
const _                 = require('lodash');
const variables         = require('./webpack.config')[0];
const config            = require('./webpack.config')[1];

const nodeAppConfig = _.merge({}, config, {
  module: {
    loaders: [
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', variables.sassLoaders.join('!'))},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', variables.cssLoaders.join('!'))}
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {allChunks: true})
  ]
});

module.exports = nodeAppConfig;