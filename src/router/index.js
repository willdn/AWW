import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load (component) {
  return () => System.import(`../components/${component}.vue`)
}

export default new Router({
  hashbang: false,
  routes: [
    {
      path: '/',
      name: 'Main',
      component: load('Main')
    },
    {
      path: '/new-wallet',
      name: 'NewWallet',
      component: load('NewWallet')
    },
    {
      path: '/open-wallet',
      name: 'OpenWallet',
      component: load('OpenWallet')
    },
    {
      path: '/wallet',
      name: 'Wallet',
      component: load('Wallet')
    }
  ]
})
