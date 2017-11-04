/**
 * Truncate ellipsis hash
 * @param {string} - String to hash
 * @param {number} - Length to hash
 * @return {string} Block height
 */
export const truncateHash = (str, length) => {
  return `${str.substr(0, length)}...${str.substr(str.length - length, str.length)}`
}
