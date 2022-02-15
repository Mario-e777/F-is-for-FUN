/* React stuff */
import { useEffect, useState } from 'react';

/* Utils */
import getWeb3 from '../scripts/getWeb3';

/* Contracts */
import SimpleStorageContract from "../contracts/SimpleStorage.json";

/* Styles */
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [state, setState] = useState({
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null
  });

  const initializeWeb3 = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId(); // Get the contract instance.

      console.log(accounts)
      console.log(networkId)

      // Get the contract instance.
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const StorageContract = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

        console.log(deployedNetwork)
        console.log(StorageContract)

      setState({ web3, accounts, contract: StorageContract });
    } catch (error) {
      alert('Failed to load web3, accounts, or contract. Check console for details.');
      console.error(error);
    };
  }

  const runExample = async () => {
    const { accounts, contract } = state;
    await contract.methods.set(5).send({ from: accounts[0] });
    const response = await contract.methods.get().call();
    setState({ storageValue: response });
  }

  useEffect(() => {
    initializeWeb3();
  }, []);
  /* useEffect(() => {
    state.contract && runExample();
  }, [state.contract]); */
  return <Component {...pageProps} />
}

export default MyApp
