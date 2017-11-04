import networkType from '../api/networkType'

const state = {
  network: networkType.TEST,
  blockHeight: 0,
  sendFormVisible: false,
  loading: false,
  transactionSending: false
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
  },
  setLoadingState ({ commit, state }, loadingState) {
    commit('setLoadingState', loadingState)
  },
  setTransactionSending ({ commit, state }, sendingState) {
    commit('setTransactionSending', sendingState)
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
  },
  setLoadingState (state, loadingState) {
    state.loading = loadingState
  },
  setTransactionSending (state, sendingState) {
    state.transactionSending = sendingState
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
