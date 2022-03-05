/* React stuff */
import { useContext, useEffect, useState } from "react";

/* Components */
import FormLayout from "../../components/form-layout";
import Layout from "../../components/layout";

/* Context */
import { FundraisersContext } from '../../contexts/fundraisers'
import { getFundraiserDataByAddress } from "../../services/fundraisers";

export default function Detail() {

  const FUNDRAISER_CONTEXT: any = useContext(FundraisersContext)
  const [state, setState] = useState({ fundraiser: null, name: null })

  const getFundraiserData = async (fundraiserAddress: string) => {
    const fundraiser: any = await getFundraiserDataByAddress(fundraiserAddress)
    console.log(fundraiser)
    setState({ ...state, ...fundraiser })
  }

  useEffect(() => {
    getFundraiserData(FUNDRAISER_CONTEXT.state.fundraiser)
  }, [FUNDRAISER_CONTEXT.state.fundraiser])

  return (
    <Layout title={`Fundraiser details`}>
      <FormLayout title={state.name} description={'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium totam, iure laborum perferendis nihil voluptatum aliquid adipisci? Facilis nam, eligendi magnam fugiat inventore itaque qui accusantium alias assumenda aspernatur. Ipsa? Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium totam, iure laborum perferendis nihil voluptatum aliquid adipisci? Facilis nam, eligendi magnam fugiat inventore itaque qui accusantium alias assumenda aspernatur. Ipsa?'} >
        <p>{FUNDRAISER_CONTEXT.state.fundraiser}</p>
      </FormLayout>
    </Layout>
  )
}
