import * as jark from 'jark'
import store from '../store'

/**
 * Get address from passphrase
 * @param {string} - Passphrase
 * @return {string} Account address
 */
export const getAddressFromPass = (passphrase) => {
  jark.arkjs.crypto.setNetworkVersion(store.getters.networkType.version)
  const keys = jark.arkjs.crypto.getKeys(passphrase)
  return jark.arkjs.crypto.getAddress(keys.publicKey)
}
