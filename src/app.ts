import http from 'http'
import Vue from 'vue'
import config from '../package.json'

const renderer = require('vue-server-renderer').createRenderer({
  template:
  '<html lang="zh">' +
  '  <head>' +
  '    <meta charset="UTF-8">' +
  '' +
  '    <!-- 使用双花括号(double-mustache)进行 HTML 转义插值(HTML-escaped interpolation) -->' +
  '    <title>{{ title }}</title>' +
  '' +
  '    <!-- 使用三花括号(triple-mustache)进行 HTML 不转义插值(non-HTML-escaped interpolation) -->' +
  '    {{{ metas }}}' +
  '  </head>' +
  '  <body>' +
  '    <!--vue-ssr-outlet-->' +
  '  </body>' +
  '</html>'
})

const context = {
  title: `${config.name[0].toUpperCase()}${config.name.slice(1)}`,
  metas:
  '  <meta name="keyword" content="vue,ssr">' +
  `  <meta name="description" content="${config.description}">`
}

http.createServer(function (req, res) {
  const app = new Vue({
    data: { url: req.url },
    template: '<div>访问的 URL 是： {{ url }}</div>'
  })

  renderer.renderToString(app, context, (err:any, html:any) => {
    console.log(html)

    if (err) {
      res.end('Internal Server Error')
      return
    }
    res.end(html)
  })
}).listen(2020, () => console.log('服务在运行了'))
