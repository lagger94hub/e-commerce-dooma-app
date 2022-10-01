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

import { manageFilterData } from "./filtrationUtils";
import { logError } from "../../utils/errorsLib";

const createFilterData = (allProducts, filteredProducts, query) => {

  // this is the final object that will be returned by this function it will be used to fill the filtration bar
  const filterData = {
    boxes: [],
    appliedFilters: {},
    changed: false,
    productsCount: 0
  };
  try {
    // get the number of keys in query
    let keysCount = 0
    for (let key in query) {
      if (key !== 'sort' && key !== 'categories') keysCount++
    }
    // when we have one filter applied only we would like to get the data of this filter based on all the products not based on the filtered products

    // only one filter is applied
    if (keysCount === 1) {
      for (let product of allProducts) {
        // if a filter is applied and its the only filter applied then we use all prodcuts instead of the filtered products
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
          manageFilterData(filterData, "width", product.width_length, query, {
            concatenated: true,
          });
        }
        if (query.length) {
          manageFilterData(filterData, "length", product.width_length, query, {
            concatenated: true,
          });
        }
        if (query.price) {
          manageFilterData(filterData, "price", product.after_discount, query, {
            concatenated: false,
          });
        }
      }
    }
    // if no filters were applied or we have more than one filter
    for (let product of filteredProducts) {
      if (keysCount !== 1 || !query.fit)
        manageFilterData(filterData, "fit", product.product_fit, query, {
          concatenated: false,
        });
      if (keysCount !== 1 || !query.color)
        // creating and modifying boxes for the color
        manageFilterData(filterData, "color", product.product_color, query, {
          concatenated: false,
        });
      if (keysCount !== 1 || !query.size) {
        manageFilterData(filterData, "size", product.size, query, {
          concatenated: true,
        });
      }
      if (keysCount !== 1 || !query.width) {
        manageFilterData(filterData, "width", product.width_length, query, {
          concatenated: true,
        });
      }
      if (keysCount !== 1 || !query.length) {
        manageFilterData(filterData, "length", product.width_length, query, {
          concatenated: true,
        });
      }
      if (keysCount !== 1 || !query.price) {
        manageFilterData(filterData, "price", product.after_discount, query, {
          concatenated: false,
        });
      }
    }

    // create the sorting box if sort is in the query
    manageFilterData(filterData, "sort", null, query);

    // add the query object to the filterdata object
    filterData.appliedFilters = query

    // set the filterData products count to the size of the filteredProducts array
    filterData.productsCount = filteredProducts.length
    
  } catch (e) {
    logError("createFilterData", e.message);
    throw e;
  }
  return filterData;
};
export { createFilterData };
