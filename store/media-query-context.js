import { createContext } from "react";
import { useMediaQuery } from "react-responsive";
 

const MediaQueryContext = createContext(false)

const MediaQueryContextProvider = (props) => {
  const desktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  return (
    <MediaQueryContext.Provider value={desktop}>
      {props.children}
    </MediaQueryContext.Provider>
  )
}
export default MediaQueryContextProvider
export {
  MediaQueryContext
}