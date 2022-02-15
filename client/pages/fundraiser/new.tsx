/* React stuff */
import { useState, useEffect, FormEvent, useRef } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

/* Components */
import Layout from "../../components/layout"

/* Contracts */
import FactoryContract from '../../contracts/Factory.json'

/* Utils */
import { COLORS, SHADOWS } from '../../utils/colors'
import { TRANSITIONS } from '../../utils/colors'
import getWeb3 from '../../scripts/getWeb3'
import Button from '../../components/button'

const NewFundraiserContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  & form {
    width: 100%;
    max-width: 34rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    & label {
      font-size: 1.1rem;
      color: ${COLORS.black};
      & p {
        margin-bottom: 0.4rem;
        color: ${COLORS.black};
      }
      
      & input {
        width: 100%;
        font-size: 1.02rem;
        padding: 1rem 1.1rem;
        border-radius: 5px;
        border: 1px solid ${COLORS.black};
      }
    }

    & .green {
      background-color: ${COLORS.green_light};
    }
    & .blue {
      background-color: ${COLORS.blue_light};
    }
    & .red {
      background-color: ${COLORS.red_light};
    }

    &> a {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.1rem 1.3rem;
      color: ${COLORS.black};
      border: 1px solid ${COLORS.black};
      border-radius: 3px;
      font-size: 1.1rem;
      transition-duration: ${TRANSITIONS.normal};
      white-space: nowrap;
      box-shadow: ${SHADOWS.small};
      font-family: SofiaProMedium;

      &:hover {
        box-shadow: ${SHADOWS.medium};
      }
    }
  }

  & h2 {
    color: ${COLORS.black};
  }
`

export default function New() {
  const ContractName = useRef(null)
  const ContractWebsite = useRef(null)
  const ContractImage = useRef(null)
  const ContractDescription = useRef(null)
  const ContractBeneficiary = useRef(null)
  const ContractOwner = useRef(null)

  const [state, setState] = useState({
    web3: null,
    contract: null,
    accounts: [],
  })

  /* Functions */
  const createNewFundraiser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await state.contract.methods.createFundraiser(
      ContractName.current.value,
      ContractWebsite.current.value,
      ContractImage.current.value,
      ContractDescription.current.value,
      ContractBeneficiary.current.value,
    ).send({ from: ContractOwner.current.value })
    alert('Successfully created fundraiser')
  }

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3()
        const networkId = await web3.eth.net.getId()
        const deployedNetwork = FactoryContract.networks[networkId]
        const accounts = await web3.eth.getAccounts()
        const instance = new web3.eth.Contract(
          FactoryContract.abi,
          deployedNetwork && deployedNetwork.address,
        )
        setState({ ...state, web3, contract: instance, accounts })
      } catch (error) {
        alert('Failed to load web3, accounts, or contract. Check console for details.');
        console.error(error);
      }
    }
    init();
  }, []);

  return (
    <Layout title='New Fundraiser' >
      <NewFundraiserContainer>
        <h2>Create fundraiser</h2>
        <form onSubmit={e => createNewFundraiser(e)} >
          <label>
            <p>Fundraise's name</p>
            <input ref={ContractName} placeholder="Fundraiser Name" type='text' required />
          </label>
          <label>
            <p>Website</p>
            <input ref={ContractWebsite} placeholder="Fundraiser Website" type='text' required />
          </label>
          <label>
            <p>Description</p>
            <input ref={ContractDescription} placeholder="Fundraiser Description" type='text' required />
          </label>
          <label>
            <p>Image url</p>
            <input ref={ContractImage} placeholder="Fundraiser Image" type='text' required />
          </label>
          <label>
            <p>Beneficiary address</p>
            <input ref={ContractBeneficiary} placeholder="Fundraiser Ethereum Address" type='text' required />
          </label>
          <label>
            <p>Owner address</p>
            <input ref={ContractOwner} placeholder="Fundraiser owner" type='text' required />
          </label>
          <Button href='/' link color='red' >Cancel</Button>
          <Button type='submit' color='green' >Create fundraiser</Button>
        </form>
      </NewFundraiserContainer>
    </Layout>
  )
}
