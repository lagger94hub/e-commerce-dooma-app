import { createContext, useCallback, useState, useMemo } from "react";
const NavCategoriesContext = createContext({
  navCategories: null,
  putNavCategories: () => {},
})

const NavCategoriesContextProvider = (props) => {
  const [navCategories, setNavCategories] = useState(null)

  const putNavCategories = useCallback((navCategories) => {
    setNavCategories(navCategories)
  }, [])

  // this will return contextValue object that we want to send to consumers
  const contextValue = useMemo(() => {
    return { navCategories, putNavCategories }
  }, [navCategories, putNavCategories])
  return (
    // passing an inline object directly to value is bad practice because every time the context is rendered the object will be different and this will cause all the subscribed components to re-render this is why we usedMemo to save the object data and the object will be the same and the re-rendering will happen only if the data of the object changes

    <NavCategoriesContext.Provider value={contextValue}>
      {props.children}
    </NavCategoriesContext.Provider>
  )
}

export default NavCategoriesContextProvider
export {
  NavCategoriesContext
}