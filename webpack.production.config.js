const Webpack           = require('webpack');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin       = require('stats-webpack-plugin');
const _                 = require('lodash');
const assignDeep        = require('assign-deep');
const variables         = require('./webpack.config')[0];
const config            = require('./webpack.config')[1];

const buildPath         = path.resolve(__dirname, 'public', 'build');
const mainPath          = path.resolve(__dirname, 'src', 'main.js');
const htmlTemplate      = path.resolve(__dirname, 'src', 'index.html');

// Initial config to overwrite
// undefined will remove the attribute (assignDeep to maintain other values on module attr)
var prodConfig = assignDeep({}, config, {
  devtool: undefined,
  entry: [
    mainPath
  ],
  output: {
    path: buildPath,
    filename: '[name]-[hash].min.js',
    publicPath: undefined
  },
  module: {
    noParse: undefined,
    preLoaders: undefined
  },
  eslint: undefined,
  plugins: [
    new Webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new Webpack.optimize.UglifyJsPlugin({compressor: {warnings: false, screw_ie8: true}}),
    new StatsPlugin('webpack.stats.json', {source: false, modules: false}),
    new Webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
    new HtmlWebpackPlugin({template: htmlTemplate})
  ]
});

// Config to merge
prodConfig = _.merge({}, prodConfig, {
  module: {
    loaders: [
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', variables.sassLoaders.join('!'))},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', variables.cssLoaders.join('!'))}
    ]
  }
});

module.exports = prodConfig;