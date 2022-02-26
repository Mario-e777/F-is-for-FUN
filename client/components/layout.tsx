import Head from 'next/head'
import styled from 'styled-components'
import { COLORS } from '../utils/styles_constants'
import Button from '../components/button'

const LayoutContainer = styled.div`
  background-color: #fad0c4;
  background-image: linear-gradient(315deg, #fad0c4 0%, #f1a7f1 74%);
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  overflow: scroll;

  & main {
    & .head-container {
      padding-top: 1.5rem;
      position: relative;

      & h1 {
        color: ${COLORS.black};
        font-size: 3.85rem;
        font-family: PhilosopherRegular;
        margin-bottom: 0.8rem;
        text-align: center;
      }
    }
    & .menu-buttons-container {
      position: absolute;
      width: 100vw;
      height: 6rem;
      right: 0;
      top: 1.2rem;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      /* background-color: yellowgreen; */
      padding: 0 1.2rem;
      z-index: 0;

      & .right-buttons-container {
        grid-column: 2/3;
        grid-row: 1/2;
        justify-self: end;
        /* align-self: center; */
        display: flex;
        column-gap: 1rem;
      }
    }
  }
`;

export default function Layout({ children, title }) {

  const fontPreloader = (fileName) => <link
    rel="preload"
    href={`../public/fonts/${fileName}`}
    as="font"
    crossOrigin=""
  />

  return (
    <LayoutContainer>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Fundraiser list from F For Fun" />
        <link rel="icon" href="/favicon.ico" />
        {fontPreloader('Sofia-Pro-Bold.otf')}
        {fontPreloader('Sofia-Pro-Bold-Italic.otf')}
        {fontPreloader('Sofia-Pro-Light-Italic.otf')}
        {fontPreloader('Sofia-Pro-Light.otf')}
        {fontPreloader('Sofia-Pro-Medium.otf')}
        {fontPreloader('Sofia-Pro-Medium-Italic.otf')}
        {fontPreloader('Sofia-Pro-Regular-Italic.otf')}
        {fontPreloader('Sofia-Pro-Regular.otf')}
        {fontPreloader('Sofia-Pro-Semi-Bold.otf')}
        {fontPreloader('Philosopher-Regular.ttf')}
        {fontPreloader('Philosopher-Bold.ttf')}
      </Head>

      <main>
        <div className='head-container'>
          <h1>✨ F is for FUN ✨</h1>
        </div>
        {children}
        <header className='menu-buttons-container' >
          <div className='right-buttons-container' >
            <Button className='menu-button transparent' >About this project</Button>
          </div>
        </header>
      </main>

      <footer>
        {/* <p>Footer</p> */}
      </footer>
    </LayoutContainer>
  )
}
