/* React & next stuff */
import { useState, useEffect } from 'react'
import Link from "next/link"

/* Modules */
import styled from 'styled-components'

/* Contracts */
import FactoryContract from '../contracts/Factory.json'

/* Components */
import Layout from '../components/layout'
import FundraiserCard from '../components/fundraiser-card'
import Paginator from '../components/paginator'

/* Utils */
import { COLORS, SHADOWS, TRANSITIONS } from '../utils/colors'
import getWeb3 from '../scripts/getWeb3'
import Button from '../components/button'

/* Styled components */
const HomeContainer = styled.section`
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: fit-content 1fr;
  overflow: scroll;

  & nav {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-size: 1.3rem;
    column-gap: 0.8rem;

    & span {
      opacity: 0.5;
      &:hover {
        opacity: 1;
        cursor: pointer;
        color: ${COLORS.black};
      }
    }

    & a {
      opacity: 0.5;
      transition-duration: ${TRANSITIONS.normal};

      &.selected {
        opacity: 1;
        text-decoration-line: underline;
        color: ${COLORS.black};
      }

      &:hover {
        color: ${COLORS.black};
        opacity: 1;
        text-decoration-line: underline;
      }
    }
  }

  & .top-container {
    width: 100vw;
    display: flex;
    justify-content: center;

    & .head-container {
      height: 100%;
      width: calc(100vw - 1.5rem);
      display: grid;
      grid-template-columns: 1fr minmax(29rem, 1fr) 1fr;

      & .currency-total {
        justify-self: center;
        align-items: center;
        padding-top: 1.5rem;
        height: fit-content;
        font-size: 1.25rem;
        color: ${COLORS.black};
        font-family: SofiaProMedium;
      }
    }
  }

  & .cards-container {
    height: fit-content;
    width: 100vw;
    max-width: 1440px;
    justify-self: center;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
    gap: 1.5rem;
  }
`

const TitleContainer = styled.div`
  grid-column: 2/3;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1.5rem 1.5rem 1.5rem;
  z-index: +1;
  flex-direction: column;
  
  & .input-container {
    position: relative;
    max-width: 24rem;
    width: 100%;
    display: flex;
    align-items: center;
    
    & span {
      position: absolute;
      right: 1.4rem;
      font-size: 1.1rem;
    }
  }

  & input {
    width: 100%;
    max-width: 24rem;
    padding: 1.1rem 3rem 1.1rem 1.3rem;
    border: 1px solid ${COLORS.black};
    border-radius: 100px;
    box-shadow: ${SHADOWS.small};
    font-size: 1.04rem;
    background-color: ${COLORS.background_gray};
  }
  
  & div {
    margin-top: 1rem;
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`

export default function Home() {
  const [state, setState] = useState({
    contract: null,
    accounts: [],
    fundraisers: null,
    funTotal: null
  })

  /* Functions */
  const getFundraisers = async ({ getBy, offset }: { getBy: number, offset: number }) => {
    try {
      const web3 = await getWeb3()
      const networkId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()
      const funTotal = parseFloat(web3.utils.fromWei(await web3.eth.getBalance(accounts[0]), 'Ether')).toFixed(2)
      const deployedNetwork = FactoryContract.networks[networkId]
      const instance = new web3.eth.Contract(
        FactoryContract.abi,
        deployedNetwork && deployedNetwork.address,
      )

      const fundraisers = await instance.methods.fundraisers(getBy, offset).call()
      setState({ ...state, contract: instance, accounts, fundraisers, funTotal })
    }
    catch (error) {
      alert('Failed to load web3, accounts, or contract. Check console for details.')
      console.error(error)
    }
  }

  const FundraisersCards = () => {
    return state.accounts.length > 0 && state.fundraisers.map((fundraiser) => {
      return (
        <FundraiserCard key={`${fundraiser}`} fundraiser={fundraiser} />
      )
    })
  }

  /* Effects */
  useEffect(() => {
    getFundraisers({ getBy: 10, offset: 0 })
  }, [])

  return (
    <Layout title={'Home'} >
      <HomeContainer>

        <div className='top-container'>
          <div className='head-container'>
            <div className='currency-total eth' >0.00 ETH</div>
            <TitleContainer>
              <span className='input-container' >
                <span>🔎</span>
                <input type='text' placeholder='Search fundraiser' />
              </span>
              <div>
                <Button href='fundraiser/new' link color='green' >Create fundraiser</Button>
                <Button href='fundraiser/new' link color='blue' >Get & yield FUN</Button>
              </div>
            </TitleContainer>
            <div className='currency-total fun' >{state.funTotal} FUN</div>
          </div>
        </div>

        <Paginator />

        <div className='cards-container'>
          {FundraisersCards()}
        </div>
      </HomeContainer>
    </Layout>
  )
}
