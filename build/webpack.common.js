const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = require('../package.json')

module.exports = {
  entry: './src/app.ts',
  target: 'node',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/, loader: 'ts-loader'
    }, {
      test: /\.html?$/i, loader: 'raw-loader'
    }]
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: `${config.name}.js`
  }
}
