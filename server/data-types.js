const privateVariable = new WeakMap()

export class URLSearch {
  constructor (url) {
    privateVariable.set(this, {
      url: decodeURIComponent(url)
    })
  }

  get query () {
    const { url } = privateVariable.get(this)
    const result = {}

    url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => result[k] = v)

    return result
  }

  toString () {
    const { url } = privateVariable.get(this)
    return url
  }
}
