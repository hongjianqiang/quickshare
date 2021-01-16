const HtmlWebpackPlugin = require('html-webpack-plugin')
const { name } = require('../package.json')

const Options = {
  filename: 'index.html',
  templateContent: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${name.charAt(0).toUpperCase() + name.slice(1)} App</title>
      </head>
      <body>
        <noscript>未开启 JavaScript 将无法使用大部分功能</noscript>
        <div id="app"></div>
      </body>
    </html>
  `,
  minify: true,
  inject: 'body'
}

module.exports = class extends HtmlWebpackPlugin {
  constructor (options) {
    super({
      ...Options,
      ...options
    })
  }
}
