/* eslint-disable @next/next/no-img-element */
/* React stuff */
import { useState, useEffect, useContext } from "react"

/* Utils */
import { COLORS, SHADOWS } from "../utils/styles_constants"

/* Styles */
import styled from 'styled-components'

/* Components */
import Button from "./button"

/* Contexts */
import { FundraisersContext } from '../contexts/fundraisers'

/* Contracts services */
import { getFundraiserDataByAddress } from "../services/fundraisers"

const FundraiserCardContainer = styled.article`
  background-color: ${COLORS.background_gray};
  border-radius: 5px;
  color: ${COLORS.black};
  border: 1px solid ${COLORS.black};
  box-shadow: ${SHADOWS.small};
  font-size: 1.1rem;
  display: grid;
  grid-template-rows: 17rem 1fr;
  
  & .card-info-container {
    padding: 1.5rem;
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & p {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;

      & span {
        font-family: SofiaProMedium;
      }
    }
  }

  & .image-container {
    max-height: 17.5rem;
    width: 100%;
    height: 100%;
    display: block !important;
    box-shadow: ${SHADOWS.small};
    overflow: hidden;

    & img {
      border-radius: 5px 5px 0 0;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
`

export default function FundraiserCard({ fundraiser }) {

  const Context: any = useContext(FundraisersContext)
  const [state, setState] = useState({
    name: null,
    description: null,
    imageURL: null,
    address: null
  })

  const getFundraiserData = async fundraiser => {
    try {
      const fundraiserData: any = await getFundraiserDataByAddress(fundraiser)
      setState({
        ...state,
        ...fundraiserData
      })
    }
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFundraiserData(fundraiser)
  }, []);

  return (
    <FundraiserCardContainer>
      <span className="image-container" >
        <img src={state.imageURL} alt='Fundraiser image' />
      </span>
      <div className="card-info-container" >
        <div>
          <h2>{state.name}</h2>
          <p>{state.description}</p>
        </div>
        <div onClick={(e: any) => {e.target.localName === 'a' && Context.setState({ ...Context.state, fundraiser })}} >
          <p><span>Total donations:<br />$173.43 USD → 0.000134 FUN ✨</span></p>
          <Button className="full normal yellow" href={`fundraiser/detail?fundraiser=${state.address}`} link>View more</Button>
        </div>
      </div>
    </FundraiserCardContainer>
  )
}
