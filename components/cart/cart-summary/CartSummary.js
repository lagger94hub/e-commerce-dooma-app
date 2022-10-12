import { useContext } from "react";
import { CartContext } from "../../../store/cart-context";
import Button from "../../ui/buttons/Button";
import classes from "./_cart-summary.module.scss";
const CartSummary = (props) => {
  const { shippingCosts, orderTotal, amountToPay} = useContext(CartContext).state
  return (
    <div className={`${classes.wrapper} flex-col gap-64p falign-stretch`}>
      <h3>Cart Summary</h3>
      <div className={`flex-col gap-24p falign-center`}>
        <div className={`${classes['total-shipping-wrapper']} flex-col gap-8p falign-center`}>
          <div className={`${classes['total']} flex-row fjust-between`}>
            <span>Order Total</span>
            <span>{orderTotal} TL</span>
          </div>
          <div className={`${classes['shipping']} flex-row fjust-between`}>
            <span>Shipping Costs</span>
            <span>{shippingCosts} TL</span>
          </div>
        </div>
        <div className={`${classes['final-total']} flex-row fjust-between `}>
          <span>Amount to be paid</span>
          <span>{orderTotal + shippingCosts} TL</span>
        </div>
        <Button
          title={"Buy"}
          to={"/"}
          styles={["dark", "default", "wide", 'thick']}
        />
      </div>
    </div>
  );
};
export default CartSummary;
