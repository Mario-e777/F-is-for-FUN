/* React stuff */
import React, { FormEvent, useRef, useState } from 'react'

/* Modules */
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { formatDate, parseDate } from 'react-day-picker/moment'
import styled from 'styled-components'

/* Components */
import Layout from "../../components/layout"
import Button from '../../components/button'
import FormLayout from '../../components/form-layout'

/* Contracts services */
import { createFundraiser } from '../../services/fundraisers'

/* Styles */
import 'react-day-picker/lib/style.css';
import { COLORS, TRANSITIONS } from '../../utils/styles_constants'
import classNames from 'classnames'

const CreateFundraiserForm = styled.div`
  position: relative;
  
  & .form {
    opacity: 0;
    position: absolute;
    padding-bottom: 1.5rem;
  }

  & .selected {
    opacity: 1;
  }

  & .form-steps-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 2.3rem;

    & button {
      padding: 1.4rem;
      font-size: 1.1rem;
      background-color: transparent;
      border: none;
      color: ${COLORS.black};
      border-bottom: 1px solid transparent;
      transition-duration: ${TRANSITIONS.slow};
      cursor: pointer;
    }
    & .selected {
      border-bottom: 1px solid ${COLORS.black};
    }
  }
`

export default function New() {
  const ContractName = useRef(null)
  const ContractWebsite = useRef(null)
  const ContractImage = useRef(null)
  const ContractDescription = useRef(null)
  const ContractBeneficiary = useRef(null)
  const DonationGoal = useRef(null)
  const StartAt = useRef(null)
  const EndAt = useRef(null)

  const stepsInitialState = {
    general: false,
    goals: false
  }
  const [formStepState, setFormStepState] = useState({ ...stepsInitialState, general: true })

  /* Functions */
  const createNewFundraiser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    createFundraiser({
      name: ContractName.current.value,
      website: ContractWebsite.current.value,
      image: ContractImage.current.value,
      description: ContractDescription.current.value,
      beneficiary: ContractBeneficiary.current.value,
      donationGoal: DonationGoal.current.value,
      startAt: new Date(StartAt.current.state.value).getTime(),
      endAt: new Date(EndAt.current.state.value).getTime()
    }).then(response => alert(response))
      .catch(error => console.error(error))
  }

  const FormInput = React.forwardRef(function FormInput(props: any, ref: React.MutableRefObject<any>) {
    return (<label className={props.className} >
      <p>{props.label} <span>*</span></p>
      {
        props.type === 'date-picker'
          ? <DayPickerInput
            /* value={state.selectedDay} */
            ref={ref}
            /* dayPickerProps={{ selectedDays: state.selectedDay }} */
            formatDate={formatDate}
            parseDate={parseDate}
            placeholder={`${formatDate(new Date())}`}
          />
          : <input ref={ref} placeholder={props.placeHolder} type='text' required />
      }
    </label>
    )
  })

  const handleStep = event => {
    if (event.target.innerText === 'General') setFormStepState({ ...stepsInitialState, general: true })
    if (event.target.innerText === 'Goals') setFormStepState({ ...stepsInitialState, goals: true })
  }

  return (
    <Layout title='New Fundraiser' >
      <FormLayout title='Create fundraiser' description='Create a fundraiser to be sponsored by people, we will deposit all accumulated value to the beneficiary address after the fundraiser ends.' >
        <CreateFundraiserForm>
          <div className='form-steps-container'>
            <button onClick={handleStep} className={classNames({ selected: formStepState.general })}>General</button>
            <button onClick={handleStep} className={classNames({ selected: formStepState.goals })}>Goals</button>
          </div>
          <form onSubmit={e => createNewFundraiser(e)} >
            <div className={classNames({ form: true, selected: formStepState.general })} >
              <FormInput ref={ContractName} label="Name" placeHolder='The Bacon Pancake Fundraiser' />
              <FormInput ref={ContractWebsite} label='Website' placeHolder='https://mysite.com' />
              <FormInput ref={ContractImage} label='Image url' placeHolder='https://mysite.com/image.png' className='full-grid' />
              <FormInput ref={ContractBeneficiary} label='Beneficiary Address' placeHolder='0x0000000...' className='full-grid' />

              <label className='description-container' >
                <p>Description <span>*</span></p>
                <textarea ref={ContractDescription} placeholder="Fundraising to buy much more bacon and prepare with pancakes :p" required />
              </label>
              <Button className='full normal red' href='/' link >Cancel</Button>
              <Button className='full normal green' type='submit' >Create fundraiser</Button>
          </div>
          <div className={classNames({ form: true, selected: formStepState.goals })} >
            <FormInput ref={ContractName} label="Name" placeHolder='The Bacon Pancake Fundraiser' />
            <FormInput ref={DonationGoal} label='Donation goal' placeHolder='777 FUN' />
            <FormInput ref={StartAt} type='date-picker' label='Start date' placeHolder='2022-3-16' />
            <FormInput ref={EndAt} type='date-picker' label='End date' placeHolder='2022-3-16' />

            <label className='description-container' >
              <p>Description <span>*</span></p>
              <textarea ref={ContractDescription} placeholder="Fundraising to buy much more bacon and prepare with pancakes :p" required />
            </label>
            <Button className='full normal red' href='/' link >Cancel</Button>
            <Button className='full normal green' type='submit' >Create fundraiser</Button>
          </div>
        </form>
      </CreateFundraiserForm>
    </FormLayout>
    </Layout >
  )
}
