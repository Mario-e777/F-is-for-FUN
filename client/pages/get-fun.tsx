/* Compontents */
import Layout from "../components/layout"

/* Modules */
import styled from 'styled-components'

/* Utils */
import { COLORS, SHADOWS } from "../utils/styles_constants"
import Button from "../components/button"

const GetFunContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5rem;

  & h2 {
    color: ${COLORS.black};
  }

  & p {
    max-width: 35rem;
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`

const PriceContainer = styled.div`
  grid-column: 2/3;
  background-color: ${COLORS.background_gray};
  padding: 1.3rem;
  padding-top: 2.4rem;
  padding-bottom: 1.5rem;
  border-radius: 5px;
  color: ${COLORS.black};
  border: 1px solid ${COLORS.black};
  box-shadow: ${SHADOWS.small};
  gap: 1.3rem;
  display: grid;
  flex-direction: column;
  background: linear-gradient(018deg, rgba(255, 255, 255, 0.444) 0%, rgba(255, 255, 255, 0.82) 100%) 0% 0% no-repeat padding-box padding-box transparent;
  backdrop-filter: blur(10px);

  & h2 {
    margin: 0;
    text-align: center;
    font-size: 1.6rem;
  }

  & p {
    margin: 0;
    text-align: center;
  }

  
  & .price-container {
    background: linear-gradient(215deg, #fad0c47b 0%, #f1a7f176 74%) 0% 0% no-repeat padding-box padding-box transparent;
    backdrop-filter: blur(30px);
    box-shadow: ${SHADOWS.small};
    border-radius: 5px;
    border: 1px solid ${COLORS.black};
    padding: 1.3rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    
    & img {
      justify-self: center;
      width: 5rem;
      height: auto;
    }
    
    & p {
      text-align: start;
      font-size: 1.1rem;
    }
  }
`

const PriceSectionContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.5rem;

  & .price-cards-container {
    gap: 1.5rem;
    width: 100%;
    max-width: 1440px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    & span {
      grid-column: 1/2;
      display: flex;
      justify-content: end;
    }
  }
`

export default function GetFun() {
  return (
    <Layout title='Get and yield FUN' >
      <GetFunContainer>
        <h2>Get some FUN</h2>
        <p>Stake your ETH with us and get some FUN, FUN tokens could be donated to any fundraiser, 1 FUN = 100 DAI.</p>
        <PriceSectionContainer>
          <div className="price-cards-container">
            <Button className="normal" color="transparent" href="/" link >{'← Back'}</Button>
            <PriceContainer>
              <h2>Get all the FUN you want 🦄</h2>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt minus recusandae officia illum modi alias.</p>
              <div className='price-container' >
                <img src="https://oasis.app/static/img/tokens/eth.png" alt="" ></img>

                <div style={{ width: '100%' }} >
                  <p>Min 1 ETH</p>
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                    <span>-----------------o----</span>
                    <span>o (Max)</span>
                  </div>
                  <p>You'll get 44,371 FUN</p>
                </div>
              </div>
              <Button className="full normal" color='green' type="button" >Get FUN</Button>
            </PriceContainer>
          </div>
        </PriceSectionContainer>
      </GetFunContainer>
    </Layout>
  )
}
