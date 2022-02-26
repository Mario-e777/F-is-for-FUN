import styled from "styled-components"
import { TRANSITIONS } from '../utils/styles_constants'
import { COLORS, SHADOWS } from '../utils/styles_constants'
import Button from '../components/button'

const FormLayoutGrid = styled.div`
  z-index: +1;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 35rem 1fr;
  column-gap: 1.5rem;
  
  & form {
    width: 100%;
    max-width: 35rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    justify-self: center;

    & label {
      font-size: 1.1rem;
      color: ${COLORS.black};
      & p {
        margin-bottom: 0.4rem;
        color: ${COLORS.black};

        & span {
          font-size: 0.9rem;
        }
      }
      
      & input, textarea {
        width: 100%;
        font-size: 1.02rem;
        padding: 1rem 1.1rem;
        border-radius: 5px;
        border: 1px solid ${COLORS.black};
        font-family: SofiaProRegular;
      }
    }

    & .green {
      background-color: ${COLORS.green_light};
    }
    & .blue {
      background-color: ${COLORS.blue_light};
    }
    & .red {
      background-color: ${COLORS.red_light};
    }

    &> a {
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
      }
    }

    & .full-grid {
      grid-column: 1/3;
    }

    & .description-container {
      grid-column: 1/3;

      & textarea {
        height: 11rem;
        resize: none;
      }
    }
  }

  & .back-button {
    justify-self: end;
  }
`

export default function FormLayout({ children }) {
  return (
    <FormLayoutGrid>
      <Button className="normal back-button transparent" href="/" link >{'← Back'}</Button>
      {children}
    </FormLayoutGrid>
  )
}
