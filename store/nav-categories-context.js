import { createContext, useCallback, useState } from "react";
const NavCategoriesContext = createContext({
  navCategories: null,
  putNavCategories: () => {},
})

const NavCategoriesContextProvider = (props) => {
  const [navCategories, setNavCategories] = useState(null)

  const putNavCategories = useCallback((navCategories) => {
    setNavCategories(navCategories)
  }, [])

  return (
    <NavCategoriesContext.Provider value={{navCategories, putNavCategories}}>
      {props.children}
    </NavCategoriesContext.Provider>
  )
}

export default NavCategoriesContextProvider
export {
  NavCategoriesContext
}