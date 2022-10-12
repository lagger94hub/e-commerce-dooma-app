import { useContext, useCallback } from "react";
import { CartContext } from "../../../store/cart-context";
import DataTable from "../../ui/data-table/DataTable";
import classes from "./_cart-details.module.scss";

const CartDetails = () => {
  const {state, dispatch} = useContext(CartContext)
  const removeClickHandler = useCallback((cartId) => {
    dispatch({ type: 'removeItem', cartId })
  }, [dispatch])
  const selectChangeHandler = useCallback((e, rowId) => {
    dispatch({ type: 'changeQuantity', rowId, optionValue: e.currentTarget.value })
  }, [dispatch])

  return (
    <div className={`flex-col gap-16p ${classes.wrapper}`}>
      <h3>Your Cart</h3>
      <DataTable
        title={'Cart'}
        columnsTitles={[" ", "Product", "Price", "Quantity", 'Total', ' ']}
        rows={state.items}
        clickHandler={removeClickHandler}
        selecChangeHandler={selectChangeHandler}
      />
    </div>
  );
};
export default CartDetails;
