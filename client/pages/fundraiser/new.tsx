/* React stuff */
import React, { FormEvent, useRef } from 'react'

/* Modules */
import styled from 'styled-components'

/* Components */
import Layout from "../../components/layout"
import Button from '../../components/button'
import FormLayout from '../../components/form-layout'

/* Contracts services */
import { createFundraiser } from '../../services/fundraisers'

/* Utils */
import { COLORS } from '../../utils/styles_constants'

const NewFundraiserContainer = styled.section`
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
    line-height: 1.8rem;
  }
`

export default function New() {
  const ContractName = useRef(null)
  const ContractWebsite = useRef(null)
  const ContractImage = useRef(null)
  const ContractDescription = useRef(null)
  const ContractBeneficiary = useRef(null)
  const ContractOwner = useRef(null)

  /* Functions */
  const createNewFundraiser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createFundraiser({
      contract_name: ContractName.current.value,
      contract_website: ContractWebsite.current.value,
      contract_image: ContractImage.current.value,
      contract_description: ContractDescription.current.value,
      contract_beneficiary: ContractBeneficiary.current.value,
      contract_owner: ContractOwner.current.value
    }).then(response => alert(response))
      .catch(error => console.error(error))
  }

  const FormInput = React.forwardRef((props: any, ref) => (
    <label className={props.className} >
      <p>{props.label} <span>*</span></p>
      <input ref={ref} placeholder={props.placeHolder} type='text' required />
    </label>
  ));

  return (
    <Layout title='New Fundraiser' >
      <NewFundraiserContainer>
        <h2>Create fundraiser</h2>
        <p>Create a fundraiser to be sponsored by people, we will deposit all accumulated value to the beneficiary address after the fundraiser ends.</p>
        <FormLayout>
          <form onSubmit={e => createNewFundraiser(e)} >
            <FormInput ref={ContractName} label="Name" placeHolder='The Bacon Pancake Fundraiser' />
            <FormInput ref={ContractWebsite} label='Website' placeHolder='https://mysite.com' />
            <FormInput ref={ContractImage} label='Image url' placeHolder='https://mysite.com/image.png' className='full-grid' />
            <FormInput ref={ContractBeneficiary} label='Beneficiary Address' placeHolder='0x0000000...' className='full-grid' />
            <FormInput ref={ContractOwner} label="Fundraiser owner address" placeHolder='0x0000000...' className='full-grid' />
            <label className='description-container' >
              <p>Description <span>*</span></p>
              <textarea ref={ContractDescription} placeholder="Fundraising to buy much more bacon and prepare with pancakes :p" required />
            </label>
            <Button className='full normal red' href='/' link >Cancel</Button>
            <Button className='full normal green' type='submit' >Create fundraiser</Button>
          </form>
        </FormLayout>
      </NewFundraiserContainer>
    </Layout>
  )
}
