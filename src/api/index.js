import axios from 'axios'
import store from '../store'

/**
 * @property {string} networkFee - Network fee
 */
export const networkFee = 0.1

/**
 * @property {string} donationAddress - Donation address
 */
export const donationAddress = 'AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ'

/**
 * Return API endpoint
 * @return {string} Endpoint
 */
export const getEndpoint = () => {
  if (store.getters.networkType.label === 'Main') return 'https://node1.arknet.cloud'
  if (store.getters.networkType.label === 'Test') return 'https://dev.arkcoin.net'
}

/**
 * Get blockchain height
 * @return {Promise<Response>} Block height
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

/**
 * Get network hash
 * @return {Promise<Response>} Network hash
 */
export const getNetHash = () => {
  return axios.get(`${getEndpoint()}/api/blocks/getNetHash`)
  .then((res) => {
    return res.data.nethash
  })
  .catch((err) => {
    if (err) console.log(err)
  })
}
