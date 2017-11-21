import { errorNotification, addNotification } from './notification'
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
    errorNotification('Passphrase is not valid')
    valid = false
  }
  if (!arkjs.crypto.validateAddress(data.transaction.to)) {
    errorNotification('Address is not valid')
    valid = false
  }
  jark.getBalance(store.getters.wallet.address)
    .then((balance) => {
      if (data.transaction.amount > balance) {
        errorNotification('Not enough ARK')
        valid = false
      }
      return valid
    })
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
        errorNotification({
          message: err
        })
        if (err) return err
      })
    })
}
