/* React stuff */
import React, { useState } from 'react'

/* Components */
import Input from './form/input'
import TextArea from './form/text-area'
import GoalButton from './form/goal-button'

/* Modules */
import classNames from 'classnames'
import { animated } from 'react-spring'
import styled from 'styled-components'

/* Hooks */
import useExpand from '../hooks/useExpand'
import { COLORS, SHADOWS, TRANSITIONS } from '../utils/styles_constants'

/* Styled components */
const GoalCardContainer = styled.div`
  & .goalContainer {
    border: 1px solid ${COLORS.black};
    padding: 1.5rem;
    border-radius: 5px;
    position: relative;
    box-shadow: ${SHADOWS.small};
    display: none;
    overflow: hidden;
    background: linear-gradient(215deg, #fad0c47b 0%, #f1a7f176 74%) 0% 0% no-repeat padding-box padding-box transparent;
    margin-bottom: 1.5rem;

    &.active {
      display: block;
    }
    
    & .goalMask {
      z-index: +1;
      border-radius: 5px;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0rem;
      left: 0rem;
      cursor: pointer;
      opacity: 0;
      z-index: -1;
      transition-duration: ${TRANSITIONS.slow};
      
      &.closed {
        background: linear-gradient(215deg, #fad0c47b 0%, #f1a7f176 74%) 0% 0% no-repeat padding-box padding-box transparent;
        backdrop-filter: blur(13px);
        z-index: +1;
        opacity: 1;
      }

      & .goal-description-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 6rem;
        padding: 0 0 0 2.8rem;

        & .goal-title-container {
          display: flex;
          gap: 1.5rem;
        }

        & .donation-goal-container {
          display: flex;
          align-items: center;
          height: 100%;
          
          & div {
            height: 100%;
            margin-left: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }

        & p {
          margin: 0;
        }
      }
    }

    & .formContainer {
      & .goal-card-buttons {
        top: 0;
        right: 0;
        position: absolute;
        border-radius: 0 0 0 5px;
        display: flex;
        height: fit-content;
      }
    }
  }
`

export default function GoalCard({ selected, indexCard, parentState, setParentState }) {
  const [expandStyle, triggerExpand] = useExpand({});
  const [state, setState] = useState({ isOpen: false })

  const openCloseGoalContaine = (event) => {
    if (event.target.className.includes('goalContainer') 
      || event.target.className.includes('formContainer')
      || event.target.className.includes('goalMask')
      || event.target.className.includes('goal-description-container')
    ) {
      setState({ ...state, isOpen: !state.isOpen })
      triggerExpand(!state.isOpen)
    }
  }

  return (
    <GoalCardContainer>
      <animated.div key={`goal-card-${indexCard}`} style={expandStyle} onClick={event => openCloseGoalContaine(event)} className={classNames({ goalContainer: true, active: selected })} >
        <div className={classNames({ goalMask: true, closed: !state.isOpen })} >
          <div className='goal-description-container' >
            <div className='goal-title-container' >
              {/* <p>{indexCard}</p> */}
              <p>{parentState.fundraiserData[`titleGoal${indexCard}`] ? parentState.fundraiserData[`titleGoal${indexCard}`] : 'Goal title'}</p>
            </div>

            <div className='donation-goal-container' >
              <p>{parentState.fundraiserData[`donationGoal${indexCard}`] ? `${parentState.fundraiserData[`donationGoal${indexCard}`]} FUN ✨` : '0 FUN ✨'}</p>
              <div>
                <GoalButton className='red'>x</GoalButton>
                <GoalButton className='yellow' styles={{ borderRadius: '0 0 5px 0' }} >v</GoalButton>
              </div>
            </div>
          </div>
        </div>
        <div className={classNames({ formContainer: true, formSelected: selected })} >
          <Input required keyField={`titleGoal${indexCard}`} label='Title' placeHolder='To get more vehicles' type='text' state={parentState} setState={setParentState} />
          <Input required keyField={`donationGoal${indexCard}`} label='Donation goal' placeHolder='777 FUN' type='number' state={parentState} setState={setParentState} />
          <TextArea required keyField={`descriptionGoal${indexCard}`} label='Description' placeHolder='We need more vehicles to deliver our bacon' state={parentState} setState={setParentState} />

          <div className='goal-card-buttons' >
            <GoalButton className='yellow mini' styles={{ borderRadius: '0 0 0 5px' }}>
              <span style={{ margin: '0', transform: 'rotate(180deg)', display: 'block' }} >v</span>
            </GoalButton>
            <GoalButton className='red mini'>x</GoalButton>
          </div>
        </div>
      </animated.div>
    </GoalCardContainer>
  )
}
