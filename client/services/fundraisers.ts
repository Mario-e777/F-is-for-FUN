/* Contracts */
import FactoryContract from '../contracts/Factory.json'

/* Utils */
import { getWeb3 } from '../utils/scripts'

interface Fundraiser {
  contract_name: string,
  contract_website: string,
  contract_image: string,
  contract_description: string,
  contract_beneficiary: string,
  contract_owner: string,
}

const getAccountsAndContracts = async () => {
  const web3 = await getWeb3()
  const networkId = await web3.eth.net.getId()
  const accounts = await web3.eth.getAccounts()
  const deployedNetwork = FactoryContract.networks[networkId]
  const contract = new web3.eth.Contract(
    FactoryContract.abi,
    deployedNetwork && deployedNetwork.address,
  )

  return { accounts, contract }
}

const totalFundraisers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { contract } = await getAccountsAndContracts()
      const totalFundraisers = await contract.methods.fundraisersCount().call()

      resolve({
        totalFundraisers
      })
    } catch (error) {
      reject(error)
    }
  })
}


const getFundraisers = ({ getBy, offset }: { getBy: number, offset: number }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { utils, eth } = await getWeb3()
      const { accounts, contract } = await getAccountsAndContracts()
      const funTotal = parseFloat(utils.fromWei(await eth.getBalance(accounts[0]), 'Ether')).toFixed(2)
      const fundraisers = await contract.methods.fundraisers(getBy, offset).call()

      resolve({
        accounts,
        fundraisers,
        funTotal
      })
    } catch (error) {
      reject(error)
    }
  })
}

const createFundraiser = (fundraiser: Fundraiser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { contract } = await getAccountsAndContracts()
      await contract.methods.createFundraiser(
        fundraiser.contract_name,
        fundraiser.contract_website,
        fundraiser.contract_image,
        fundraiser.contract_description,
        fundraiser.contract_beneficiary,
      ).send({ from: fundraiser.contract_owner })

      resolve('Fundraiser created')
    } catch (error) {
      reject(error)
    }
  })
}

export {
  getFundraisers,
  createFundraiser,
  totalFundraisers
}