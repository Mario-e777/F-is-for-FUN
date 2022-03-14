/* React stuff */
import { useEffect, useState } from 'react'

/* Utils */
import { getWeb3 } from '../utils/scripts'

/* Contracts */
import SimpleStorageContract from "../contracts/SimpleStorage.json"

/* Styles */
import '../styles/globals.css'

/* Contexts */
import { FundraisersContextProvider, FundraisersContext } from '../contexts/fundraisers'

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null
  })

  const initializeWeb3 = async () => {
    try {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const networkId = await web3.eth.net.getId() // Get the contract instance.

      // Get the contract instance.
      const deployedNetwork = SimpleStorageContract.networks[networkId]
      const StorageContract = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      )

      setState({ web3, accounts, contract: StorageContract })
    } catch (error) {
      alert('Failed to load web3, accounts, or contract. Check console for details.')
      console.error(error)
    }
  }

  useEffect(() => {
    initializeWeb3()
  }, [])

  return <FundraisersContextProvider>
    <Component {...pageProps} />
  </FundraisersContextProvider>
}

export default MyApp
