import { createContext, useState } from "react";
const CategoriesContext = createContext({
  categories: null,
  putCategories: () => {},
})

const CategoriesContextProvider = (props) => {
  const [categories, setCategories] = useState(null)

  const putCategories = (categories) => {
    setCategories(categories)
  }

  return (
    <CategoriesContext.Provider value={{categories, putCategories}}>
      {props.children}
    </CategoriesContext.Provider>
  )
}

export default CategoriesContextProvider
export {
  CategoriesContext
}