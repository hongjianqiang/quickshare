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
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
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
