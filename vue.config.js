const { TARGET } = process.env

const config = {
  productionSourceMap: false,
  filenameHashing: false,

  configureWebpack: cfg => {
    cfg.performance = {
      hints: false // 取消打包文件过大的警告
    }

    if (TARGET === 'Server') {
      cfg.target = 'node'
    } else if (TARGET === 'Client') {
      cfg.entry = './src/client/main.ts'
    }
  },

  chainWebpack: cfg => {
    cfg.optimization.delete('splitChunks')

    if (TARGET === 'Server') {
      cfg.module
        .rule('raw-loader')
        .test(/(\.html?$)/i)
        .use('raw-loader')
        .loader('raw-loader')
        .end()
    } else if (TARGET === 'Client') {
      // Client
      cfg.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 10000 })) // 小于 10 KB 的图片转 base64

      cfg.output.filename('.client/index.min.js').end()
    }
  }
}

if (TARGET === 'Server') {
  // 服务端
  config.outputDir = './dist'
} else if (TARGET === 'Client') {
  // 客户端
  config.outputDir = './dist'
  config.css = {
    extract: {
      filename: '.client/index.min.css'
    }
  }
}

module.exports = config
