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
  padding-bottom: 1.5rem;

  & form {
    width: 100%;
    max-width: 35rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    & label {
      font-size: 1.1rem;
      color: ${COLORS.black};
      & p {
        margin-bottom: 0.4rem;
        color: ${COLORS.black};

        & span {
          font-size: 0.9rem;
        }
      }
      
      & input, textarea {
        width: 100%;
        font-size: 1.02rem;
        padding: 1rem 1.1rem;
        border-radius: 5px;
        border: 1px solid ${COLORS.black};
        font-family: SofiaProRegular;
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

    & .full-grid {
      grid-column: 1/3;
    }

    & .description-container {
      grid-column: 1/3;

      & textarea {
        height: 11rem;
        resize: none;
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
            <p>Fundraiser`s name <span>*</span></p>
            <input ref={ContractName} placeholder="The Bacon Pancake Fundraiser" type='text' required />
          </label>
          <label>
            <p>Website <span>*</span></p>
            <input ref={ContractWebsite} placeholder="https://mysite.com" type='text' required />
          </label>
          <label className='full-grid' >
            <p>Image url <span>*</span></p>
            <input ref={ContractImage} placeholder="https://mysite.com/image.png" type='text' required />
          </label>
          <label className='full-grid' >
            <p>Beneficiary Address <span>*</span></p>
            <input ref={ContractBeneficiary} placeholder="0x0000000.." type='text' required />
          </label>
          <label className='full-grid' >
            <p>Owner address <span>*</span></p>
            <input ref={ContractOwner} placeholder="0x0000000.." type='text' required />
          </label>
          <label className='description-container' >
            <p>Description <span>*</span></p>
            <textarea ref={ContractDescription} placeholder="Fundraising to buy much more bacon and prepare with pancakes :p" required />
          </label>
          <Button href='/' link color='red' >Cancel</Button>
          <Button type='submit' color='green' >Create fundraiser</Button>
        </form>
      </NewFundraiserContainer>
    </Layout>
  )
}
