import { useCallback, useReducer } from "react";
const useCartReducer = (initialData) => {
  const cartReducer = useCallback((state, action) => {
    switch (action.type) {
      case "initializeCart": {
        return {
          ...state,
          orderTotal: action.cartData.reduce(
            (prev, current) => prev + parseFloat(current.total.split(" ")[0]),
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
              total:
                (item.price.originalPrice -
                  (item.price.originalPrice * item.price.discountRate) / 100) *
                  action.optionValue +
                " TL",
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
      case "addToCart": {
        let newItemArr
        const cartIndex = (state.items && state.items.length) ? state.items.findIndex((item) => item.id === `p-${action.productSlug}-${action.colorId}`) : null
        if (cartIndex === null || cartIndex === -1) {
          newItemArr = [
            ...(!state.items ? [] : state.items),
            {
              id: `p-${action.productSlug}-${action.colorId}`,
              img: {
                imgURL: action.imgURL,
                linkURL: action.linkURL,
              },
              productName: action.productName,
              price: {
                originalPrice: action.productPrice,
                discountRate: action.productDiscount,
              },
              selectBox: {
                default: 1,
                values: [1, 2, 3, 4],
                optionTitle: "Piece",
              },
              total: (action.productPrice - (action.productPrice * action.productDiscount)/100) + ' TL',
              button: {
                title: "Remove",
              },
            },
          ];
        } else {
          newItemArr = state.items.map((item) => {
            if (item.id === `p-${action.productSlug}-${action.colorId}`)
              return {
                ...item,
                selectBox: {
                  ...item.selectBox,
                  default: item.selectBox.default + 1
                },
                total: (action.productPrice - (action.productPrice * action.productDiscount)/100) * (item.selectBox.default + 1) + ' TL',
              }
            return item
          })
        }
        const total = newItemArr.reduce(
          (prev, current) => prev + parseFloat(current.total.split(" ")[0]),
          0
        );
        return {
          ...state,
          items: newItemArr,
          total,
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
