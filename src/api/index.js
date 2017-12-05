import axios from 'axios'
import store from '../store'

/**
 * @property {string} donationAddress - Donation address
 */
export const donationAddress = 'AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ'

/**
 * Get ARK market from cryptocompare
 * @param {string} - Fiat id currency to fetch
 * @return {Promise<Object>} Current fiat price
 */
export const getARKMarket = (fiatCurrencyId) => {
  return axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ARK&tsyms=${fiatCurrencyId}`)
  .then((res) => {
    return res
  })
  .catch((err) => {
    if (err) console.log(err)
  })
}

/**
 * Check if current network is DEV
 * @return {boolean} Is DEV network
 */
export const isDevNetwork = () => {
  return (store.getters.networkType.label === 'Dev')
}

/**
 * Check if current network is MAIN
 * @return {boolean} Is MAIN network
 */
export const isMainNetwork = () => {
  return (store.getters.networkType.label === 'Main')
}
