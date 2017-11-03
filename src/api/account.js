import Mnemonic from 'bitcore-mnemonic'
import arkjs from 'arkjs'
import axios from 'axios'
import store from '../store'

/**
 * Create a new wallet
 * @return {Object} Private/public key pair
 */
export const createWallet = () => {
  let code = new Mnemonic()
  arkjs.crypto.setNetworkVersion(0x1e)
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
  arkjs.crypto.setNetworkVersion(0x1e)
  const keys = arkjs.crypto.getKeys(passphrase)
  return arkjs.crypto.getAddress(keys.publicKey)
}

/**
 * Create a new wallet
 * @return {Object} Private/public key pair
 */
export const getEndpoint = () => {
  if (store.getters.networkType === 'Main') return 'https://node1.arknet.cloud'
  if (store.getters.networkType === 'Test') return 'http://167.114.29.52:4002'
}

/**
 * Get account details
 * @param - Address to get details
 * @return {Object} Account details
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
 * @param - Address to get balance
 * @return {number} Balance
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
 * @param - Address to get transactions
 * @return {Array} Transactions
 */
export const getTransactions = (address) => {
  return axios.get(`${getEndpoint()}/api/transactions?recipientId=${address}&senderId=${address}`)
  .then((res) => {
    return res.data.transactions
  })
  .catch((err) => {
    if (err) console.log(err)
  })
}
