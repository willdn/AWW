import iziToast from 'izitoast'

/**
 * Create a notification
 * @param {string} - Notification's message
 */
export const addNotification = (options) => {
  iziToast.show({
    message: `<b>${options.message}</b>`,
    color: options.color,
    position: 'bottomCenter',
    timeout: 3000,
    transitionIn: 'bounceInUp'
  })
}

/**
 * Create an error notification
 * @param {string} - Notification's message
 */
export const errorNotification = (message) => {
  addNotification({
    color: 'red',
    message: `<b>${message}</b>`
  })
}

/**
 * Create a clipboard success notification
 * @param {string} - Notification's message
 */
export const clipboardNotification = () => {
  addNotification({
    message: `Copied in clipboard`,
    color: 'blue'
  })
}
