/* Modules */
import styled from 'styled-components'
import { animated } from 'react-spring'

/* Hooks */
import useShadow from '../../hooks/useShadow';

/* Utils */
import { COLORS } from '../../utils/styles_constants'
import { SHADOWS } from '../../utils/styles_constants';

const ButtonContainer = styled.span`
  display: block;
  height: 100%;
  box-shadow: ${SHADOWS.small};
  transition-duration: 369ms;
  
  & button {
    border: none;
    border-left: 1px solid ${COLORS.black};
    border-bottom: 1px solid ${COLORS.black};
    width: 1.5rem;
    padding: 0.5rem;
    height: 100%;

    &:hover {
      box-shadow: ${SHADOWS.medium};
      cursor: pointer;
    }
  }

  /* Sizes */
  & .full { width: 100%; }
  & .mini { height: unset; padding: 0.2rem; }

  /* Colors */
  & .green { background-color: ${COLORS.green_light}; }
  & .gray { background-color: ${COLORS.gray}; }
  & .blue { background-color: ${COLORS.blue_light}; }
  & .yellow { background-color: ${COLORS.yellow_light}; }
  & .red { background-color: ${COLORS.red_light}; }
  & .transparent {
    background: linear-gradient(215deg, #fad0c47b 0%, #f1a7f176 74%) 0% 0% no-repeat padding-box padding-box transparent;
    backdrop-filter: blur(6px);
  }
`

export default function Button(
  {
    children,
    className,
    styles,
    onClick,
  }: {
    children: string
    className?: string,
    styles?: Object,
    onClick?: Function
  }) {
  const [shadowStyle, triggerShadow] = useShadow({});

  return (
    <ButtonContainer style={{...shadowStyle, ...styles}} >
      <animated.button
        onClick={() => onClick && onClick()}
        className={`${className}`}
        onMouseEnter={() => triggerShadow(true)}
        onMouseLeave={() => triggerShadow(false)}
        style={{...shadowStyle, ...styles}}
      >
        {children}
      </animated.button>
    </ButtonContainer>
  )
}
