import http from 'http'
import tryUsePort from '../shared/tryUsePort'
import { URLSearch } from './data-types'
import { LOCALHOSTS, HOST, PORT, CHARSET, ROOT_DIR } from './config'

function requestHandler (req, res) {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress
  const { method } = req
  const urlSearch = new URLSearch(req.url)

  console.log(`${method} ${urlSearch} FROM ${clientIP}`)

  res.writeHead(200)
  res.end('Success!')
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
