const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const distPath = path.join(__dirname, 'dist');

module.exports = {
  entry: './src/renderer/index.tsx',
  output: {
    filename: 'bundle.js',
    path: distPath,
    publicPath: distPath,
  },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader' },
      { test: /\.css$/, use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } },
        ] },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules']
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'static' }
    ]),
  ],
  devServer: {
    contentBase: distPath,
    compress: true,
    port: 9000,
    hot: true,
  }
};
