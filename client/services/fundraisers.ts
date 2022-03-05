/* Contracts */
import FactoryContract from '../contracts/Factory.json'
import FundraiserContract from '../contracts/Fundraiser.json'

/* Utils */
import { getWeb3 } from '../utils/scripts'

interface Fundraiser {
  name: string,
  website: string,
  image: string,
  description: string,
  beneficiary: string,
  donationGoal: number,
  startAt: number,
  endAt: number,
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
        fundraiser.name,
        fundraiser.website,
        fundraiser.image,
        fundraiser.description,
        fundraiser.beneficiary,
        fundraiser.donationGoal,
        fundraiser.startAt,
        fundraiser.endAt
      ).send({ from: fundraiser.beneficiary })

      resolve('Fundraiser created')
    } catch (error) {
      reject(error)
    }
  })
}

const getFundraiserDataByAddress = (fundraiser: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const web3 = await getWeb3()
      const instance = new web3.eth.Contract(
        FundraiserContract.abi,
        fundraiser,
      )

      const name = await instance.methods.name().call()
      const siteURL = await instance.methods.siteURL().call()
      const imageURL = await instance.methods.imageURL().call()
      const description = await instance.methods.description().call()
      const beneficiary = await instance.methods.beneficiary().call()
      const totalDonations = await instance.methods.totalDonations().call()
      const donationsCount = await instance.methods.donationsCount().call()
      const donationGoal = await instance.methods.donationGoal().call()
      const startAt = await instance.methods.startAt().call()
      const endAt = await instance.methods.endAt().call()

      resolve({
        address: fundraiser,
        name,
        siteURL,
        imageURL,
        description,
        beneficiary,
        totalDonations,
        donationsCount,
        donationGoal,
        startAt,
        endAt
      })
    } catch (error) {
      reject(error)
    }
  })
}

export {
  getFundraisers,
  createFundraiser,
  totalFundraisers,
  getFundraiserDataByAddress,
}