import axios from 'axios'
import moment from 'moment'
import store from '../store'

/**
 * @property {String} donationAddress - Donation address
 */
export const donationAddress = 'AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ'

/**
 * Get ARK market from cryptocompare
 * @param {String} fiatCurrencyId - Fiat id currency to fetch
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
 * Return human readable string for timestamp
 * @param {Number} timestamp - Timestamp to display
 * @return {String} Current fiat price
 */
export const dateFromNow = (timestamp) => {
  const date = new Date(Date.UTC(2017, 2, 21, 13, 0, 0, 0))
  const t = Math.floor(date.getTime() / 1000) * 1000
  return moment(t + timestamp * 1000).fromNow()
}

/**
 * Check if current network is DEV
 * @return {Boolean} Is DEV network
 */
export const isDevNetwork = () => {
  return (store.getters.networkType.label === 'Dev')
}

/**
 * Check if current network is MAIN
 * @return {Boolean} Is MAIN network
 */
export const isMainNetwork = () => {
  return (store.getters.networkType.label === 'Main')
}
