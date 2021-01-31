import loading from '@/components/loading'

export default {
  install (Vue) {
    Vue.prototype.$loading = function () {
      const propsData = { visible: true }
      const Loading = Vue.extend(loading)
      const vm = new Loading({ propsData }).$mount()
      
      document.body.append(vm.$el)

      return () => {
        vm.$el.remove()
        vm.$destroy()
      }
    }
  }
}
