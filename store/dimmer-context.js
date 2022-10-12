import { createContext, useCallback, useMemo, useState } from "react";
const DimmerContext = createContext({
  dimmer: false,
  toggleDimmer: (value) => {},
})

const DimmerContextProvider = (props) => {
  const [dimmer, setDimmer] = useState(false)
  const toggleDimmer = useCallback((value) => {
    setDimmer(value)
  }, [])

  // this will return contextValue object that we want to send to consumers
  const contextValue = useMemo(() => {
    return { dimmer, toggleDimmer }
  }, [dimmer, toggleDimmer])
  
  return (
    // passing an inline object directly to value is bad practice because every time the context is rendered the object will be different and this will cause all the subscribed components to re-render this is why we usedMemo to save the object data and the object will be the same and the re-rendering will happen only if the data of the object changes
    <DimmerContext.Provider value={contextValue}>
      {props.children}
    </DimmerContext.Provider>
  )
}
export default DimmerContextProvider
export {
  DimmerContext
}
