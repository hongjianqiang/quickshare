import path from 'path'
import http from 'http'
// import { URL } from 'url'
import { exists, isFile, isDir } from './fs'
import { LOCALHOSTS, HOST, PORT, CHARSET, HOME } from './env'
import { getMime } from './mime-types'

import html from '../../dist/client/index.html'
import js from '../../dist/client/index.min.js'

async function getClientHtml () {
  console.log(html)
  console.log(js)
  return js
}

async function handleStatic (req: http.IncomingMessage, res: http.ServerResponse) {
  const href = `http://${req.headers.host}${req.url}`
  const url = new URL(href)
  const pathname = decodeURIComponent(url.pathname.replace(/\.\.\//g, ''))
  const absPathname = path.join(HOME, pathname)

  if (await exists(absPathname)) {
    if ((await isDir(absPathname))) {
      // handleDirs(req, res, absPathname)
      const clientHtml = await getClientHtml()

      res.writeHead(200, { 'Content-Type': `${getMime('html')};charset=${CHARSET}` })
      res.end(clientHtml)
    } else if ((await isFile(absPathname))) {
      // handleFiles(req, res, absPathname)
    }
  } else {
    res.writeHead(404, { 'Content-Type': `${getMime('html')};charset=${CHARSET}` })
    res.end('<h1>404 Not Found</h1>')
  }
}

function requestListener (req: http.IncomingMessage, res: http.ServerResponse): void {
  const href = decodeURIComponent(`http://${req.headers.host}${req.url}`)
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress
  const method = req.method

  console.log(method, href, 'FROM', clientIP)

  if (method === 'GET') {
    handleStatic(req, res)
  } else if (method === 'POST') {
    // handleUpload(req, res)
  }
}

http.createServer(requestListener).listen(PORT, HOST, () => {
  console.clear()
  console.log('=================================================\n')
  console.log('You can now view this app in the browser.\n')
  console.log(`  Local:            http://127.0.0.1:${PORT}\n`)

  for (const localhost of LOCALHOSTS) {
    if (localhost !== '127.0.0.1') {
      console.log(`  On Your Network:  http://${localhost}:${PORT}\n`)
    }
  }

  console.log('The service is running.\n')
  console.log('=================================================\n')
})
