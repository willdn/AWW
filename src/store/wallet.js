const defaultState = {
  open: false,
  address: null
}

const state = defaultState

// getters
const getters = {
  wallet: state => state
}

// actions
const actions = {
  openWallet ({ commit, state }, address) {
    commit('openWallet', address)
  },
  closeWallet ({ commit, state }) {
    commit('closeWallet')
  }
}

// mutations
const mutations = {
  openWallet (state, address) {
    state.open = true
    state.address = address
  },
  closeWallet (state) {
    state.open = false
    state.address = null
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
