const privateVar = new WeakMap()

export class URLSearch {
  constructor (url) {
    privateVar.set(this, {
      url: decodeURIComponent(url)
    })
  }

  get query () {
    const { url } = privateVar.get(this)
    const result = {}

    url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => result[k] = v)

    return result
  }

  get pathname () {
    const { url } = privateVar.get(this)
    return url.split('?')[0]
  }

  toString () {
    const { url } = privateVar.get(this)
    return url
  }
}
