import CartDetails from './cart-details/CartDetails'
import CartSummary from './cart-summary/CartSummary'
import classes from './_cart.module.scss'
const Cart = (props) => {
  return (
    <div className={`flex-row gap-16p fjust-between falign-center ${classes['cart-wrapper']}`}>
      <CartDetails />
      <CartSummary />
    </div>
  )
}
export default Cart