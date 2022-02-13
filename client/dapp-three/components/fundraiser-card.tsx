import { useState, useEffect } from "react"
import getWeb3 from '../scripts/getWeb3'
import FundraiserContract from '../contracts/Fundraiser.json'
import styled from 'styled-components'
import { COLORS, SHADOWS, TRANSITIONS } from "../utils/colors"
import Image from "next/image"
import IMAGE from '../public/images/box.png'
import Link from "next/link"

const FundraiserCardContainer = styled.article`
  background-color: ${COLORS.background_gray};
  border-radius: 5px;
  color: ${COLORS.black};
  border: 1px solid ${COLORS.black};
  box-shadow: ${SHADOWS.small};
  transition-duration: ${TRANSITIONS.normal};
  font-size: 1.1rem;
  
  & .card-info-container {
    padding: 1.5rem;
    gap: 1.5rem;
    flex-wrap: wrap;

    & p {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;

      & span {
        font-family: SofiaProMedium;
      }
    }

    & .green {
      background-color: ${COLORS.green_light};
    }
    & .blue {
      background-color: ${COLORS.blue_light};
    }
    & .yellow {
      background-color: ${COLORS.yellow_light};
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

  & span {
    max-height: 17.5rem;
    width: 100%;
    display: block !important;
    box-shadow: ${SHADOWS.small};
    & img {
      object-fit: cover;
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

  const init = async (fundraiser) => {
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
    init(fundraiser)
  }, []);

  return (
    <FundraiserCardContainer>
      <span>
        <Image src={IMAGE} alt='' />
      </span>
      <div className="card-info-container" >
        <h2>{state.name}</h2>
        <p>{state.description}; Lorem ipsum dolor sit amet consectetur adipiscing, elit condimentum hac pharetra aliquet, habitasse euismod blandit donec montes. Egestas eget feugiat ligula neque diam torquent, dignissim tellus praesent ridiculus congue nullam urna, gravida dis per metus magna.</p>
        <p><span>Total donations:<br />$173.43 USD → 0.000134 FUN ✨</span></p>
        <Link href='fundraiser/new' ><a className="yellow">View more</a></Link>
      </div>
    </FundraiserCardContainer>
  )
}
