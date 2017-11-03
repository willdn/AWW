const state = {
  open: false,
  address: null
}

// getters
const getters = {
  wallet: state => state
}

// actions
const actions = {
  openWallet ({ commit, state }, address) {
    commit('openWallet', address)
  }
}

// mutations
const mutations = {
  openWallet (state, address) {
    state.open = true
    state.address = address
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
