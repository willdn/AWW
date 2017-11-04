const networkType = {
  MAIN: 'Main',
  TEST: 'Test'
}

const state = {
  network: networkType.TEST,
  blockHeight: 0,
  sendFormVisible: false
}

// getters
const getters = {
  app: state => state,
  networkType: state => state.network,
  blockHeight: state => state.blockHeight
}

// actions
const actions = {
  switchNetwork ({ commit, state }) {
    commit('switchNetwork')
    commit('closeWallet')
  },
  toggleSendForm ({ commit, state }) {
    commit('toggleSendForm')
  },
  setDBHeight ({ commit, state }, blockHeight) {
    commit('setDBHeight', blockHeight)
  }
}

// mutations
const mutations = {
  switchNetwork (state) {
    if (state.network === networkType.MAIN) {
      state.network = networkType.TEST
    } else if (state.network === networkType.TEST) {
      state.network = networkType.MAIN
    }
  },
  toggleSendForm (state) {
    state.sendFormVisible = !state.sendFormVisible
  },
  setDBHeight (state, blockHeight) {
    state.blockHeight = blockHeight
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
