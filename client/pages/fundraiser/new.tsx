/* React stuff */
import React, { FormEvent, useEffect, useState/* , useEffect  */} from 'react'

/* Modules */
import { animated } from 'react-spring'
import styled from 'styled-components'
import classNames from 'classnames'

/* Components */
import Layout from "../../components/layout"
import Button from '../../components/button'
import FormLayout from '../../components/form/layout'
import GoalCard from '../../components/goal-card'
import Input from '../../components/form/input'
import TextArea from '../../components/form/text-area'

/* Hooks */
import useSelection from '../../hooks/useSelection'

/* Contracts services */
/* import { createFundraiser, getActiveFundraisersGoals } from '../../services/fundraisers' */

/* Styles */
import 'react-day-picker/lib/style.css'

/* Utils */
import { COLORS, SHADOWS, TRANSITIONS } from '../../utils/styles_constants'

const CreateFundraiserForm = styled.div`
  position: relative;

  & .formContainer {
    padding-bottom: 1.5rem;
    display: none;
  }
  
  & .formSelected {
    display: grid;
  }

  & .form-steps-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 1.5rem;
    position: relative;

    & button {
      padding: 1.2rem 1.4rem;
      font-size: 1.1rem;
      background-color: transparent;
      border: none;
      color: ${COLORS.black};
      border-bottom: 1px solid transparent;
      transition-duration: ${TRANSITIONS.slow};
      cursor: pointer;
      opacity: 0.5;
      &:hover {
        opacity: 1;
      }
    }
    & .selected {
      opacity: 1;
    }

    & .stepIndicator {
      position: absolute;
      bottom: 0;
      right: 50%;
      height: 1px;
      background-color: ${COLORS.black};
      width: 50%;
      box-shadow: ${SHADOWS.small};
      border-radius: 100px;
    }
  }
`
const stepsInitialState = {
  general: false,
  goals: false
}
export default function New() {
  /* Animation hooks */
  const [selectionStyle, triggerSelection] = useSelection({});

  /* States */
  const [formStepState, setFormStepState] = useState({ ...stepsInitialState, general: true })
  const [state, setState] = useState({
    new: null,
    goalsToCreate: 1,
    stepOptions: ['General', 'Goals'],
    inputFields: ['Name', 'Website', 'Image url', 'Beneficiary address', 'Description'],
    fundraiserData: {}
  })

  /* Functions */
  const createNewFundraiser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(state);

    /* createFundraiser({
      name: ContractName.current.value,
      website: ContractWebsite.current.value,
      image: ContractImage.current.value,
      description: ContractDescription.current.value,
      beneficiary: ContractBeneficiary.current.value,
    }).then(response => alert(response))
      .catch(error => console.error(error)) */
  }

  const handleStep = event => {
    if (event.target.innerText === state.stepOptions[0]) {
      setFormStepState({ ...stepsInitialState, general: true })
      triggerSelection(false)
    }
    if (event.target.innerText === state.stepOptions[1]) {
      setFormStepState({ ...stepsInitialState, goals: true })
      triggerSelection(true)
    }
  }

  const getGoals = () => {
    const goalsToShow = []
    for (let i = 1; i <= state.goalsToCreate; i += 1) {
      goalsToShow.push(<GoalCard selected={formStepState.goals} indexCard={i} parentState={state} setParentState={setState} />)
    }
    return goalsToShow
  }

  /* useEffect(() => {
    getActiveFundraisersGoals()
      .then((response: { new: Array<any> }) => {
        setState({ ...state, new: response.new })
      })
  }, []) */

  useEffect(() => {
    console.log('state.fundraiserData')
    console.log(state.goalsToCreate)
    console.log(state.fundraiserData)
  }, [state.fundraiserData, state.goalsToCreate])

  return (
    <Layout title='New Fundraiser' >
      <FormLayout title='Create fundraiser' description='Create a fundraiser to be sponsored by people, we will deposit all accumulated value to the beneficiary address after the fundraiser ends.' >
        <CreateFundraiserForm>
          <div className='form-steps-container'>
            <button onClick={handleStep} className={classNames({ selected: formStepState.general })}>{state.stepOptions[0]}</button>
            <button onClick={handleStep} className={classNames({ selected: formStepState.goals })}>{state.stepOptions[1]}</button>
            <animated.div style={selectionStyle} className={classNames({ stepIndicator: true })} />
          </div>
          <form onSubmit={e => createNewFundraiser(e)} >
            <div className={classNames({ formContainer: true, formSelected: formStepState.general })} >
              <Input required keyField={`fundraiser${state.inputFields[0]}`} label={state.inputFields[0]} placeHolder={'The Bacon Pancake Fundraiser'} type='text' state={state} setState={setState} />
              <Input keyField={`fundraiser${state.inputFields[1]}`} label={state.inputFields[1]} placeHolder={'https://mysite.com'} type='text' state={state} setState={setState} />
              <Input keyField={`fundraiser${state.inputFields[2]}`} label={state.inputFields[2]} placeHolder={'https://mysite.com/image.png'} type='text' state={state} setState={setState} className='full-grid' />
              <Input required keyField={`fundraiser${state.inputFields[3]}`} label={state.inputFields[3]} placeHolder={'0x0000000...'} type='text' state={state} setState={setState} className='full-grid' />
              <TextArea required keyField={`fundraiser${state.inputFields[4]}`} label={state.inputFields[4]} placeHolder={'Fundraising to buy much more bacon to prepare with pancakes :p'} state={state} setState={setState} />
            </div>
 
            {getGoals()}

            <Button className='full green blocked' type='submit' >Create fundraiser</Button>

          </form>
        </CreateFundraiserForm>
        <Button
          type='button'
          onClick={() => setState({ ...state, goalsToCreate: state.goalsToCreate + 1 })}
          className={classNames({
            deactive: !formStepState.goals,
            active: formStepState.goals,
            blue: true,
          })}
          styles={{
            position: 'sticky',
            top: '1.2rem'
          }}
        >
          {'+ Add goal'}
        </Button>
      </FormLayout>
    </Layout >
  )
}
