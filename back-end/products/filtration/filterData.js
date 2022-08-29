// initialState = {
//   boxes: [
//     {
//       name: "color",
//       open: false,
//       items: [
//         { name: "Blue", quantity: 3, checked: false },
//         { name: "Yellow", quantity: 1, checked: false },
//         { name: "Brown", quantity: 3, checked: false },
//         { name: "Black", quantity: 1, checked: false },
//         { name: "White", quantity: 3, checked: false },
//         { name: "Purple", quantity: 1, checked: false },
//       ],
//     },
//     {
//       name: "price",
//       open: false,
//       items: [
//         { name: "100TL-200TL", quantity: 2, checked: false },
//         { name: "200TL-300TL", quantity: 3, checked: false },
//       ],
//     },
//     {
//       name: "fit",
//       open: false,
//       items: [
//         { name: "Skinny", quantity: 10, checked: false },
//         { name: "Regular", quantity: 23, checked: false },
//       ],
//     },
//     {
//       name: "sort-by",
//       open: false,
//       items: [
//         { name: "Featured", checked: false },
//         { name: "Price(High to Low)", checked: false },
//         { name: "Price(Low to High)", checked: false },
//         { name: "Discount Rate", checked: false },
//       ],
//     },
//   ],

//   appliedFilters: ["Skinny", "100TL-200TL", "Blue"],
// };

import { createPriceRange, manageFilterData } from "./filtrationUtils";
import { logError } from "../../utils/errorsLib";
const createFilterData = (allProducts, filteredProducts, query) => {
  const filterData = {
    boxes: [],
    appliedFilters: [],
  };
  try {
    // get the number of keys in query
    let keysCount = Object.keys(query).length;

    // when we have one filter applied only we would like to get the data of this filter based on all the products not based on the filtered products
    if (keysCount === 2) {
      for (let product of allProducts) {
        // checking which of these filters is applied
        if (query.fit) {
          manageFilterData(filterData, "fit", product.product_fit, query, {
            concatenated: false,
          });
        }
        if (query.color) {
          manageFilterData(filterData, "color", product.product_color, query, {
            concatenated: false,
          });
        }
        if (query.size) {
          manageFilterData(filterData, "size", product.size, query, {
            concatenated: true,
          });
        }
        if (query.width) {
          manageFilterData(filterData, "width", product.width, query, {
            concatenated: true,
          });
        }
        if (query.length) {
          manageFilterData(filterData, "length", product.length, query, {
            concatenated: true,
          });
        }
        if (query.price) {
          manageFilterData(filterData, "price", product.product_price, query, {
            concatenated: true,
          });
        }
      }
    }

    for (let product of filteredProducts) {
      if (keysCount !== 2 || !query.fit)
        manageFilterData(filterData, "fit", product.product_fit, query, {
          concatenated: false,
        });
      if (keysCount !== 2 || !query.color)
        // creating and modifying boxes for the color
        manageFilterData(filterData, "color", product.product_color, query, {
          concatenated: false,
        });
      if (keysCount !== 2 || !query.size) {
        manageFilterData(filterData, "size", product.size, query, {
          concatenated: true,
        });
      }
      if (keysCount !== 2 || !query.width) {
        manageFilterData(filterData, "width", product.width, query, {
          concatenated: true,
        });
      }
      if (keysCount !== 2 || !query.length) {
        manageFilterData(filterData, "length", product.length, query, {
          concatenated: true,
        });
      }
      if (keysCount !== 2 || !query.price) {
        manageFilterData(filterData, "price", product.product_price, query, {
          concatenated: true,
        });
      }
    }
  } catch (e) {
    logError("createFilterData", e.message);
    throw e;
  }
  return filterData;
};
export { createFilterData };
