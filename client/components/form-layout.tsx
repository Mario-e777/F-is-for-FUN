import styled from "styled-components"
import { COLORS, SHADOWS } from '../utils/styles_constants'
import Button from '../components/button'

const FormLayoutGrid = styled.div`
  z-index: +1;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 35rem 1fr;
  column-gap: 1.5rem;
  position: relative;
  
  & form {
    width: 100%;
    max-width: 35rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    justify-self: center;
    
    
    & label, & .DayPickerInput {
      font-size: 1.1rem;
      color: ${COLORS.black};
      width: 100%;
      
      .DayPicker-Day--selected {
        background-color: ${COLORS.blue_light};
        color: ${COLORS.black};
      }
      
      .DayPicker-wrapper {
        background-color: ${COLORS.background_gray};
        border: 1px solid ${COLORS.black};
        border-radius: 5px;
        width: calc(100% - 2px);
      }
      
      .DayPickerInput-Overlay {
        width: calc(100% - 2px);
        border-radius: 5px;
      }

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
        background-color: ${COLORS.background_gray};
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
const FormLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5rem;
  color: ${COLORS.black};

  & p {
    max-width: 35rem;
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`

export default function FormLayout({ children, title, description }) {
  return (
    <FormLayoutContainer>
      <h2>{title}</h2>
      <p>{description}</p>
      <FormLayoutGrid>
        <Button className="normal back-button transparent" href="/" link >{'← Back'}</Button>
        {children}
      </FormLayoutGrid>
    </FormLayoutContainer>
  )
}
