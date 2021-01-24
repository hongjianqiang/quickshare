export default {
  install (Vue) {
    Vue.prototype.$fetch = function (url, { method = 'GET', header = {}, onprogress = null, body = null, responseType = 'json' , timeout = Infinity } = {}) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        Object.entries(header).map(([name, value]) => xhr.setRequestHeader(name, value))

        xhr.timeout = timeout
        xhr.responseType = responseType
        xhr.onload = () => {
          const { status, statusText, response } = xhr

          if (200 <= status && status < 300) {
            resolve(response)
          } else if (400 <= status && status < 500) {
            const errorText = `${status} ${statusText}`
            this.$alert(errorText, '错误', {
              type: 'error'
            })
            reject(new ReferenceError(errorText))
          } else if (500 <= status) { 
            reject(response)
          }
        }
        xhr.onprogress = onprogress
        xhr.onerror = reject

        xhr.open(method, url)
        xhr.send(body)
      })
    }
  }
}
