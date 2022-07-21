import { createContext } from "react";
import { useState } from "react";
const DimmerContext = createContext({
  dimmer: false,
  toggleDimmer: (value) => {},
})

const DimmerContextProvider = (props) => {
  const [dimmer, setDimmer] = useState(false)
  const toggleDimmer = (value) => {
    setDimmer(value)
  }
  return (
    <DimmerContext.Provider value={{
      dimmer,
      toggleDimmer,
    }}>
      {props.children}
    </DimmerContext.Provider>
  )
}
export default DimmerContextProvider
export {
  DimmerContext
}
