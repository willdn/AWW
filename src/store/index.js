import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'
import wallet from './wallet'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app,
    wallet
  }
  // strict: debug
})
