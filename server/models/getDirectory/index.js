export default function (req, res, query, params) {
  console.log('进来了')
  console.log(query, params)

  setTimeout(() => {
    res.writeHead(200)
    res.end('{}')
  }, 1*1000)
}
