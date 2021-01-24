export default {
  install (Vue) {
    let vm = null

    Vue.prototype.$alert = function (message, title, options) {
      // alert(message)
    }
  }
}