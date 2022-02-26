/* React & next stuff */
import { useState, useEffect } from 'react'

/* Modules */
import styled from 'styled-components'

/* Components */
import Layout from '../components/layout'
import FundraiserCard from '../components/fundraiser-card'
import Paginator from '../components/paginator'

/* Utils */
import { COLORS, SHADOWS } from '../utils/styles_constants'
import Button from '../components/button'

/* Contracts services */
import { getFundraisers, totalFundraisers } from '../services/fundraisers'

/* Styled components */
const HomeContainer = styled.section`
  height: fit-content;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: fit-content 1fr;
  overflow: scroll;

  & .top-container {
    display: flex;
    justify-content: center;
    width: calc(100vw - 1.5rem);

    & .head-container {
      height: 100%;
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
        text-align: center;
        line-height: 1.7rem;
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
  width: 100%;
  max-width: 27rem;
  justify-self: center;

  & .input-container {
    position: relative;
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

  & .buttons-container {
    width: 100%;
    display: flex;
  }
`

export default function Home() {
  const [state, setState] = useState({
    accounts: [],
    fundraisers: null,
    funTotal: null,
    currentPage: 1,
    totalFundraisers: 0
  })

  const FundraisersCards = () => state.accounts.length > 0
    && state.fundraisers.map(fundraiser =>
      <FundraiserCard key={`${fundraiser}`} fundraiser={fundraiser} />
    )

  /* Effects */
  useEffect(() => {
    getFundraisers({ getBy: 6, offset: ((state.currentPage * 6) - 6) })
      .then((FUNDRAISERS: Object) => {
        /* TODO: check for page pased by url */
        totalFundraisers()
          .then(total => setState({ ...state, totalFundraisers: parseInt(total.totalFundraisers), ...FUNDRAISERS }))
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error))
  }, [state.currentPage,])

  return (
    <Layout title={'Home'} >
      <HomeContainer>

        <div className='top-container'>
          <div className='head-container'>
            <div className='currency-total eth' >{state.totalFundraisers} Fundraisers created <br/> 1,223,549 FUN accumulated</div>
            <TitleContainer>
              <span className='input-container' >
                <span>🔎</span>
                <input type='text' placeholder='Search fundraiser' />
              </span>
              <div className='buttons-container' >
                <Button className='normal green' href='fundraiser/new' link >Create fundraiser</Button>
                <Button className='normal blue' href='get-fun' link >Get some FUN</Button>
              </div>
            </TitleContainer>
            <div className='currency-total fun' >{/* {state.funTotal} */} 0.0137 ETH <br/> 3,471 FUN available</div>
          </div>
        </div>

        <Paginator pageState={state} pageSetState={setState} />

        <div className='cards-container'>
          {FundraisersCards()}
        </div>
      </HomeContainer>
    </Layout>
  )
}
