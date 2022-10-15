import { useContext, useEffect } from "react";
import { CartContext } from "../../store/cart-context";
import { loadCartFromLocalStorage, saveCartToLocalStorage } from "../../utils/local-storage-handler";
import CartDetails from "./cart-details/CartDetails";
import CartSummary from "./cart-summary/CartSummary";
import classes from "./_cart.module.scss";
// const cartData = [
//   {
//     id: 0,
//     img: {
//       imgURL:
//         "/_next/image?url=%2Fimages%2Fproducts%2F1%2Fcolor-2%2Fp1-c2-1.jpg&w=1080&q=75",
//       linkURL: "/products/test-shirt-1/2",
//     },
//     productName: "T-shirt-test-1",
//     price: {
//       originalPrice: 200,
//       discountRate: 10
//     },
//     selectBox: {
//       default: 6,
//       values: [1, 2, 3, 4, 5, 6],
//       optionTitle: "Piece",
//     },
//     total: "300 TL",
//     button: {
//       title: "Remove",
//     },
//   },
//   {
//     id: 1,
//     img: {
//       imgURL:
//         "/_next/image?url=%2Fimages%2Fproducts%2F2%2Fcolor-3%2Fp2-c3-1.jpg&w=1080&q=75",
//       linkURL: "/products/test-shirt-2/3",
//     },
//     productName: "T-shirt-test-2",
//     price: {
//       originalPrice: 150,
//       discountRate: 20
//     },
//     selectBox: {
//       default: 3,
//       values: [1, 2, 3, 4],
//       optionTitle: "Piece",
//     },
//     total: "180 TL",
//     button: {
//       title: "Remove",
//     },
//   },
//   {
//     id: 2,
//     img: {
//       imgURL:
//         "/_next/image?url=%2Fimages%2Fproducts%2F3%2Fcolor-2%2Fp3-c2-1.jpg&w=1080&q=75",
//       linkURL: "/products/test-shirt-3/2",
//     },
//     productName: "T-shirt-test-3",
//     price: {
//       originalPrice: 300,
//       discountRate: 35
//     },
//     selectBox: {
//       default: 1,
//       values: [1],
//       optionTitle: "Piece",
//     },
//     total: "100 TL",
//     button: {
//       title: "Remove",
//     },
//   },
// ]; 
const Cart = (props) => {
  const { state, dispatch } = useContext(CartContext);
  // update the store after data is fetched from local storage
  useEffect(() => {
    const cartData = loadCartFromLocalStorage()
    if (cartData) 
      dispatch({ type: "initializeCart", cartData });
  }, [dispatch]);

  useEffect(() => {
    if (state.items)
      saveCartToLocalStorage(state.items)
  }, [state.items])
  return (state.items && state.items.length !== 0)  ? (
    <div
      className={`flex-row gap-16p fjust-between falign-center ${classes["cart-wrapper"]}`}
    >
      <CartDetails />
      <CartSummary />
    </div>
  ) : (
    <h3>Your Cart is Empty</h3>
  );
};
export default Cart;
