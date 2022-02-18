/* React & next stuff */
import React from 'react'
import Link from 'next/link'

/* Modules */
import styled from 'styled-components'

/* Utils */
import { SHADOWS } from '../utils/styles_constants'
import { TRANSITIONS } from '../utils/styles_constants'
import { COLORS } from '../utils/styles_constants'

const ButtonContainer = styled.span`
  /* height: fit-content; */

  & .green {
    background-color: ${COLORS.green_light};
  }
  & .blue {
    background-color: ${COLORS.blue_light};
  }
  & .yellow {
    background-color: ${COLORS.yellow_light};
  }

  &> a, button {
    width: 100%;
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
      cursor: pointer;
    }
  }
`

export default function Button(
  {
    link,
    href,
    children,
    type,
    color
  }: {
    children: string,
    color: string,
    type?: string,
    link?: boolean,
    href?: string
  }) {
  return (
    <ButtonContainer>
      {link
        ? <Link href={href}><a className={`${color} button`}>{children}</a></Link>
        : <button type={type} className={`${color} button`}>{children}</button>}
    </ButtonContainer>
  )
}
