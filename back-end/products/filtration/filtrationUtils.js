// helper functions used in filtration

// create price range like 100TL-200TL
const createPriceRange = (price, rangesArr) => {
  for (let range of rangesArr) {
    if (price <= range.max && price >= range.min) {
      return `${range.min}TL-${range.max}TL`;
    }
  }
  return `${price}TL-${price}TL`;
};

// in the boxes array of the filter data object if the box doesn't exist create it

const createNewFilterBox = (filterData, boxName, itemName, urlQuery) => {
  let checked
  let query = urlQuery[boxName]
  if (!query) checked = false
  else {
    if (Array.isArray(query)) {
      checked = query.includes(itemName) ? true : false
    } else {
      checked = query === itemName ? true : false
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
  let checked
  let query = urlQuery[boxName]
  if (!query) checked = false
  else {
    if (Array.isArray(query)) {
      checked = query.includes(itemName) ? true : false
    } else {
      checked = query === itemName ? true : false
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
                  checked
                };
              return item;
            })
          : [
              ...filterData.boxes[boxIndex].items,
              {
                name: itemName,
                quantity: 1,
                checked
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
    name: "Sort By",
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
  if (boxName === 'sort') return createSortBox(filterData, boxName, urlQuery)

  // width and length and size could be null, fits could be NA, but sort doesn't need itemName so we added it to the condition
  if ((!itemName || itemName === "NA")) return;

  // some products properties are multi valued like size, width_length..etc
  const { concatenated } = options;
  let itemArr = concatenated ? itemName.split(",") : null;

  // the width_length has the format of w20-l32, so we split the width and the length so that we can count them and add them to filter data
  if (boxName === "width" || boxName === "length") {
    itemArr[0] =
      boxName === "width"
        ? itemArr[0].split("-")[0].replace("w", "")
        : itemArr[1].split("-")[1].replace("l", "");
  }

  try {
    let boxIndex = filterData.boxes.findIndex((box) => box.name === boxName);
    // if box doesnt exist
    if (boxIndex < 0) {
      if (boxName === "sort") {
        createNewFilterBox(filterData, boxName, urlQuery);
        return;
      }

      // if multi valued property
      if (concatenated) {
        let firstItem = itemArr[0];
        // create the price range
        if (boxName === "price") {
          let priceRange = createPriceRange(firstItem, [
            { min: 50, max: 60 },
            { min: 80, max: 100 },
            { min: 120, max: 200 },
            { min: 300, max: 400 },
            { min: 500, max: 750 },
          ]);
          createNewFilterBox(filterData, boxName, priceRange, urlQuery);
        } else createNewFilterBox(filterData, boxName, firstItem, urlQuery);
      } else createNewFilterBox(filterData, boxName, itemName, urlQuery);
    } else {
      // if box already exist
      if (boxName === "sort") {
        modifyFilterBox(filterData, boxName, urlQuery, boxIndex);
      }
      if (concatenated) {
        for (let i = 0; i < itemArr.length; i++) {
          // the width_length has the format of w20-l32, so we split the width and the length so that we can count them and add them to filter data
          if (boxName === "width" || boxName === "length") {
            itemArr[i] =
              boxName === "width"
                ? itemArr[i].split("-")[0]
                : itemArr[1].split("-")[1];
          }
          if (boxName === "price") {
            let priceRange = createPriceRange(itemArr[i], [
              { min: 50, max: 60 },
              { min: 80, max: 100 },
              { min: 120, max: 200 },
              { min: 300, max: 400 },
              { min: 500, max: 750 },
            ]);
            modifyFilterBox(
              filterData,
              boxName,
              priceRange,
              urlQuery,
              boxIndex
            );
          } else
            modifyFilterBox(
              filterData,
              boxName,
              itemArr[i],
              urlQuery,
              boxIndex
            );
        }
      } else modifyFilterBox(filterData, boxName, itemName, urlQuery, boxIndex);
    }
  } catch (e) {
    logError("manageFilterData", e.message);
    throw e;
  }
};
const fillAppliedFilters = (filterData, urlQuery) => {
  const fits = urlQuery.fit;
  const colors = urlQuery.colors;
  const prices = urlQuery;
  if (fits) {
    if (Array.isArray(fits)) {
      for (let fit of fits) {
        filterData.appliedFilters.push(fit);
      }
    } else {
      filterData.appliedFilters.push(fits);
    }
  }
};

export { manageFilterData, fillAppliedFilters, createPriceRange };
