import axios from 'axios'
import store from '../store'

/**
 * Create a new wallet
 * @return {Object} Private/public key pair
 */
export const getEndpoint = () => {
  if (store.getters.networkType === 'Main') return 'https://node1.arknet.cloud'
  if (store.getters.networkType === 'Test') return 'http://167.114.29.52:4002'
}

/**
 * Create a new wallet
 * @return {Object} Private/public key pair
 */
export const getBlocksHeight = () => {
  return axios.get(`${getEndpoint()}/api/blocks/getHeight`)
  .then((res) => {
    return res.data.height
  })
  .catch((err) => {
    if (err) console.log(err)
  })
}
