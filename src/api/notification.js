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
 * Create a success notification
 * @param {string} - Notification's message
 */
export const successNotification = (message) => {
  addNotification({
    color: 'green',
    message: `${message}`
  })
}

/**
 * Create an error notification
 * @param {string} - Notification's message
 */
export const errorNotification = (message) => {
  addNotification({
    color: 'red',
    message: `${message}`
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
