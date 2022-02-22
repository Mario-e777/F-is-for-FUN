/* Compontents */
import Layout from "../components/layout"

/* Modules */
import styled from 'styled-components'

/* Utils */
import { COLORS } from "../utils/styles_constants";

const GetFunContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.5rem;

  & h2 {
    color: ${COLORS.black};
  }

  & p {
    max-width: 35rem;
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

export default function GetFun() {
  return (
    <Layout title='Get and yield FUN' >
      <GetFunContainer>
        <h2>Get & Yield FUN</h2>
        <p>Stake your ETH with us and get some FUN, each FUN token generates 3% monthly once donated to a fundraiser.</p>
      </GetFunContainer>
    </Layout>
  )
}
