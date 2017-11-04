import Mnemonic from 'bitcore-mnemonic'
import arkjs from 'arkjs'
import axios from 'axios'
import store from '../store'
import { getNetHash } from '../api'

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

/**
 * Submit transaction to network
 * @param {string} - Address to get transactions
 * @return {Promise<Response>} RPC response from sending transaction
 */
export const sendTransaction = (tx) => {
  return getNetHash()
  .then((nethash) => {
    const data = JSON.stringify({ transactions: [tx] })
    return axios.post('http://167.114.29.52:4002/peer/transactions', data, {
      headers: {
        'Content-Type': 'application/json',
        'version': '0.3.0',
        'port': 1,
        'nethash': nethash
      }
    })
    .then((response) => {
      return response
    })
    .catch((err) => {
      if (err) return err
    })
  })
}
