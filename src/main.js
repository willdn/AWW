import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
// Plugins
import VueClipboards from 'vue-clipboards'

Vue.use(VueClipboards)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
