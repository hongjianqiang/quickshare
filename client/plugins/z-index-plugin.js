let zIndex = 0

export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$zIndex', {
      get () {
        return zIndex++
      }
    })
  }
}
