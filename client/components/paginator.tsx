/* React & next stuff */
import React, { useEffect, useState } from 'react'
import Link from "next/link"

/* Contrtacts services */
import { totalFundraisers } from '../services/fundraisers'

/* Modules */
import classNames from 'classnames'
import styled from 'styled-components'
import { COLORS, TRANSITIONS } from '../utils/styles_constants'

const NavContainer = styled.nav`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 1.3rem;
  column-gap: 0.8rem;

  & span {
    opacity: 0.5;
    cursor: default;
  }
  
  & .page-number {
    transition-duration: ${TRANSITIONS.normal};

    &:hover {
      opacity: 1;
      cursor: pointer;
      color: ${COLORS.black};
    }
  }

  & a {
    opacity: 0.5;

    &.selected {
      opacity: 1;
      text-decoration-line: underline;
      color: ${COLORS.black};
    }

    &:hover {
      color: ${COLORS.black};
      opacity: 1;
      text-decoration-line: underline;
    }
  }
  
  & .deactive:hover {
    cursor: not-allowed;
  }
`

export default function Paginator({ parentState, parentSetState }) {
  const [state, setState] = useState({
    totalPages: 1
  })

  /* Functions */
  const getTotalPages = () => {
    const PAGES_TO_SHOW = []
    let limitPaginatitonItems = parentState.currentPage >= 3 ? parentState.currentPage + 1 : 3

    for (let i = 1; i <= state.totalPages; i++) {
      if (limitPaginatitonItems === 0 && i != state.totalPages) continue;
      PAGES_TO_SHOW.push(
        <>
          <Link href={`?page=${i}`} >
            <a className={classNames({
              selected: parentState.currentPage === i,
              "page-number": true
            })}>{i}</a>
          </Link>
          {i !== state.totalPages && <span onClick={e => e.stopPropagation()} >|</span>}
        </>
      )
      limitPaginatitonItems--
    }

    parentState.currentPage >= 3 && PAGES_TO_SHOW.splice(0, PAGES_TO_SHOW.length - 4)
    return PAGES_TO_SHOW
  }

  const handleStepPage = (type: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    const PREV_PAGE = parseInt(parentState.currentPage) - 1
    const CURRENT_PAGE = parseInt(parentState.currentPage)
    const NEXT_PAGE = parseInt(parentState.currentPage) + 1

    parentSetState({
      ...parentState,
      currentPage: type === 'Next'
        ? (NEXT_PAGE > state.totalPages) ? CURRENT_PAGE : NEXT_PAGE
        : (PREV_PAGE < 1) ? CURRENT_PAGE : PREV_PAGE
    })
  }

  const selectPaginatorOptions = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    parseInt(Object.values(e.target)[1].children)
      && parentSetState({
        ...parentState,
        currentPage: parseInt(Object.values(e.target)[1].children)
      })
  }

  const stepButton = ({ to, activeCondition }) => (
    <span
      className={classNames({
        deactive: parentState.currentPage === activeCondition,
        "page-number": true
      })}
      onClick={e => handleStepPage(to, e)}
    >{to}</span>
  );

  useEffect(() => {
    totalFundraisers()
      .then((total: any) =>
        setState({
          totalPages: Math.ceil(parseInt(total.totalFundraisers) / 6)
        })
      )
  }, [])

  return (
    <NavContainer onClick={e => selectPaginatorOptions(e)} >
      {stepButton({ to: 'Prev', activeCondition: 1 })}
      {getTotalPages()}
      {stepButton({ to: 'Next', activeCondition: state.totalPages })}
    </NavContainer>
  )
}
