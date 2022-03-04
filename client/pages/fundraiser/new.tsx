/* React stuff */
import React, { FormEvent, useRef } from 'react'

import uniqid from 'uniqid'

/* Components */
import Layout from "../../components/layout"
import Button from '../../components/button'
import FormLayout from '../../components/form-layout'

/* Contracts services */
import { createFundraiser } from '../../services/fundraisers'


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
      name: ContractName.current.value,
      website: ContractWebsite.current.value,
      image: ContractImage.current.value,
      description: ContractDescription.current.value,
      beneficiary: ContractBeneficiary.current.value,
      owner: ContractOwner.current.value
    }).then(response => alert(response))
      .catch(error => console.error(error))
  }

  const FormInput = React.forwardRef(function FormInput(props: any, ref: React.MutableRefObject<any>) {
    return (<label className={props.className} >
      <p>{props.label} <span>*</span></p>
      <input ref={ref} placeholder={props.placeHolder} type='text' required />
    </label>
    )
  });

  return (
    <Layout title='New Fundraiser' >
      <FormLayout title='Create fundraiser' description='Create a fundraiser to be sponsored by people, we will deposit all accumulated value to the beneficiary address after the fundraiser ends.' >
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
    </Layout>
  )
}
