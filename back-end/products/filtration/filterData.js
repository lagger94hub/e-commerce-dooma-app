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
const createFilterData = (allProducts, filteredProducts, query) => {
  const filterData = {
    boxes: [],
    appliedFilters: [],
  };
  try {
    for (let product of filteredProducts) {
      // creating and modifying boxes for the color
      if (product.product_fit !== "NA") {
        manageFilterData(filterData, "fit", product.product_fit, query);
      }

      manageFilterData(filterData, "color", product.product_color, query);

      if (product.size) {
        // size could be an array so we should loop through it
        for (let size of product.size.split(",")) {
          // creating and modifying boxes for the width
          manageFilterData(filterData, "size", size, query);
        }
      }
      if (product.width) {
        // width and length could be arrays so we should loop through them
        for (let width of product.width.split(",")) {
          // creating and modifying boxes for the width
          manageFilterData(filterData, "width", width, query);
        }
      }
      if (product.length) {
        for (let length of product.length.split(",")) {
          // creating and modifying boxes for the length
          manageFilterData(filterData, "length", length, query);
        }
      }

      // price could be an array so we should loop through it
      for (let price of product.product_price.split(",")) {
        // creating and modifying boxes for the width
        manageFilterData(filterData, "price", price, query);
      }
    }
  } catch (e) {
    logError("createFilterData", e.message);
    throw e;
  }
  return filterData;
};
export { createFilterData };
