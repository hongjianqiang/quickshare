import http from 'http'
import { match } from 'path-to-regexp'
import { tryUsePort } from '../shared'
import { URLSearch } from './data-types'
import { LOCALHOSTS, HOST, PORT, CHARSET, BASE_DIR } from './config'
import { routes } from './router/index'

function requestHandler (req, res) {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress
  const { method } = req
  const urlSearch = new URLSearch(req.url)

  console.log(`${method} ${urlSearch} FROM ${clientIP}`)

  const route = routes.find(route => {
    if (method.toUpperCase() === route.method?.toUpperCase()) {
      return match(route.path, { decode: decodeURIComponent })(urlSearch.pathname)
    } else {
      return false
    }
  })

  if (route) {
    const { query } = urlSearch
    const { controller } = route
    const { params } = match(route.path, { decode: decodeURIComponent })(urlSearch.pathname)

    controller().then(module => {
      res.writeHead(200)
      module.default({ req, res, query, params })
    })
  }
}

tryUsePort(PORT, port => {
  http.createServer(requestHandler).listen(port, HOST, () => {
    console.clear();
    console.log('=================================================\n');
    console.log('You can now view this app in the browser.\n');
    console.log(`  Local:            http://127.0.0.1:${port}\n`);
  
    for (const localhost of LOCALHOSTS) {
      if (localhost !== '127.0.0.1') {
        console.log(`  On Your Network:  http://${localhost}:${port}\n`);
      }
    }
  
    console.log('The service is running.\n');
    console.log('=================================================\n');
  })
})
