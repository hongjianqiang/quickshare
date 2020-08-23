import http from 'http'
import path from 'path'
import { getMime } from './mime-types'
import { HOME, CHARSET } from './env'
import { readable, readFile } from './fs'
import html from '!!raw-loader!../../dist/index.html'
import js from '!!raw-loader!../../dist/.client/index.min.js'
import css from '!!raw-loader!../../dist/.client/index.min.css'

const client = {
  isUIFile (pathname: string) {
    return /(^\/.client\/index.min.js$)|(^\/.client\/index.min.css$)|(^\/.client\/index.html$)/.test(pathname)
  },
  async response (pathname: string, res: http.ServerResponse) {
    if (/^\/.client\/index.min.js$/.test(pathname)) {
      const js = await client.getJS()
      res.writeHead(200, { 'Content-Type': `${getMime('js')};charset=${CHARSET}` })
      res.end(js)
    } else if (/^\/.client\/index.min.css$/.test(pathname)) {
      const css = await client.getCSS()
      res.writeHead(200, { 'Content-Type': `${getMime('css')};charset=${CHARSET}` })
      res.end(css)
    } else {
      const html = await client.getHtml()
      res.writeHead(200, { 'Content-Type': `${getMime('html')};charset=${CHARSET}` })
      res.end(html)
    }
  },
  async getHtml () {
    const absPathname = path.join(HOME, '.client', 'index.html')

    if (await readable(absPathname)) {
      return await readFile(absPathname)
    } else {
      return html
    }
  },
  async getJS () {
    const absPathname = path.join(HOME, '.client', 'index.min.js')

    if (await readable(absPathname)) {
      return await readFile(absPathname)
    } else {
      return js
    }
  },
  async getCSS () {
    const absPathname = path.join(HOME, '.client', 'index.min.css')

    if (await readable(absPathname)) {
      return await readFile(absPathname)
    } else {
      return css
    }
  }
}

export default client
