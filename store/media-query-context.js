import { useEffect, createContext, useState } from "react";
import { useMediaQuery } from "react-responsive";
 

const MediaQueryContext = createContext(false)

const MediaQueryContextProvider = (props) => {
  const desktop = useMediaQuery({
    query: "(min-width: 768px)",
  });
  const [isDesktop, setIsDesktop] = useState(false)

  // server can't tell the screen size, so it is initialized  to false then after the page is rendered screen size is detected and changes occur accordingly  
  useEffect(() => {
    setIsDesktop(desktop)
  }, [desktop, setIsDesktop])
  
  return (
    <MediaQueryContext.Provider value={isDesktop}>
      {props.children}
    </MediaQueryContext.Provider>
  )
}
export default MediaQueryContextProvider
export {
  MediaQueryContext
}