/* Styles */
import '../styles/globals.css'

/* Contexts */
import { FundraisersContextProvider } from '../contexts/fundraisers'

function MyApp({ Component, pageProps }) {
  return <FundraisersContextProvider>
    <Component {...pageProps} />
  </FundraisersContextProvider>
}

export default MyApp
