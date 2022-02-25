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
  height: fit-content;
  /* height: fit-content; */
  display: block;
  
  &.full {
    width: 100%;
  }

  & .green {
    background-color: ${COLORS.green_light};
  }
  & .gray {
    background-color: ${COLORS.gray};
  }
  & .blue {
    background-color: ${COLORS.blue_light};
  }
  & .yellow {
    background-color: ${COLORS.yellow_light};
  }

  &> a, button {
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.1rem 1.3rem;
    &.mini {
      padding: 0.9rem 1rem;
    }
    color: ${COLORS.black};
    border: 1px solid ${COLORS.black};
    border-radius: 3px;
    &.normal {
      font-size: 1.1rem !important;
    }
    transition-duration: ${TRANSITIONS.normal};
    white-space: nowrap;
    box-shadow: ${SHADOWS.small};
    font-family: SofiaProMedium;

    &.full {
      width: 100%;
    }

    &:hover {
      box-shadow: ${SHADOWS.medium};
      cursor: pointer;
    }
  }
  
  & .transparent {
    background: linear-gradient(215deg, #fad0c47b 0%, #f1a7f176 74%) 0% 0% no-repeat padding-box padding-box transparent;
    backdrop-filter: blur(30px);
    font-size: 1rem;
    /* border: none; */
  }
`

export default function Button(
  {
    link,
    href,
    children,
    type,
    color,
    className
  }: {
    children: string,
    color: string,
    className?: string,
    type?: string,
    link?: boolean,
    href?: string,
  }) {
  return (
    <ButtonContainer className={`${className}`} >
      {link
        ? <Link href={href}><a className={`${color} ${className} button`}>{children}</a></Link>
        : <button type={type} className={`${color} ${className} button`}>{children}</button>}
    </ButtonContainer>
  )
}
