/* React & next stuff */
import Link from 'next/link'

/* Modules */
import styled from 'styled-components'
import { animated } from 'react-spring'

/* Hooks */
import useShadow from '../hooks/useShadow';

/* Utils */
import { COLORS } from '../utils/styles_constants'

const ButtonContainer = styled.span`
  height: fit-content;
  width: fit-content;
  display: block;
  border-radius: 3px;

  &.full { width: 100%; }
  & .green { background-color: ${COLORS.green_light}; }
  & .gray { background-color: ${COLORS.gray}; }
  & .blue { background-color: ${COLORS.blue_light}; }
  & .yellow { background-color: ${COLORS.yellow_light}; }
  & .red { background-color: ${COLORS.red_light}; }

  & .transparent {
    background: linear-gradient(215deg, #fad0c47b 0%, #f1a7f176 74%) 0% 0% no-repeat padding-box padding-box transparent;
    backdrop-filter: blur(6px);
    font-size: 1rem;
  }

  &> a, button {
    border-radius: 3px;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.1rem 1.3rem;
    color: ${COLORS.black};
    border: 1px solid ${COLORS.black};
    white-space: nowrap;
    font-family: SofiaProMedium;
    cursor: pointer;
    &.normal { font-size: 1.1rem; }
    &.mini { font-size: 1rem; }
    &.full { width: 100%; }
  }
`

export default function Button(
  {
    link,
    href,
    children,
    type,
    className
  }: {
    children: string
    className?: string,
    type?: string,
    link?: boolean,
    href?: string,
  }) {
  const [shadowStyle, triggerShadow] = useShadow({});

  return (
    <ButtonContainer className={`${className}`} >
      {link
        ? <Link href={href}>
          <animated.a
            className={`${className} button`}
            onMouseEnter={() => triggerShadow(true)}
            onMouseLeave={() => triggerShadow(false)}
            style={shadowStyle}
          >
            {children}
          </animated.a>
        </Link>
        : <animated.button
          type={type}
          className={`${className} button`}
          onMouseEnter={() => triggerShadow(true)}
          onMouseLeave={() => triggerShadow(false)}
          style={shadowStyle}
        >
          {children}
        </animated.button>}
    </ButtonContainer>
  )
}
