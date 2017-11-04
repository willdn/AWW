import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
// Plugins
import VueClipboards from 'vue-clipboards'
import VModal from 'vue-js-modal'

Vue.use(VueClipboards)
Vue.use(VModal)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
