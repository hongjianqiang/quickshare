import Vue from 'vue'
import router from '@/router'
import App from './App.vue'
import '@/components'
import '@/plugins'

(function (normal, baseFontSize = 100, fontscale = 1) {
  const { document, navigator } = window
  const { documentElement } = document
  const { userAgent } = navigator
  const matches = userAgent.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
  const UCversion = userAgent.match(/U3\/((\d+|\.){5,})/i)
  const isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80
  const isiOS = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)

  let dpr = window.devicePixelRatio || 1

  if (!isiOS && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1
  }

  const scale = normal ? 1 : 1 / dpr

  let metaEl = document.querySelector('meta[name="viewport"]')

  if (!metaEl) {
    metaEl = document.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    document.head.appendChild(metaEl)
  }

  metaEl.setAttribute('content', `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`)

  documentElement.style.fontSize = normal ? '50px' : `${baseFontSize / 2 * dpr * fontscale}px`
})(false, 200, 1)

Object.defineProperty(Vue.prototype, '$zIndex', {
  get () {
    if (!this._zIndex) {
      this._zIndex = 1
    }
    return this._zIndex++
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
