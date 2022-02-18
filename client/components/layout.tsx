import Head from 'next/head'
import styled from 'styled-components'
import { COLORS } from '../utils/styles_constants';

const LayoutContainer = styled.div`
  background-color: #fad0c4;
  background-image: linear-gradient(315deg, #fad0c4 0%, #f1a7f1 74%);
  min-height: 100vh;
  height: 100vh;
  width: 100vw;
  overflow: scroll;

  & main {
    & h1 {
      color: ${COLORS.black};
      font-size: 3.85rem;
      font-family: PhilosopherRegular;
      margin-bottom: 0.8rem;
      width: 100%;
      text-align: center;
      padding-top: 1.5rem;
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
        <h1>✨ F is for FUN ✨</h1>
        {children}
      </main>

      <footer>
        {/* <p>Footer</p> */}
      </footer>
    </LayoutContainer>
  )
}
