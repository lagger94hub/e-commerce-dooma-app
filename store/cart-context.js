import { createContext, useMemo, useEffect } from "react"
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "../utils/local-storage-handler"
import useCartReducer from "../reducers/cart-reducer-hook"

const contextInitiaData = {
  state: null,
  dispatch: null
}
const initiaData = {
  items: null,
  shippingCosts: 0,
  orderTotal: 0,
}

const CartContext = createContext(contextInitiaData)
const CartContextProvider = (props) => {
  const [state, dispatch] = useCartReducer(initiaData)
  useEffect(() => {
    const cartData = loadCartFromLocalStorage()
    if (cartData) 
      dispatch({ type: "initializeCart", cartData });
  }, [dispatch]);

  useEffect(() => {
    if (state.items)
      saveCartToLocalStorage(state.items)
  }, [state.items])

  const contextValue = useMemo(() => {
    return { state, dispatch }
  }, [state, dispatch])
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  )
}
export default CartContextProvider
export {
  CartContext
}