import { addNotification } from './notification'
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
    ''
  )
}
