const Webpack           = require('webpack');
const fs                = require('fs');
const path              = require('path');
const cssnext           = require('cssnext');
const postcssEasings    = require('postcss-easings');
const autoprefixer      = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bemLinter         = require('postcss-bem-linter');

const nodeModulesPath   = path.resolve(__dirname, 'node_modules');
const normalizeScssPath = path.resolve(nodeModulesPath, 'normalize.scss');
const robotoScssPath    = path.resolve(nodeModulesPath, 'roboto-fontface', 'css');
const buildPath         = path.resolve(__dirname, 'public', 'build');
const mainPath          = path.resolve(__dirname, 'src', 'main.js');
const htmlTemplate      = path.resolve(__dirname, 'src', 'index.html');
const reactPath         = path.resolve(nodeModulesPath, 'react', 'dist');
const cssLoaders = [
  'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss-loader',
  'resolve-url-loader'
];
//Variables to export to the different config files
const variables = {
  autoprefixerBrowsers: ['Android 2.3', 'Android >= 4', 'Chrome >= 20', 'Firefox >= 24', 'Explorer >= 9', 'iOS >= 6', 'Opera >= 12', 'Safari >= 6'],
  cssLoaders: cssLoaders,
  sassLoaders: cssLoaders.concat(['sass-loader?outputStyle=expanded'])
};

const config = {
  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval-source-map',
  entry: [

    // For hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://localhost:8080',

    // Our application
    mainPath],
  output: {

    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the buildPath
    // as that points to where the files will eventually be bundled
    // in production
    path: buildPath,
    filename: 'bundle.js',

    // Everything related to Webpack should go through a build path,
    // localhost:3000/build. That makes proxying easier to handle
    publicPath: '/build/'
  },
  module: {
    noParse: [reactPath],
    preLoaders: [
      {test: /\.jsx?$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],
    loaders: [
      {test: /\.txt/, loader: 'file?name=[path][name].[ext]'},
      {test: /\.gif$/, loader: 'url?limit=10000&mimetype=image/gif'},
      {test: /\.jpg$/, loader: 'url?limit=10000&mimetype=image/jpg'},
      {test: /\.png$/, loader: 'url?limit=10000&mimetype=image/png'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
      {test: /\.jsx?$/, loaders: ['react-hot', 'jsx-loader?harmony', 'babel-loader'], exclude: [nodeModulesPath]},
      {test: /\.js$/, loaders: ['babel-loader'], exclude: [nodeModulesPath]}
    ]
  },
  sassLoader: {
    includePaths: [normalizeScssPath, robotoScssPath]
  },
  postcss: [
    autoprefixer({browsers: variables.autoprefixerBrowsers}), postcssEasings, cssnext, bemLinter
  ],
  eslint: {
    configFile: '.eslintrc'
  },
  plugins: [
    new Webpack.optimize.OccurenceOrderPlugin(),
    new Webpack.HotModuleReplacementPlugin(),
    new Webpack.NoErrorsPlugin(),
    new Webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')}),
    new HtmlWebpackPlugin({template: htmlTemplate}),
    new Webpack.optimize.CommonsChunkPlugin('common.js', 2),
  ]
};

module.exports = [variables, config];