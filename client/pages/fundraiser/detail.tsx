/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* React stuff */
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/router"

/* Components */
import FormLayout from "../../components/form/layout"
import Layout from "../../components/layout"

/* Context */
import { FundraisersContext } from '../../contexts/fundraisers'
import { getFundraiserDataByAddress } from "../../services/fundraisers"

export default function Detail() {
  const { query } = useRouter()

  const FUNDRAISER_CONTEXT: any = useContext(FundraisersContext)
  const [state, setState] = useState({
    fundraiser: null,
    name: null,
    description: null,
    startAt: null,
    endAt: null,
    siteURL: null,
    beneficiary: null,
    donationGoal: null,
    imageURL: null
  })

  const getFundraiserData = async (fundraiserAddress: string) => {
    const fundraiser: any = await getFundraiserDataByAddress(fundraiserAddress)
    setState({ ...state, ...fundraiser })
  }

  useEffect(() => {
    query.fundraiser
      && getFundraiserData(
        query.fundraiser
          ? query.fundraiser
          : FUNDRAISER_CONTEXT.state.fundraiser
      )
  }, [query.fundraiser])

  return (
    <Layout title={`Fundraiser details`}>
      <FormLayout title={state.name} description={state.description} >
        <section>
          <p>{FUNDRAISER_CONTEXT.state.fundraiser}</p>
          <p>{state.siteURL}</p>
          <p>{`${new Date(state.startAt * 1)}`}</p>
          <p>{`${new Date(state.endAt * 1)}`}</p>
          <p>{state.beneficiary}</p>
          <p>{state.donationGoal}</p>
          <img src={state.imageURL} alt='Fundraise image'/>
        </section>
      </FormLayout>
    </Layout>
  )
}
