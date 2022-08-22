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
const createNewFilterBox = (filterData, boxName, itemName, query) => {
  filterData.boxes.push({
    name: boxName,
    open: false,
    items: [
      { name: itemName, quantity: 1, checked: (query[boxName] !== undefined && (query[boxName] === itemName)) }
    ]
  })
}
const modifyFilterBox = (filterData, boxName, itemName, query, boxIndex) =>  {
  let itemIndex = filterData.boxes[boxIndex].items.findIndex((item) => item.name === itemName)

  filterData.boxes[boxIndex] = {
    ...filterData.boxes[boxIndex],
    items: itemIndex > 0 
    ? 
    filterData.boxes[boxIndex].items.map((item, index) => {
      if (index === itemIndex)
        return {...item, quantity: ++item.quantity, checked: (query[boxName] !== undefined && (query[boxName] === itemName))}
      return item
    })

    : [...filterData.boxes[boxIndex].items, {
      name: itemName, quantity: 1, checked: (query[boxName] !== undefined && (query[boxName] === itemName))
    }]
  }
}
const createFilterData = (products, query) => {
  const filterData = {
    boxes: [],
    appliedFilters: []
  }
  for (let product of products) {
    // if product has no fit
    if (product.product_fit !== 'NA') {
      // if product has fit but it is not included in boxes array yet
      let boxIndex = filterData.boxes.findIndex((box) => box.name === 'fit')
      if ( boxIndex < 0) {
        createNewFilterBox(filterData, 'fit', product.product_fit, query)
      } else {
        modifyFilterBox(filterData, 'fit', product.product_fit, query, boxIndex)
      }
    }
  }
  return filterData
}
export {
  createFilterData
}