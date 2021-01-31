import alert from '@/components/alert'

export default {
  install (Vue) {
    let vm = null

    Vue.prototype.$alert = function (message = '', title = '', options) {
      const propsData = {
        title,
        content: message
      }
  
      if (vm) {
        Object.assign(vm, propsData)
      } else {
        const Alert = Vue.extend(alert)
        vm = new Alert({ propsData }).$mount()
        document.body.append(vm.$el)
      }

      vm.visible = true
    }
  }
}
