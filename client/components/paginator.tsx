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
    &:hover {
      opacity: 1;
      cursor: pointer;
      color: ${COLORS.black};
    }
  }

  & a {
    opacity: 0.5;
    transition-duration: ${TRANSITIONS.normal};

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

export default function Paginator({ pageSetState, pageState }) {

  const [state, setState] = useState({
    totalPages: 1
  })

  /* Functions */
  const getPageOptions = () => {
    const pageOptions = []
    let limitPaginatitonItems = pageState.currentPage >= 3 ? pageState.currentPage + 1 : 3

    for (let i = 1; i <= state.totalPages; i++) {
      if (limitPaginatitonItems === 0 && i != state.totalPages) continue;
      pageOptions.push(
        <>
          <Link href={`?page=${i}`} >
            <a className={classNames({ selected: pageState.currentPage === i, "page-number": true })} >{i}</a>
          </Link>
          {i !== state.totalPages && <span onClick={e => e.stopPropagation()} >|</span>}
        </>
      )
      limitPaginatitonItems--
    }

    pageState.currentPage >= 3 && pageOptions.splice(0, pageOptions.length - 4)
    return pageOptions
  }

  const handleStepPage = (type: string, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    pageSetState({
      ...pageState,
      currentPage: type === 'next'
        ? (parseInt(pageState.currentPage) + 1 > state.totalPages) ? parseInt(pageState.currentPage) : parseInt(pageState.currentPage) + 1
        : (parseInt(pageState.currentPage) - 1 < 1) ? parseInt(pageState.currentPage) : parseInt(pageState.currentPage) - 1
    })
  }

  const selectPaginatorOptions = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    parseInt(Object.values(e.target)[1].children) && pageSetState({ ...pageState, currentPage: parseInt(Object.values(e.target)[1].children) })
  }

  useEffect(() => {
    totalFundraisers()
      .then(total =>
        setState({
          totalPages: Math.ceil(parseInt(total.totalFundraisers) / 6)
        })
      )
  }, [])

  return (
    <NavContainer onClick={e => selectPaginatorOptions(e)} >
      <span
        className={classNames({
          deactive: pageState.currentPage === 1,
          "page-number": true
        })}
        onClick={e => handleStepPage('prev', e)}
      >
        {'Prev'}
      </span>
      {getPageOptions()}
      <span
        className={classNames({
          deactive: pageState.currentPage === state.totalPages,
          "page-number": true
        })}
        onClick={e => handleStepPage('next', e)}
      >
        {'Next'}
      </span>
    </NavContainer>
  )
}
