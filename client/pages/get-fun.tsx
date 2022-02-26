/* Compontents */
import Layout from "../components/layout"

/* Modules */
import styled from 'styled-components'

/* Utils */
import { COLORS, SHADOWS } from "../utils/styles_constants"
import Button from "../components/button"
import FormLayout from "../components/form-layout"
import Image from "next/image"

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
  background: linear-gradient(018deg, rgba(255, 255, 255, 0.73) 0%, rgba(255, 255, 255, 0.83) 100%) 0% 0% no-repeat padding-box padding-box transparent;
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
    /* border: 1px solid ${COLORS.black}; */
    padding: 1.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;
    
    & p {
      text-align: start;
      font-size: 1.1rem;
    }

    & .price-convertor-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      
      & div {
        width: 100%; 
        display: flex; 
        justify-content: space-between;
        gap: 0.9rem;

        & button {
          white-space: nowrap;
        }

        & input {
          border-radius: 5px;
          border: none;
          width: 100%;
          box-shadow: ${SHADOWS.small};
          padding: 1.1rem 1.3rem;
          font-size: 1rem;
          border: 1px solid ${COLORS.black};
        }
      }
    }

    & .input-container {
      display: flex;
      width: 100%;
      gap: 1.3rem;
      /* flex-direction: column; */

      & .image-container {
        min-width: 6.43rem;
        height: auto;

        & .coin-image {
          justify-self: center;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`

export default function GetFun() {
  return (
    <Layout title='Get and yield FUN' >
      <GetFunContainer>
        <h2>Get some FUN</h2>
        <p>Swap your ETH and get some FUN, once you get FUN it could be donated to any fundraiser, 1 FUN = 100 DAI.</p>
        <FormLayout>
          <PriceContainer>
            <h2>Get all the FUN you want 🦄</h2>
            <div>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              <p>1ETH = 34,237 DAI = 342.37 FUN</p>
            </div>
            <div className='price-container' >
              <div className="input-container">
                <div className="image-container">
                  <Image
                    className="coin-image"
                    src="https://oasis.app/static/img/tokens/eth.png"
                    alt=""
                    width={0}
                    height={0}
                    layout="responsive"
                  />
                </div>
                <div className="price-convertor-container" >
                  <p>Min 1 ETH</p>
                  <div>
                    <input placeholder="1.00 ETH" type='number' />
                    <Button className="mini yellow" type="button" >Max</Button>
                  </div>
                </div>
              </div>
              <div className="input-container">
                <div className="image-container">
                  <Image
                    className="coin-image"
                    src="https://oasis.app/static/img/tokens/eth.png"
                    alt=""
                    width={0}
                    height={0}
                    layout="responsive"
                  />
                </div>
                <div className="price-convertor-container" >
                  <p>You'll get</p>
                  <div>
                    <input placeholder='777.00 FUN' type='number' />
                  </div>
                </div>
              </div>
              <Button className="full normal green" type="button" >Get FUN</Button>
            </div>
          </PriceContainer>
        </FormLayout>
      </GetFunContainer>
    </Layout>
  )
}
