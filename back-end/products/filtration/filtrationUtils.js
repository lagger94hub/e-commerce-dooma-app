// helper functions used in filtration
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
                    urlQuery[boxName] !== undefined && urlQuery[boxName] === itemName,
                };
              return item;
            })
          : [
              ...filterData.boxes[boxIndex].items,
              {
                name: itemName,
                quantity: 1,
                checked:
                  urlQuery[boxName] !== undefined && urlQuery[boxName] === itemName,
              },
            ],
    };
  } catch (e) {
    logError("modifyFilterBox", e.message);
    throw e;
  }
};
const manageFilterData = (filterData, boxName, itemName, urlQuery) => {
  try {
    let boxIndex = filterData.boxes.findIndex((box) => box.name === boxName);
    if (boxIndex < 0) {
      createNewFilterBox(filterData, boxName, itemName, urlQuery);
    } else {
      modifyFilterBox(filterData, boxName, itemName, urlQuery, boxIndex);
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


export {
  manageFilterData,
  fillAppliedFilters,
}