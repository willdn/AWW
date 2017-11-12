import { addNotification } from './notification'
import { getEndpoint } from '../api'
import * as jark from 'jark'
import axios from 'axios'
import store from '../store'
import arkjs from 'arkjs'

/**
 * Validate a transaction
 * @param {Object} - Data to validate
 * @return {boolean} Is transaction valid
 */
export const validateTransaction = (data) => {
  let valid = true
  if (data.passphrase == null || data.passphrase === '') {
    addNotification({
      message: `Passphrase is not valid`,
      color: 'red'
    })
    valid = false
  }
  if (!arkjs.crypto.validateAddress(data.transaction.to)) {
    addNotification({
      message: `Address is not valid`,
      color: 'red'
    })
    valid = false
  }
  return valid
}

/**
 * Make transaction
 * @param {Object} - Transaction parameters
 * @return {Object} Transaction
 */
export const makeTransaction = (data) => {
  let amount = data.transaction.amount * Math.pow(10, 8)
  return arkjs.transaction.createTransaction(
    data.transaction.to,
    amount,
    data.transaction.message,
    data.passphrase,
    null
  )
}

/**
 * Submit transaction to network
 * @param {string} - Address to get transactions
 * @return {Promise<Response>} RPC response from sending transaction
 */
export const sendTransaction = (data) => {
  return jark.getNetHash()
    .then((nethash) => {
      const dataReq = JSON.stringify({ transactions: [data] })
      return axios.post(`${getEndpoint()}/peer/transactions`, dataReq, {
        headers: {
          'Content-Type': 'application/json',
          'version': '0.3.0',
          'port': 1,
          'nethash': nethash
        }
      })
      .then((response) => {
        store.dispatch('setTransactionSending', false)
        store.dispatch('toggleSendForm')
        addNotification({
          message: `Transaction sent`,
          color: 'green'
        })
        return response
      })
      .catch((err) => {
        store.dispatch('setTransactionSending', false)
        addNotification({
          message: err,
          color: 'red'
        })
        if (err) return err
      })
    })
}
