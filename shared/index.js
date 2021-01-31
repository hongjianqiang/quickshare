const net = require('net')

function portInUse(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer().listen(port)

    server.on('listening', () => {
      server.close()
      resolve(port)
    })

    server.on('error', err => err.code === 'EADDRINUSE' && resolve(err))
  })
}

async function tryUsePort (port, portAvailableCallback) {
  const res = await portInUse(port)

  if (res instanceof Error) {
    console.log(`端口：${port} 已被占用\n`)
    port++
    tryUsePort(port, portAvailableCallback)
  } else if (typeof(portAvailableCallback) === 'function') {
    portAvailableCallback(port)
  }
}

module.exports = {
  tryUsePort,
}
