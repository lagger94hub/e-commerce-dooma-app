import { useCallback, useReducer } from "react";
const useCartReducer = (initialData) => {
  const cartReducer = useCallback((state, action) => {
    switch (action.type) {
      case "initializeCart": {
        return {
          ...state,
          orderTotal: action.cartData.reduce(
            (prev, current) => prev + parseInt(current.total.split(" ")[0]),
            0
          ),
          items: action.cartData,
        };
      }
      case "removeItem": {
        const newItemArr = state.items.filter((item, index) => {
          return item.id !== action.cartId;
        });
        const total = newItemArr.reduce(
          (prev, current) => prev + parseFloat(current.total.split(" ")[0]),
          0
        );
        return {
          ...state,
          orderTotal: total,
          items: newItemArr,
        };
      }
      case "changeQuantity": {
        const newItemArr = state.items.map((item) => {
          if (item.id === action.rowId)
            return {
              ...item,
              selectBox: {
                ...item.selectBox,
                default: action.optionValue,
              },
              total: item.price * action.optionValue + " TL",
            };
          return item;
        });
        const total = newItemArr.reduce(
          (prev, current) => prev + parseFloat(current.total.split(" ")[0]),
          0
        );
        return {
          ...state,
          orderTotal: total,
          items: newItemArr,
        };
      }
      default:
        break;
    }
  }, []);
  const [state, dispatch] = useReducer(cartReducer, initialData);
  return [state, dispatch];
};
export default useCartReducer;
