import { createContext, useMemo } from "react"
import useCartReducer from "../reducers/cart-reducer-hook"

const contextInitiaData = {
  state: null,
  dispatch: null
}
const initiaData = {
  items: [],
  shippingCosts: 0,
  orderTotal: 0,
}

const CartContext = createContext(contextInitiaData)

const CartContextProvider = (props) => {
  const [state, dispatch] = useCartReducer(initiaData)
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