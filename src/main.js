import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import axios from 'axios'
import routes from './routes'
import 'mint-ui/lib/style.css'
import './style.scss'
import './mint-style.scss'

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

const router = new VueRouter({
	routes,
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
