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
const createNewFilterBox = (filterData, boxName, itemName, urlQuery) => {
  try {
    filterData.boxes.push({
      name: boxName,
      open: false,
      items: [
        {
          name: itemName,
          quantity: 1,
          checked: urlQuery[boxName] !== undefined && urlQuery[boxName] === itemName,
        },
      ],
    });
  } catch (e) {
    logError("createNewFilterBox", e.message);
    throw e;
  }
};
const modifyFilterBox = (filterData, boxName, itemName, urlQuery, boxIndex) => {
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
                  checked:
                    urlQuery[boxName] !== undefined &&
                    urlQuery[boxName] === itemName,
                };
              return item;
            })
          : [
              ...filterData.boxes[boxIndex].items,
              {
                name: itemName,
                quantity: 1,
                checked:
                  urlQuery[boxName] !== undefined &&
                  urlQuery[boxName] === itemName,
              },
            ],
    };
  } catch (e) {
    logError("modifyFilterBox", e.message);
    throw e;
  }
};
const manageFilterData = (filterData, boxName, itemName, urlQuery, options) => {
  // width and length and size could be null, fits could be NA
  if (!itemName || itemName === "NA") return;
  const { concatenated } = options;
  let itemArr = concatenated ? itemName.split(',') : null
  try {
    let boxIndex = filterData.boxes.findIndex((box) => box.name === boxName);
    if (boxIndex < 0) {
      if (concatenated) {
        let firstItem = itemArr[0]
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
      } else createNewFilterBox(filterData, boxName, itemName, urlQuery)
    } else {
      if (concatenated) {
        for (let i = 0; i < itemArr.length; i++) {
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
          } else modifyFilterBox(filterData, boxName, itemArr[i], urlQuery, boxIndex);
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
