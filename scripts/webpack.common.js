const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = require('../package.json')

module.exports = {
  entry: './src/app.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  output: {
    filename: `${config.name}.js`,
    path: path.resolve(__dirname, '..', 'dist')
  }
}
