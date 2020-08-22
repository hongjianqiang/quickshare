import http from 'http'

http.createServer(function (request, response) {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hi~~~')
}).listen(8888)

console.log('服务器正在运行了')
