import store from '../store'

/**
 * @property {string} networkFee - Network fee
 */
export const networkFee = 0.1

/**
 * @property {string} donationAddress - Donation address
 */
export const donationAddress = 'AePNZAAtWhLsGFLXtztGLAPnKm98VVC8tJ'

/**
 * Return API endpoint
 * @return {string} Endpoint
 */
export const getEndpoint = () => {
  if (store.getters.networkType.label === 'Main') return 'https://node1.arknet.cloud'
  if (store.getters.networkType.label === 'Dev') return 'https://dev.arkcoin.net'
}
