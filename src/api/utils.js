export const truncateHash = (str, length) => {
  return `${str.substr(0, length)}...${str.substr(str.length - length, str.length)}`
}
