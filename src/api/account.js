import arkjs from 'arkjs'
import axios from 'axios'
import store from '../store'
import { getEndpoint } from '../api'

/**
 * Get address from passphrase
 * @param {string} - Passphrase
 * @return {string} Account address
 */
export const getAddressFromPass = (passphrase) => {
  arkjs.crypto.setNetworkVersion(store.getters.networkType.version)
  const keys = arkjs.crypto.getKeys(passphrase)
  return arkjs.crypto.getAddress(keys.publicKey)
}

/**
 * Get account details
 * @param {string} - Address to get details
 * @return {Promise<Response>} Account details
 */
export const getAccount = (address) => {
  return axios.get(`${getEndpoint()}/api/accounts?address=${address}`)
  .then((res) => {
    return res.account
  })
  .catch((err) => {
    if (err) console.log(err)
  })
}
