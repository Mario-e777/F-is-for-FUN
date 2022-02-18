/* Contracts */
import FactoryContract from '../contracts/Factory.json'

/* Utils */
import { getWeb3 } from '../utils/scripts'

const getFundraisers = ({ getBy, offset }: { getBy: number, offset: number }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const web3 = await getWeb3()
      const networkId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()
      const funTotal = parseFloat(web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'Ether')).toFixed(2)
      const deployedNetwork = FactoryContract.networks[networkId]
      const contract = new web3.eth.Contract(
        FactoryContract.abi,
        deployedNetwork && deployedNetwork.address,
      )

      const fundraisers = await contract.methods.fundraisers(getBy, offset).call()

      resolve({
        contract,
        accounts,
        fundraisers,
        funTotal
      })
    } catch (error) {
      reject('Failed to load web3, accounts, or contract. Check console for details.')
    }
  })
}

export {
  getFundraisers
}