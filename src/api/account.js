import Mnemonic from 'bitcore-mnemonic'
import arkjs from 'arkjs'
import axios from 'axios'
import store from '../store'
import { getEndpoint } from '../api'

/**
 * Create a new wallet
 * @return {Object} Private/public key pair
 */
export const createWallet = () => {
  let code = new Mnemonic()
  arkjs.crypto.setNetworkVersion(store.getters.networkType.version)
  const keys = arkjs.crypto.getKeys(code.toString())
  const address = arkjs.crypto.getAddress(keys.publicKey)
  return {
    passphrase: code.toString(),
    address: address
  }
}

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

/**
 * Get balance from address
 * @param {string} - Address to get balance
 * @return {Promise<Response>} Balance
 */
export const getBalance = (address) => {
  return axios.get(`${getEndpoint()}/api/accounts/getBalance?address=${address}`)
  .then((res) => {
    return res.data.balance / 100000000
  })
  .catch((err) => {
    if (err) console.log(err)
  })
}

/**
 * Get transaction list
 * @param {string} - Address to get transactions from
 * @return {Promise<Response>} Transactions
 */
export const getTransactions = (address) => {
  return axios.get(`${getEndpoint()}/api/transactions?recipientId=${address}&senderId=${address}`)
  .then((res) => {
    return res.data.transactions.reverse()
  })
  .catch((err) => {
    if (err) console.log(err)
  })
}
