const DefinePlugin = require('webpack').DefinePlugin;
const { merge } = require('webpack-merge');
require('dotenv').config();

const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  target: 'web',
  devtool: 'eval-source-map',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.STAND': JSON.stringify('dev'),
      'process.env.VERSION': JSON.stringify('development'),
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
    }),
  ],
});
