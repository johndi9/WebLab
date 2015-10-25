const Webpack           = require('webpack');
const fs                = require('fs');
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext           = require('cssnext');
const postcssEasings    = require('postcss-easings');
const autoprefixer      = require('autoprefixer');
const StatsPlugin       = require('stats-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeModulesPath   = path.resolve(__dirname, 'node_modules');
const normalizeScssPath = path.resolve(nodeModulesPath, 'normalize.scss');
const buildPath         = path.resolve(__dirname, 'public', 'build');
const mainPath          = path.resolve(__dirname, 'src', 'main.js');
const htmlTemplate      = path.resolve(__dirname, 'src', 'index.html');
const reactPath         = path.resolve(nodeModulesPath, 'react', 'dist');

const autoprefixerBrowsers = ['Android 2.3', 'Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 9', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6'];
const sassLoaders = [
  'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss-loader',
  'cssnext-loader',
  'sass-loader?outputStyle=expanded&includePaths[]=' + encodeURIComponent(normalizeScssPath)
];

module.exports = {
  entry: [
    mainPath
  ],
  output: {
    path: buildPath,
    filename: '[name]-[hash].min.js'
  },
  module: {
    loaders: [
      {test: /\.txt/, loader: 'file?name=[path][name].[ext]'},
      {test: /\.gif$/, loader: 'url?limit=10000&mimetype=image/gif'},
      {test: /\.jpg$/, loader: 'url?limit=10000&mimetype=image/jpg'},
      {test: /\.png$/, loader: 'url?limit=10000&mimetype=image/png'},
      {test: /\.woff$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.woff2$/, loader: 'url?limit=10000&mimetype=application/font-woff2'},
      {test: /\.ttf$/, loader: 'file?mimetype=application/vnd.ms-fontobject'},
      {test: /\.eot$/, loader: 'file?mimetype=application/x-font-ttf'},
      {test: /\.svg$/, loader: 'file?mimetype=image/svg+xml'},
      {test: /\.jsx?$/, exclude: [nodeModulesPath], loader: 'babel-loader'},
      {test: /\.js$/, loaders: ['babel-loader'], exclude: [nodeModulesPath]},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))},
    ]
  },
  postcss: [
    autoprefixer({browsers: autoprefixerBrowsers}), postcssEasings, cssnext
  ],
  plugins: [
    new Webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new Webpack.optimize.UglifyJsPlugin({compressor: {warnings: false, screw_ie8: true}}),
    new StatsPlugin('webpack.stats.json', {source: false, modules: false}),
    new Webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
    new HtmlWebpackPlugin({template: htmlTemplate})
  ]
};