import Web3 from "web3"

const getWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      try {
        await window.ethereum.enable()
        resolve(web3)
      } catch (error) {
        reject(error)
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      const web3 = window.web3
      resolve(web3)
    }
    else {
      const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545")
      const web3 = new Web3(provider)
      resolve(web3)
    }
  })
}

export { getWeb3 }
