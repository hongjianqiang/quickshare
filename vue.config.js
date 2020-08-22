module.exports = {
  outputDir: 'client',

  productionSourceMap: false,

  configureWebpack: {
    entry: './src/client.ts',
    output: {
      filename: 'index.js'
    }
  },

  chainWebpack: config => {
    config.optimization.delete('splitChunks')

    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 })) // 小于 10 KB 的图片转 base64
  },

  css: {
    extract: false // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
  }
}
