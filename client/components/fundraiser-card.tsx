import { useState, useEffect } from "react"
import { getWeb3 }  from '../utils/scripts'
import FundraiserContract from '../contracts/Fundraiser.json'
import styled from 'styled-components'
import { COLORS, SHADOWS, TRANSITIONS } from "../utils/styles_constants"
import Button from "./button"

const FundraiserCardContainer = styled.article`
  background-color: ${COLORS.background_gray};
  border-radius: 5px;
  color: ${COLORS.black};
  border: 1px solid ${COLORS.black};
  box-shadow: ${SHADOWS.small};
  transition-duration: ${TRANSITIONS.normal};
  font-size: 1.1rem;
  display: grid;
  grid-template-rows: 17rem 1fr;
  
  & .card-info-container {
    padding: 1.5rem;
    /* gap: 1.5rem; */
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
  const [state, setState] = useState({
    contract: null,
    accounts: null,
    name: null,
    description: null,
    totalDonations: null,
    donationCount: null,
    imageURL: null,
    url: null,
  })

  const getFundraiserData = async (fundraiser) => {
    try {
      const web3 = await getWeb3()
      const accounts = await web3.eth.getAccounts()
      const instance = new web3.eth.Contract(
        FundraiserContract.abi,
        fundraiser,
      )

      const name = await instance.methods.name().call()
      const description = await instance.methods.description().call()
      const totalDonations = await instance.methods.totalDonations().call()
      const imageURL = await instance.methods.imageURL().call()
      const url = await instance.methods.url().call()

      setState({
        ...state,
        contract: instance,
        accounts,
        name,
        description,
        totalDonations,
        imageURL,
        url,
      })
      // Placeholder for getting information about each contract
    }
    catch (error) {
      alert('Failed to load web3, accounts, or contract. Check console for details.');
      console.error(error);

    }
  }

  useEffect(() => {
    getFundraiserData(fundraiser)
  }, []);

  return (
    <FundraiserCardContainer>
      <span className="image-container" >
        {/* <Image 
          alt="The guitarist in the concert."
          src="https://www.latercera.com/resizer/5MhYjIcc_2tQNdijw9c2EKHH3yk=/900x600/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/HNDWVAYQCFHXTAE4AUQ3ZNUKIU.jpg"
          layout="responsive"
        /> */}

        <img src={state.imageURL} alt='' />
      </span>
      <div className="card-info-container" >
        <div>
          <h2>{state.name}</h2>
          <p>{state.description}</p>
        </div>
        <div>
          <p><span>Total donations:<br />$173.43 USD → 0.000134 FUN ✨</span></p>
          <Button className="full normal yellow" href='fundraiser/new' link>View more</Button>
        </div>
      </div>
    </FundraiserCardContainer>
  )
}
