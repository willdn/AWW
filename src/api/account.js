import arkjs from 'arkjs'
import store from '../store'

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
