import { logError } from "../../utils/errorsLib";
// some extra usefull functions used in ths file 
const getSize = (size, item) => {
  return size === "width" ? item.split("-")[0].replace('w', '') : item.split("-")[1].replace('l', '') 
}
// helper functions used in filtration

// create price range like 100TL-200TL
const createPriceRange = (price, rangesArr) => {
  for (let range of rangesArr) {
    if (price < range.max && price >= range.min) {
      return `${range.min}TL-${range.max}TL`;
    }
  }
  return `${price}TL-${price}TL`;
};

// in the boxes array of the filter data object if the box doesn't exist create it

const createNewFilterBox = (filterData, boxName, itemName, urlQuery) => {
  let checked;
  let query = urlQuery[boxName];
  if (!query) checked = false;
  else {
    if (Array.isArray(query)) {
      checked = query.includes(itemName) ? true : false;
    } else {
      checked = query === itemName ? true : false;
    }
  }
  try {
    filterData.boxes.push({
      name: boxName,
      open: false,
      items: [
        {
          name: itemName,
          quantity: 1,
          checked,
        },
      ],
    });
  } catch (e) {
    logError("createNewFilterBox", e.message);
    throw e;
  }
};

// if the box already exist
const modifyFilterBox = (filterData, boxName, itemName, urlQuery, boxIndex) => {
  let checked;
  let query = urlQuery[boxName];
  if (!query) checked = false;
  else {
    if (Array.isArray(query)) {
      checked = query.includes(itemName) ? true : false;
    } else {
      checked = query === itemName ? true : false;
    }
  }
  try {
    let itemIndex = filterData.boxes[boxIndex].items.findIndex(
      (item) => item.name === itemName
    );
    filterData.boxes[boxIndex] = {
      ...filterData.boxes[boxIndex],
      items:
        itemIndex >= 0
          ? filterData.boxes[boxIndex].items.map((item, index) => {
              if (index === itemIndex)
                return {
                  ...item,
                  quantity: ++item.quantity,
                  checked,
                };
              return item;
            })
          : [
              ...filterData.boxes[boxIndex].items,
              {
                name: itemName,
                quantity: 1,
                checked,
              },
            ],
    };
  } catch (e) {
    logError("modifyFilterBox", e.message);
    throw e;
  }
};

const createSortBox = (filterData, boxName, urlQuery) => {
  filterData.boxes.push({
    name: "sort",
    open: false,
    items: [
      { name: "latest", checked: urlQuery[boxName] === "latest" },
      { name: "price-asc", checked: urlQuery[boxName] === "price-asc" },
      { name: "price-desc", checked: urlQuery[boxName] === "price-desc" },
      { name: "ds-rate", checked: urlQuery[boxName] === "ds-rate" },
    ],
  });
};
const manageFilterData = (filterData, boxName, itemName, urlQuery, options) => {
  // if the box name is sort create one object, one box only
  if (boxName === "sort") return createSortBox(filterData, boxName, urlQuery);

  // width and length and size could be null, fits could be NA, but sort doesn't need itemName so we added it to the condition
  if (!itemName || itemName === "NA") return;

  // some products properties are multi valued like size, width_length..etc
  const { concatenated } = options;
  try {
    let boxIndex = filterData.boxes.findIndex((box) => box.name === boxName);
    // if box doesnt exist
    if (boxIndex < 0) {
      if (boxName === "price") {
        let priceRange = createPriceRange(itemName, [
          { min: 10, max: 50 },
          { min: 50, max: 100 },
          { min: 100, max: 150 },
          { min: 150, max: 200 },
          { min: 200, max: 300 },
          { min: 300, max: 500 },
        ]);
        createNewFilterBox(filterData, boxName, priceRange, urlQuery);
        return;
      }
      // if multi valued property
      if (concatenated) {
        let itemArr =itemName.toString().split(",")
        for (let i = 0; i < itemArr.length; i++) {
          // the width_length has the format of w20-l32, so we split the width and the length so that we can count them and add them to filter data
          if (boxName === "width" || boxName === "length") {
            let size
             size = getSize(boxName, itemArr[i])
             if (i === 0) {
              createNewFilterBox(filterData, boxName, size, urlQuery);
              boxIndex = filterData.boxes.findIndex((box) => box.name === boxName);
              continue;
            }
            modifyFilterBox(filterData, boxName, size, urlQuery, boxIndex);
            // if not width length, if size maybe
          } else {
            if (i === 0) {
              createNewFilterBox(filterData, boxName, itemArr[i], urlQuery);
              boxIndex = filterData.boxes.findIndex((box) => box.name === boxName);
              continue;
            }
            modifyFilterBox(filterData, boxName, itemArr[i], urlQuery, boxIndex);
          }
          
        }
        return;
      }
      createNewFilterBox(filterData, boxName, itemName, urlQuery);
      return;
    }
    // if box already exist

    if (boxName === "price") {
      let priceRange = createPriceRange(itemName, [
        { min: 10, max: 50 },
        { min: 50, max: 100 },
        { min: 100, max: 150 },
        { min: 150, max: 200 },
        { min: 200, max: 300 },
        { min: 300, max: 500 },
      ]);
      modifyFilterBox(filterData, boxName, priceRange, urlQuery, boxIndex);
      return;
    }
    if (concatenated) {
      let itemArr =itemName.toString().split(",")
      for (let i = 0; i < itemArr.length; i++) {
        // the width_length has the format of w20-l32, so we split the width and the length so that we can count them and add them to filter data
        if (boxName === "width" || boxName === "length") {
          let size
          size = getSize(boxName, itemArr[i])
          modifyFilterBox(filterData, boxName, size, urlQuery, boxIndex);
        } else {
          modifyFilterBox(filterData, boxName, itemArr[i], urlQuery, boxIndex);
        }
      }
      return
    }
    modifyFilterBox(filterData, boxName, itemName, urlQuery, boxIndex);
  } catch (e) {
    logError("manageFilterData", e.message);
    throw e;
  }
};

export { manageFilterData, createPriceRange };
