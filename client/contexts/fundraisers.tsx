/* React stuff */
import { createContext, useState, useContext, useEffect } from 'react'

const FundraisersContext = createContext({ })

export default function FundraisersContextProvider({ children }) {
  const [state, setState] = useState({ id: '0' })

  return (
    <FundraisersContext.Provider value={{ state, setState }} >{children}</FundraisersContext.Provider>
  )
}

export { FundraisersContextProvider, FundraisersContext };