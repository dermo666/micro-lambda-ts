/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');

const { lib: { webpack: { isLocal } } } = slsw;

module.exports = {
  mode: isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  devtool: isLocal ? 'source-map' : undefined,
  resolve: {
    extensions: ['.ts', '.tsx', '.yaml'],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$|tsx/,
        exclude: /node_modules/,
        use: [
          'ts-loader',
        ],
      }
    ],
  },
};
