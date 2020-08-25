import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import {
  Breadcrumb, BreadcrumbItem,
  Button,
  Table, TableColumn,
  Link
} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Link)

new Vue({
  render: h => h(App)
}).$mount('#app')
