export default {
  install (Vue) {
    Object.defineProperty(Vue.prototype, '$zIndex', {
      get () {
        if (!this._zIndex) {
          this._zIndex = 1
        }
        return this._zIndex++
      }
    })
  }
}
