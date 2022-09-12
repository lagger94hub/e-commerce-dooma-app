import { useCallback } from "react";
import { useReducer } from "react";


// in this reducer a problem with double rendering was faced and to fix it first variable was used to indicate that a second rerender is not allowed
const useFilterReducer = (initialState) => {
  const reducer = useCallback((state, action) => {
    const appliedFiltersModifier = (state, action) => {
      const appliedFilters = state.appliedFilters
      const boxName = action.boxName
      const itemName = action.itemName

      if (!action.first) return appliedFilters
      let queryKey = appliedFilters[boxName];
      if (!queryKey) {
        // create the property with one element
        return {
          ...appliedFilters,
          [boxName]: itemName,
        };
      }
      if (Array.isArray(queryKey)) {
        if (queryKey.includes(itemName)) {
          if (queryKey.length - 1 === 0) {
            // delete the property if the array has one element
            let ob = appliedFilters;
            delete ob[`${boxName}`];
            action.first = false
            return ob;
          }
          
          // remove one element from the array
          return {
            ...appliedFilters,
            [boxName]: queryKey.filter((arrItem) => arrItem !== itemName),
          };
        }
        // add to the array of the element doesn't exist
        return {
          ...appliedFilters,
          [boxName]: [...queryKey, itemName],
        };
      }
      if (itemName === queryKey) {
        // delete the property
        let ob = appliedFilters;
        delete ob[`${boxName}`];
        action.first = false
        return ob
      }
      // if the key is sort key we don't want combined sorting so we replace the current sort instead of combining sorts
      if (boxName === 'sort') {
        return {
          ...appliedFilters,
          [boxName]: itemName
        }
      }
      // if there is only one elment, then convert to array add the element and the new elment
      let propArr = [];
      propArr.push(queryKey);
      propArr.push(itemName);
      return {
        ...appliedFilters,
        [boxName]: propArr,
      };
    };
    const sortByBoxName = (box1, box2) => {
      if (box2.name === 'sort') return -1
      if (box1.name === 'width' || box1.name === 'length') return 1
      if (box1.name > box2.name) return 1
      if (box1.name < box2.name) return -1
      if (box1.name === box2.name) return 0
    }
    switch (action.type) {
      // always use the filterdata comming from the server side and sort them alphabetically 
      case 'sortFilters': {
        let sortedBoxes = action.filterData.boxes.sort(sortByBoxName)
        return {
          ...action.filterData,
          boxes: sortedBoxes
        }
      }
      case "toggle-box": {
        return {
          ...state,
          boxes: state.boxes.map((box, index) => {
            if (index === action.boxIndex) return { ...box, open: !box.open };
            return { ...box, open: false };
          }),
        };
      }
      case 'closeAllBoxes': {
        return {
          ...state,
          boxes: state.boxes.map((box) => {
            return { ...box, open: false }
          })
        }
      }
      case "select-item": {
        return {
          ...state,
          boxes: state.boxes.map((box, boxIn) => {
            if (boxIn !== action.boxIndex) return box;
            return {
              ...box,
              items: box.items.map((item, itemIn) => {
                // if sorting box
                if (boxIn === state.boxes.length - 1) {
                  if (itemIn !== action.itemIndex) {
                    return {
                      ...item,
                      checked: false,
                    };
                  } else {
                    return {
                      ...item,
                      checked: !item.checked,
                    };
                  }
                }
                if (itemIn !== action.itemIndex) return item;
                return {
                  ...item,
                  checked: !item.checked,
                };
              }),
            };
          }),
          appliedFilters: appliedFiltersModifier(state, action),
          changed: true
        };
      }
     
      case 'remove-one': {
        return {
          ...state,
          appliedFilters: appliedFiltersModifier(state, action),
          changed: true
        }
      }
      case 'remove-all': {
        return {
          ...state,
          appliedFilters: {
            categories: state.appliedFilters.categories
          },
          changed: true
        }
      }
      case 'disallowPushUrl': {
        return {
          ...state,
          changed: false
        }
      }
    }
  }, [])
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch];
};
export default useFilterReducer;
