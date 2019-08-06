import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import components from "./components"

Vue.use(components)
Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
