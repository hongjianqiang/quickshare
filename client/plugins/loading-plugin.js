import loading from '@/components/loading'

export default {
  install (Vue) {
    let vm = null

    Vue.prototype.$loading = function () {
      const propsData = {
        visible: true
      }

      if (vm) {
        Object.assign(vm, propsData)
      } else {
        const Loading = Vue.extend(loading)
        vm = new Loading({ propsData }).$mount()
        document.body.append(vm.$el)
      }

      return () => (vm.visible = false)
    }
  }
}
