import Mnemonic from 'bitcore-mnemonic'
import arkjs from 'arkjs'

/**
 * Create a new wallet
 * @return {Object} Private/public key pair
 */
export const createWallet = () => {
  var code = new Mnemonic()
  const keys = arkjs.crypto.getKeys(code.toString())
  const address = arkjs.crypto.getAddress(keys.publicKey)
  return {
    passphrase: code.toString(),
    address: address
  }
}
